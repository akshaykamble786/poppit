import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Bubble from './Bubble';

const BubbleScene = () => {
  const rows = 20; // Number of rows
  const columns = 50; // Number of columns
  const bubbleRadius = 0.5; // Radius of each bubble
  const spacing = 1.1; // Spacing between bubbles

  const bubbles = [];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const x = col * spacing - (columns * spacing) / 2 + bubbleRadius;
      const y = row * spacing - (rows * spacing) / 2 + bubbleRadius;
      bubbles.push(<Bubble key={`${row}-${col}`} position={[x, y, 0]} />);
    }
  }

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {bubbles}
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default BubbleScene;


