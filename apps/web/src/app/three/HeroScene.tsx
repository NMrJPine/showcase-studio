import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Color zones (like real nebula gas regions) ──────────────── */
const ZONE_PINK    = ["#ff006e", "#f15bb5", "#e11d48", "#ff4361"];
const ZONE_TEAL    = ["#0891b2", "#00f5d4", "#3a86ff", "#00bbf9"];
const ZONE_AMBER   = ["#fb5607", "#ffbe0b", "#d4a017", "#fee440"];
const ZONE_VIOLET  = ["#8338ec", "#7c3aed", "#4f46e5", "#f15bb5"];
const ALL_ZONES    = [ZONE_PINK, ZONE_TEAL, ZONE_AMBER, ZONE_VIOLET];

function zoneColor(angle: number): string {
  const t = (angle + Math.PI) / (2 * Math.PI);          // 0-1
  const zone = ALL_ZONES[Math.floor(t * 4) % 4];
  return zone[Math.floor(Math.random() * zone.length)];
}

const SHAPE_COLORS = [
  "#ff006e", "#3a86ff", "#ffbe0b", "#fb5607", "#8338ec",
  "#06d6a0", "#e11d48", "#4f46e5", "#0891b2", "#00f5d4",
  "#f15bb5", "#00bbf9", "#7c3aed", "#d4a017",
];
function pickShape() { return SHAPE_COLORS[Math.floor(Math.random() * SHAPE_COLORS.length)]; }

/* ═════════════════════════════════════════════════════════════
   LAYER 1 — Deep star field (500 twinkling points)
   ════════════════════════════════════════════════════════════ */

const vertStars = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  varying float vBright;
  uniform float uTime;

  void main() {
    vBright = 0.5 + 0.5 * sin(uTime * (0.8 + aPhase * 1.5) + aPhase * 12.0);

    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (1.0 + vBright * 0.4) * (150.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragStars = /* glsl */ `
  varying float vBright;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float core = exp(-d * d * 120.0);
    float glow = exp(-d * d * 20.0) * 0.25;
    float a = (core + glow) * (0.5 + vBright * 0.5);
    vec3 col = mix(vec3(0.85, 0.88, 1.0), vec3(1.0, 0.97, 0.9), vBright);
    gl_FragColor = vec4(col, a);
  }
`;

function StarField() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const { geo, uniforms } = useMemo(() => {
    const N = 500;
    const pos = new Float32Array(N * 3);
    const siz = new Float32Array(N);
    const pha = new Float32Array(N);

    for (let i = 0; i < N; i++) {
      // Spread in a large sphere behind the nebula
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 6 + Math.random() * 12;
      pos[i * 3]     = Math.sin(phi) * Math.cos(theta) * r;
      pos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r * 0.6;
      pos[i * 3 + 2] = Math.cos(phi) * r - 5;

      siz[i] = 0.3 + Math.random() * 1.2;
      pha[i] = Math.random();
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("aSize",    new THREE.Float32BufferAttribute(siz, 1));
    g.setAttribute("aPhase",   new THREE.Float32BufferAttribute(pha, 1));

    return { geo: g, uniforms: { uTime: { value: 0 } } };
  }, []);

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <points geometry={geo}>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertStars}
        fragmentShader={fragStars}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

/* ═════════════════════════════════════════════════════════════
   LAYER 2 — Nebula gas clouds + bright knots (combined)
   Large soft gaussians for gas, medium-bright for knots
   ════════════════════════════════════════════════════════════ */

const vertGas = /* glsl */ `
  attribute float aSize;
  attribute vec3 color;
  attribute float aOpacity;
  varying vec3 vColor;
  varying float vOpacity;
  uniform float uTime;

  void main() {
    vColor = color;
    vOpacity = aOpacity;

    vec3 pos = position;
    pos.x += sin(uTime * 0.06 + position.y * 0.2) * 0.12;
    pos.y += cos(uTime * 0.05 + position.x * 0.15) * 0.08;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (22.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragGas = /* glsl */ `
  varying vec3 vColor;
  varying float vOpacity;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float a = exp(-d * d * 6.0) * vOpacity;
    gl_FragColor = vec4(vColor, a);
  }
`;

function NebulaGas() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const { geo, uniforms } = useMemo(() => {
    const tc = new THREE.Color();

    /* --- Gas clouds (100) --- */
    const gasN = 100;
    /* --- Core glow (6) --- */
    const coreN = 6;
    /* --- Bright knots (25) --- */
    const knotN = 25;
    const N = gasN + coreN + knotN;

    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const siz = new Float32Array(N);
    const opa = new Float32Array(N);

    let idx = 0;

    // Gas clouds — flattened ellipsoid, color-zoned
    for (let i = 0; i < gasN; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 1.5 + Math.random() * 5.5;
      const x = Math.cos(angle) * r + (Math.random() - 0.5) * 2;
      const y = Math.sin(angle) * r * 0.5 + (Math.random() - 0.5) * 1.5;
      const z = (Math.random() - 0.5) * 4;

      pos[idx * 3] = x;
      pos[idx * 3 + 1] = y;
      pos[idx * 3 + 2] = z;
      tc.set(zoneColor(angle));
      col[idx * 3] = tc.r; col[idx * 3 + 1] = tc.g; col[idx * 3 + 2] = tc.b;
      siz[idx] = 20 + Math.random() * 28;
      opa[idx] = 0.025 + Math.random() * 0.04;
      idx++;
    }

    // Core glow — clustered at center, very large & faint
    for (let i = 0; i < coreN; i++) {
      pos[idx * 3]     = (Math.random() - 0.5) * 2;
      pos[idx * 3 + 1] = (Math.random() - 0.5) * 1.2;
      pos[idx * 3 + 2] = (Math.random() - 0.5) * 1.5;
      const coreColors = ["#f15bb5", "#3a86ff", "#ffbe0b", "#8338ec"];
      tc.set(coreColors[Math.floor(Math.random() * coreColors.length)]);
      col[idx * 3] = tc.r; col[idx * 3 + 1] = tc.g; col[idx * 3 + 2] = tc.b;
      siz[idx] = 35 + Math.random() * 20;
      opa[idx] = 0.03 + Math.random() * 0.03;
      idx++;
    }

    // Bright emission knots — stars forming inside the gas
    for (let i = 0; i < knotN; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 1 + Math.random() * 4;
      pos[idx * 3]     = Math.cos(angle) * r + (Math.random() - 0.5) * 1.5;
      pos[idx * 3 + 1] = Math.sin(angle) * r * 0.45 + (Math.random() - 0.5) * 1;
      pos[idx * 3 + 2] = (Math.random() - 0.5) * 3;
      tc.set(zoneColor(angle));
      // Brighten the knot color
      tc.offsetHSL(0, 0, 0.15);
      col[idx * 3] = tc.r; col[idx * 3 + 1] = tc.g; col[idx * 3 + 2] = tc.b;
      siz[idx] = 4 + Math.random() * 7;
      opa[idx] = 0.1 + Math.random() * 0.18;
      idx++;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position",  new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("color",     new THREE.Float32BufferAttribute(col, 3));
    g.setAttribute("aSize",     new THREE.Float32BufferAttribute(siz, 1));
    g.setAttribute("aOpacity",  new THREE.Float32BufferAttribute(opa, 1));

    return { geo: g, uniforms: { uTime: { value: 0 } } };
  }, []);

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <points geometry={geo}>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertGas}
        fragmentShader={fragGas}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

/* ═════════════════════════════════════════════════════════════
   LAYER 3 — Geometric wireframe shapes (creativity artifacts)
   Orbiting through the nebula gas
   ════════════════════════════════════════════════════════════ */

type Geo = "ico" | "oct" | "dodeca" | "torus" | "box" | "cylinder" | "cone";

interface ShapeData {
  pos: [number, number, number];
  scale: number;
  speed: number;
  geo: Geo;
  color: string;
  opacity: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitPhase: number;
  tilt: number;
}

function GeometricShapes() {
  const groupRef = useRef<THREE.Group>(null);

  const shapes = useMemo<ShapeData[]>(() => {
    const geos: Geo[] = ["ico", "oct", "dodeca", "torus", "box", "cylinder", "cone"];
    return Array.from({ length: 14 }, (_, i) => {
      const angle = (i / 14) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const orbitR = 2 + Math.random() * 4.5;
      return {
        pos: [
          Math.cos(angle) * orbitR,
          Math.sin(angle) * orbitR * 0.5,
          (Math.random() - 0.5) * 4,
        ] as [number, number, number],
        scale: 0.2 + Math.random() * 0.5,
        speed: 0.05 + Math.random() * 0.12,
        geo: geos[Math.floor(Math.random() * geos.length)],
        color: pickShape(),
        opacity: 0.25 + Math.random() * 0.2,
        orbitRadius: orbitR,
        orbitSpeed: 0.02 + Math.random() * 0.04,
        orbitPhase: angle,
        tilt: (Math.random() - 0.5) * 1.0,
      };
    });
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const s = shapes[i];
      if (!s) return;
      const angle = s.orbitPhase + t * s.orbitSpeed;
      child.position.x = Math.cos(angle) * s.orbitRadius;
      child.position.y = Math.sin(angle) * s.orbitRadius * 0.5 + Math.sin(t * 0.15 + i) * 0.12;
      child.position.z = s.pos[2] + Math.sin(angle * 0.4) * 1.2;
      child.rotation.x = t * s.speed;
      child.rotation.z = t * s.speed * 0.5;
    });
  });

  return (
    <group ref={groupRef}>
      {shapes.map((s, i) => (
        <mesh key={i} position={s.pos} scale={s.scale} rotation={[s.tilt, 0, 0]}>
          {s.geo === "ico" && <icosahedronGeometry args={[1, 0]} />}
          {s.geo === "oct" && <octahedronGeometry args={[1, 0]} />}
          {s.geo === "dodeca" && <dodecahedronGeometry args={[1, 0]} />}
          {s.geo === "torus" && <torusGeometry args={[1, 0.35, 8, 16]} />}
          {s.geo === "box" && <boxGeometry args={[1.2, 1.2, 1.2]} />}
          {s.geo === "cylinder" && <cylinderGeometry args={[0.5, 0.5, 1.4, 8]} />}
          {s.geo === "cone" && <coneGeometry args={[0.7, 1.4, 6]} />}
          <meshBasicMaterial wireframe color={s.color} transparent opacity={s.opacity} />
        </mesh>
      ))}
    </group>
  );
}

/* ═════════════════════════════════════════════════════════════
   ROOT — Majestic nebula rotation + mouse parallax
   ════════════════════════════════════════════════════════════ */

function NebulaScene() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const h = () => { scrollRef.current = window.scrollY; };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    const m = mouse.current;
    m.tx = pointer.x * 0.25;
    m.ty = pointer.y * 0.15;
    m.x += (m.tx - m.x) * 0.008;
    m.y += (m.ty - m.y) * 0.008;

    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.018 + m.x * 0.06;
    groupRef.current.rotation.x = Math.sin(t * 0.012) * 0.08 - m.y * 0.04;
    groupRef.current.rotation.z = Math.sin(t * 0.008) * 0.03;
    groupRef.current.position.y = scrollRef.current * 0.0003;
  });

  return (
    <group ref={groupRef}>
      <StarField />
      <NebulaGas />
      <GeometricShapes />
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 50 }}
      style={{ position: "absolute", inset: 0, background: "transparent", pointerEvents: "auto" }}
      gl={{ antialias: true, alpha: true }}
    >
      <NebulaScene />
    </Canvas>
  );
}
