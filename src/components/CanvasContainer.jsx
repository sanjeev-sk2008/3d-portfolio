import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Preload, Lightformer } from '@react-three/drei';
import SceneModel from './SceneModel';

export default function CanvasContainer() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Studio lighting setup with Navy and Gold highlights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={2.0} color="#FFD700" />
      <pointLight position={[0, -5, 0]} intensity={1} color="#0A192F" />
      
      {/* 3D Model */}
      <SceneModel />

      {/* Procedural environment for reflections without external HDR fetches */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
          <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
          <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
        </group>
      </Environment>
      
      {/* Preload resources to avoid stuttering */}
      <Preload all />
    </Canvas>
  );
}
