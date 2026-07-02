import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

function Planet() {
  const { scene } = useGLTF('/planet/scene.gltf');
  return (
    <primitive
      object={scene}
      scale={2.6}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

useGLTF.preload('/planet/scene.gltf');

export default function Earth() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ preserveDrawingBuffer: false, antialias: true, alpha: true }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 6, 5]} intensity={1} />
        <OrbitControls
          autoRotate
          autoRotateSpeed={1.4}
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Planet />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
