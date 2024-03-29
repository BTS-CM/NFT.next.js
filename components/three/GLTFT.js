import { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls, Stars } from '@react-three/drei';

//https://docs.pmnd.rs/react-three-fiber/getting-started/examples

function GLTF(props) {
  const { scene, nodes, materials } = GLTFLoader(`../../public/${props.symbol}/0.glb`);
  return (<mesh><primitive object={scene} {...props} /></mesh>);
}

export default function GLTFT(properties) {
  if (!properties.data) {
    return null;
  }

  const media_gltf = properties.data;

  return (<Canvas sx={{ height: '500px', backgroundColor: 'black' }}>
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
              <GLTF gltf={media_gltf} symbol={properties.symbol} />
              <OrbitControls autoRotate />
            </Suspense>
          </Canvas>);
}
