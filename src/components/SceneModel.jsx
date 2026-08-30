import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, PresentationControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function ProceduralCyberCore() {
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    // Animate the core components
    coreRef.current.position.y = Math.sin(t * 2) * 0.1;
    ring1Ref.current.rotation.x = t * 0.5;
    ring1Ref.current.rotation.y = t * 0.2;
    ring2Ref.current.rotation.x = -t * 0.3;
    ring2Ref.current.rotation.z = t * 0.4;
  });

  return (
    <group scale={1.2}>
      {/* Main Core Sphere */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.2, 2]} />
        <meshStandardMaterial color="#FFFFFF" metalness={0.9} roughness={0.1} flatShading />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>

      {/* Outer Ring 1 - Gold */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2, 0.1, 16, 100]} />
        <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.2} />
      </mesh>

      {/* Outer Ring 2 - Navy/Silver */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.5, 0.05, 16, 100]} />
        <meshStandardMaterial color="#0A192F" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Top and Bottom nodes */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.2, 0.5, 0.5, 16]} />
        <meshStandardMaterial color="#112240" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.5, 0.2, 0.5, 16]} />
        <meshStandardMaterial color="#112240" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function SceneModel() {
  const outerGroupRef = useRef();
  const innerGroupRef = useRef();
  const pointer = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    // Scroll-based parallax
    const scrollY = window.scrollY;
    const targetY = scrollY * 0.005;
    
    // Smoothly interpolate vertical position based on scroll
    outerGroupRef.current.position.y = THREE.MathUtils.lerp(outerGroupRef.current.position.y, targetY, 0.05);

    // Mouse interactive parallax using global window coordinates
    const targetX = (pointer.current.x * Math.PI) / 3;
    const targetZ = -(pointer.current.y * Math.PI) / 3;
    
    // Smoothly interpolate rotation based on mouse coordinates on the inner group
    if (innerGroupRef.current) {
      innerGroupRef.current.rotation.y = THREE.MathUtils.lerp(innerGroupRef.current.rotation.y, targetX, 0.05);
      innerGroupRef.current.rotation.x = THREE.MathUtils.lerp(innerGroupRef.current.rotation.x, targetZ, 0.05);
    }
  });

  return (
    <group ref={outerGroupRef}>
      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.2, 0.2]}
        azimuth={[-0.5, 0.5]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4} floatIntensity={2} speed={1.5}>
          <group ref={innerGroupRef}>
            <ProceduralCyberCore />
          </group>
        </Float>
      </PresentationControls>

      {/* Nice shadow underneath the model */}
      <ContactShadows position={[0, -3.5, 0]} opacity={0.5} scale={20} blur={2} far={4.5} color="#0A192F" />

      {/* Floating golden and navy accent particles surrounding the model */}
      {Array.from({ length: 25 }).map((_, i) => (
        <Float
          key={i}
          speed={1 + Math.random() * 2}
          rotationIntensity={2}
          floatIntensity={2}
          position={[
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10 - 5
          ]}
        >
          <mesh scale={Math.random() * 0.2 + 0.05}>
            <octahedronGeometry />
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#FFD700" : "#FFFFFF"} 
              metalness={0.8} 
              roughness={0.2} 
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}
