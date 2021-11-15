import { useRef, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Canvas } from '@react-three/fiber'
import { VOXLoader, VOXMesh } from 'three/examples/jsm/loaders/VOXLoader'
import { OrbitControls, Stars } from "@react-three/drei";

function VOX(props) {
  let loader = new VOXLoader();
  let loadedVOX;
  try {
    loadedVOX = loader.load(`../../public/images/${props.symbol}/0.vox`);
  } catch (e) {}

  return loadedVOX
          ? (
              <mesh>
               <primitive object={loadedVOX} />
              </mesh>
            )
          : null;
}

export default function VOXT(properties) {
  if (!properties.symbol) {
    return null;
  }

  let vox = <VOX {...properties} />

  return fbx
          ? (<Canvas sx={{height: "500px", backgroundColor: "black"}}>
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
                {vox}
                <OrbitControls autoRotate />
              </Suspense>
            </Canvas>)
          : null;
}
