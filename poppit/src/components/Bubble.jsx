import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { MeshWobbleMaterial } from '@react-three/drei';

const Bubble = ({ position }) => {
    const bubbleRef = useRef();
    const [burst, setBurst] = useState(false);
    const audioRef = useRef();
  
    // Create a Three.js AudioListener and Audio
    useFrame(({ camera }) => {
      if (!audioRef.current) {
        audioRef.current = new THREE.Audio(new THREE.AudioListener());
        const loader = new THREE.AudioLoader();
        loader.load('/bubblepop.mp3', (buffer) => {
          audioRef.current.setBuffer(buffer);
          audioRef.current.setLoop(false);
          audioRef.current.setVolume(1);
        });
      }
    });
  
    const handleBurst = () => {
      setBurst(true);
      if (audioRef.current) {
        audioRef.current.play(); // Play the audio
      }
    };
  
    return (
      <mesh
        ref={bubbleRef}
        position={position}
        onClick={handleBurst}
        scale={burst ? [0, 0, 0] : [1, 1, 1]} // Bubble shrinks when clicked
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <MeshWobbleMaterial
          color={burst ? 'transparent' : 'lightblue'}
          speed={1} // Speed of wobbling
          factor={0.3} // Wobble effect intensity
          transparent
          opacity={0.8}
        />
      </mesh>
    );
  };
  
export default Bubble;




