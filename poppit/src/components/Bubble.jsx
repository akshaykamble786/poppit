import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const Bubble = ({ position }) => {
  const bubbleRef = useRef();
  const [burst, setBurst] = useState(false);
  const audioRef = useRef();

  // Load textures: the original texture and a normal map for the popped effect
  const texture = useLoader(TextureLoader, '/poppped.jpg');
  const normalTexture = useLoader(TextureLoader, '/unpopped.png'); // Create or find a normal map that looks like a popped bubble

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

  useEffect(() => {
    if (burst) {
      // When burst is true, we apply the popped look by adjusting the material's normal map
      if (bubbleRef.current) {
        bubbleRef.current.material.normalMap = normalTexture;
        bubbleRef.current.material.needsUpdate = true; // Trigger material update
      }
    }
  }, [burst, normalTexture]);

  return (
    <mesh
      ref={bubbleRef}
      position={position}
      onClick={handleBurst}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        map={texture}
        normalMap={burst ? normalTexture : null} // Apply the normal map only when the bubble is burst
        transparent={true}
        opacity={0.8}
        roughness={0.1}
        metalness={0.3}
      />
    </mesh>
  );
};

export default Bubble;
