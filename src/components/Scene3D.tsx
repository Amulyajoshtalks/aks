import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ position, color, speed, size, shape }: {
  position: [number, number, number];
  color: string;
  speed: number;
  size: number;
  shape: "icosahedron" | "torus" | "octahedron" | "box";
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case "icosahedron": return <icosahedronGeometry args={[size, 0]} />;
      case "torus": return <torusGeometry args={[size, size * 0.3, 16, 32]} />;
      case "octahedron": return <octahedronGeometry args={[size, 0]} />;
      case "box": return <boxGeometry args={[size, size, size]} />;
    }
  }, [shape, size]);

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        {geometry}
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.15}
          wireframe
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#00ffff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#a855f7" />

      <FloatingShape position={[-3, 2, -2]} color="#00ffff" speed={1.2} size={1} shape="icosahedron" />
      <FloatingShape position={[3, -1, -3]} color="#a855f7" speed={0.8} size={1.3} shape="torus" />
      <FloatingShape position={[-2, -2, -1]} color="#00ff88" speed={1} size={0.8} shape="octahedron" />
      <FloatingShape position={[2, 2, -4]} color="#ff00aa" speed={0.6} size={0.6} shape="box" />
      <FloatingShape position={[0, -3, -2]} color="#00ffff" speed={1.4} size={0.5} shape="icosahedron" />

      <Particles />
    </Canvas>
  );
}
