import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';

export default function AntigravityObjects() {
  const groupRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    // Parallax effect from scroll
    const scrollY = window.scrollY;
    // Map scroll down to pushing objects up
    const targetY = (scrollY * 0.005);
    
    // Smoothly interpolate group position
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
    
    // Slight continuous rotation for the whole system
    groupRef.current.rotation.y += delta * 0.05;
    groupRef.current.rotation.z += delta * 0.02;

    // Ring responds to mouse position
    const targetRingX = (state.pointer.x * Math.PI) / 6;
    const targetRingY = (state.pointer.y * Math.PI) / 6;
    
    ringRef.current.rotation.x = THREE.MathUtils.lerp(ringRef.current.rotation.x, -targetRingY, 0.05);
    ringRef.current.rotation.y = THREE.MathUtils.lerp(ringRef.current.rotation.y, targetRingX, 0.05);
    ringRef.current.rotation.z -= delta * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Central elegant glass-like structure */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh>
          <icosahedronGeometry args={[2.5, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={2}
            chromaticAberration={0.08}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.5}
            temporalDistortion={0.1}
            color="#FFFFFF"
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </Float>

      {/* Golden Orbital Ring */}
      <group ref={ringRef}>
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
          <mesh rotation={[Math.PI / 2.5, 0, 0]}>
            <torusGeometry args={[4.5, 0.03, 32, 100]} />
            <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} />
          </mesh>
          <mesh rotation={[Math.PI / 1.5, 0, 0]}>
            <torusGeometry args={[5.5, 0.015, 32, 100]} />
            <meshStandardMaterial color="#FFFFFF" metalness={0.8} roughness={0.2} />
          </mesh>
        </Float>
      </group>

      {/* Floating Navy/Gold/White Debris in Antigravity */}
      {Array.from({ length: 30 }).map((_, i) => {
        const isGold = i % 4 === 0;
        const isWhite = i % 4 === 1;
        // Remaining are Navy

        return (
          <Float
            key={i}
            speed={1 + Math.random() * 2}
            rotationIntensity={1 + Math.random() * 3}
            floatIntensity={1 + Math.random() * 3}
            position={[
              (Math.random() - 0.5) * 25,
              (Math.random() - 0.5) * 25,
              (Math.random() - 0.5) * 15 - 5
            ]}
          >
            <mesh>
              {i % 3 === 0 ? (
                <icosahedronGeometry args={[Math.random() * 0.5 + 0.1, 0]} />
              ) : i % 3 === 1 ? (
                <octahedronGeometry args={[Math.random() * 0.4 + 0.1, 0]} />
              ) : (
                <dodecahedronGeometry args={[Math.random() * 0.4 + 0.1, 0]} />
              )}
              <meshStandardMaterial 
                color={isGold ? "#FFD700" : (isWhite ? "#FFFFFF" : "#0A192F")} 
                metalness={isGold || isWhite ? 0.9 : 0.5} 
                roughness={isGold || isWhite ? 0.1 : 0.4} 
                emissive={isGold ? "#1A1500" : "#000000"}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}
