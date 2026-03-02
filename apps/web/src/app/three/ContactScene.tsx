import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PALETTE = [
  "#ff006e", "#3a86ff", "#ffbe0b", "#fb5607", "#8338ec",
  "#06d6a0", "#e11d48", "#4f46e5", "#0891b2", "#ff4361",
  "#00f5d4", "#f15bb5", "#00bbf9", "#7c3aed", "#0d9668",
];

function pick() { return PALETTE[Math.floor(Math.random() * PALETTE.length)]; }

/* ── Shaders ─────────────────────────────────────────────────── */
const vert = /* glsl */ `
  attribute float aSize;
  attribute vec3 color;
  varying vec3 vColor;
  uniform float uTime;

  void main() {
    vColor = color;
    vec3 pos = position;
    pos.y += sin(uTime * 0.2 + position.x * 0.3) * 0.08;
    pos.x += cos(uTime * 0.15 + position.z * 0.25) * 0.06;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (180.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const frag = /* glsl */ `
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.1, d) * 0.45;
    gl_FragColor = vec4(vColor, a);
  }
`;

/* ── Splatter ────────────────────────────────────────────────── */
function SplatterField() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const { geo, uniforms } = useMemo(() => {
    const count = 150;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const tmp = new THREE.Color();

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      tmp.set(pick());
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
      sizes[i] = 1 + Math.random() * 3.5;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    g.setAttribute("aSize", new THREE.Float32BufferAttribute(sizes, 1));

    return { geo: g, uniforms: { uTime: { value: 0 } } };
  }, []);

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <points geometry={geo}>
      <shaderMaterial
        ref={matRef}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

/* ── Paint streaks ───────────────────────────────────────────── */
function PaintStreaks() {
  const lines = useMemo(() => {
    return Array.from({ length: 6 }, () => {
      let x = (Math.random() - 0.5) * 14;
      let y = (Math.random() - 0.5) * 8;
      let z = (Math.random() - 0.5) * 6;
      const pts: THREE.Vector3[] = [];
      const n = 3 + Math.floor(Math.random() * 3);
      for (let j = 0; j < n; j++) {
        pts.push(new THREE.Vector3(x, y, z));
        x += (Math.random() - 0.5) * 3.5;
        y += (Math.random() - 0.5) * 2.5;
        z += (Math.random() - 0.3) * 1.2;
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(36));
      const mat = new THREE.LineBasicMaterial({
        color: pick(),
        transparent: true,
        opacity: 0.15 + Math.random() * 0.2,
      });
      return new THREE.Line(geo, mat);
    });
  }, []);

  return (
    <group>
      {lines.map((l, i) => <primitive key={i} object={l} />)}
    </group>
  );
}

/* ── Small drip blobs ────────────────────────────────────────── */
function Drips() {
  const groupRef = useRef<THREE.Group>(null);

  const drips = useMemo(() =>
    Array.from({ length: 10 }, () => ({
      pos: [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
      ] as [number, number, number],
      scale: 0.04 + Math.random() * 0.1,
      color: pick(),
      speed: 0.06 + Math.random() * 0.12,
    })),
  []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const d = drips[i];
      if (!d) return;
      child.position.y = d.pos[1] + Math.sin(t * d.speed + i) * 0.15;
      child.rotation.x = t * d.speed * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      {drips.map((d, i) => (
        <mesh key={i} position={d.pos} scale={d.scale}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color={d.color} transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Main ────────────────────────────────────────────────────── */
function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.006;
    groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.015;
  });

  return (
    <group ref={groupRef}>
      <SplatterField />
      <PaintStreaks />
      <Drips />
    </group>
  );
}

export function ContactScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ position: "absolute", inset: 0, background: "transparent", pointerEvents: "none" }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
    </Canvas>
  );
}
