import React, { useRef, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Canvas } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF, OrbitControls, Stars } from "@react-three/drei";

function GLTF(props) {
  const gltfString = atob(props.gltf);
  let gltf_loader = new GLTFLoader();
  let gltf = gltf_loader.parse(gltfString);

  return (
    <mesh>
     <primitive object={gltf.scene} />
    </mesh>
  )
}

export default function GLTFT(properties) {
  if (!properties.data) {
    return null;
  }

  let media_gltf = properties.data;

  return (<Canvas style={{"height": "500px", "backgroundColor": "black"}}>
            <Suspense fallback={null}>
              <Stars
                radius={100} // Radius of the inner sphere (default=100)
                depth={50} // Depth of area where stars should fit (default=50)
                count={1000} // Amount of stars (default=5000)
                factor={4} // Size factor (default=4)
                saturation={0} // Saturation 0-1 (default=0)
                fade
              />
              <ambientLight intensity={1} />
              <GLTF gltf={media_gltf} />
              <OrbitControls autoRotate />
            </Suspense>
          </Canvas>);
}
