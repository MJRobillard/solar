import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { CubeTexture, RingGeometry } from 'three';

function Planet({ radius, color, x, y, z, name, orbitRadius, speed }) {
  const ref = useRef();
  const orbitRef = useRef();

  useFrame(() => {
    ref.current.rotation.y += 0.01;
    orbitRef.current.rotation.y += speed;
  });

  return (
    <group ref={orbitRef}>
      <mesh ref={ref} position={[orbitRadius, 0, 0]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Text
        position={[orbitRadius, -radius - 0.5, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
}

function Moon({ radius, color, x, y, z, orbitRadius, speed }) {
  const ref = useRef();
  const orbitRef = useRef();

  useFrame(() => {
    ref.current.rotation.y += 0.01;
    orbitRef.current.rotation.y += speed;
  });

  return (
    <group ref={orbitRef} position={[x, y, z]}>
      <mesh ref={ref} position={[orbitRadius, 0, 0]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

function SolarSystem() {
  return (
    <Canvas camera={{ position: [0, 0, 40] }} style={{ backgroundColor: 'black' }}>
      <OrbitControls />
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Planet radius={1} color="yellow" x={0} y={0} z={0} name="Sun" orbitRadius={0} speed={0} /> // Sun
      <Planet radius={0.2} color="gray" x={0} y={0} z={0} name="Mercury" orbitRadius={3} speed={0.01} /> // Mercury
      <Planet radius={0.5} color="orange" x={0} y={0} z={0} name="Venus" orbitRadius={6} speed={0.005} /> // Venus
      <Planet radius={0.5} color="blue" x={0} y={0} z={0} name="Earth" orbitRadius={9} speed={0.003} /> // Earth
      <Moon radius={0.1} color="gray" x={9} y={0} z={0} orbitRadius={0.5} speed={0.01} /> // Earth's Moon
      <Planet radius={0.3} color="red" x={0} y={0} z={0} name="Mars" orbitRadius={12} speed={0.002} /> // Mars
      <Planet radius={1.5} color="orange" x={0} y={0} z={0} name="Jupiter" orbitRadius={18} speed={0.001} /> // Jupiter
      <Planet radius={1.2} color="yellow" x={0} y={0} z={0} name="Saturn" orbitRadius={24} speed={0.0005} /> // Saturn
      <Planet radius={0.5} color="blue" x={0} y={0} z={0} name="Uranus" orbitRadius={30} speed={0.0003} /> // Uranus
      <Planet radius={0.5} color="blue" x={0} y={0} z={0} name="Neptune" orbitRadius={36} speed={0.0001} /> // Neptune
    </Canvas>
  );
}

export default SolarSystem;