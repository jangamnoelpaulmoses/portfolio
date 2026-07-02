import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Billboard, OrbitControls } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { techIcons } from '../data/content';

function fibonacciSphere(samples, radius = 2) {
  const points = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    points.push([x * radius, y * radius, z * radius]);
  }
  return points;
}

function IconBillboard({ position, src }) {
  const tex = useLoader(TextureLoader, src);
  tex.colorSpace = THREE.SRGBColorSpace;
  return (
    <Billboard position={position}>
      <mesh>
        <planeGeometry args={[0.85, 0.85]} />
        <meshBasicMaterial map={tex} transparent depthWrite={false} />
      </mesh>
    </Billboard>
  );
}

function Sphere() {
  const group = useRef();
  const positions = useMemo(
    () => fibonacciSphere(techIcons.length, 2.4),
    []
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
  });

  return (
    <group ref={group}>
      {/* Wireframe halo */}
      <mesh>
        <icosahedronGeometry args={[2.4, 1]} />
        <meshBasicMaterial
          color="#7c5cff"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>
      {techIcons.map((t, i) => (
        <IconBillboard
          key={t.name}
          position={positions[i]}
          src={t.src}
        />
      ))}
    </group>
  );
}

export default function TechSphere() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 6.5], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 4, 5]} intensity={0.6} />
      <Sphere />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        rotateSpeed={0.5}
      />
    </Canvas>
  );
}
