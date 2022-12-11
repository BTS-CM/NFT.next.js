import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useAspect } from '@react-three/drei';

function Scene(properties) {
  const size = useAspect(512, 512);
  const [video] = useState(() => {
    const vid = document.createElement('video');
    vid.src = `../../public/${properties.symbol}/0.mp4`;
    vid.crossOrigin = 'Anonymous';
    vid.loop = true;
    return vid;
  });

  // useeffect to play the video
  useEffect(() => {
    video.play();
  }, [video]);

  return (
    <mesh scale={size}>
      <planeBufferGeometry args={[1, 1]} />
      <meshBasicMaterial>
        <videoTexture attach="map" args={[video]} />
      </meshBasicMaterial>
    </mesh>
  );
}

export default function App(properties) {
  if (!properties.symbol) {
    return null;
  }

  const scene = <Scene {...properties} />;

  return scene
    ? (
              <Canvas orthographic linear camera={{ position: [0, 0, 100] }}>
                {scene}
              </Canvas>
    )
    : null;
}
