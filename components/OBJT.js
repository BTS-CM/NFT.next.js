import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useTexture, OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, SMAA } from '@react-three/postprocessing'
import * as THREE from 'three';

function OBJ(props) {
  const pngString = props.png;
  const texture = useTexture(`data:image/png;base64,${pngString}`);
  texture.anisotropy = 16;
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;

  const objString = atob(props.obj);
  let obj_loader = new OBJLoader();
  let obj = obj_loader.parse(objString)

  obj.traverse((o) => {
    if (o.isMesh) {
      o.material.map = texture;
    }
  });

  return (
    <mesh>
      <primitive attach="geometry" object={obj} />
      <meshStandardMaterial attach="material" map={texture} />
    </mesh>
  )
}

export default function OBJT(properties) {
  if (!properties.data) {
    return null;
  }

  let media_json = JSON.parse(atob(properties.data));
  let media_obj = media_json ? media_json.media_obj : undefined;
  let media_png = media_json ? media_json.media_png : undefined;

  if (!media_obj || !media_png) {
    return null;
  }

  // pixelRatio={window.devicePixelRatio}
  // pixelRatio={window.devicePixelRatio ? window.devicePixelRatio : 1}
  //let ratio = window.devicePixelRatio || 1;
  // size={window.innerWidth, window.innerHeight}
  return (<Canvas
            style={{
              "height": "500px",
              "backgroundColor": "black"
            }}
          >
            <Suspense fallback={null}>
              <Stars
                radius={100} // Radius of the inner sphere (default=100)
                depth={50} // Depth of area where stars should fit (default=50)
                count={1000} // Amount of stars (default=5000)
                factor={3} // Size factor (default=4)
                saturation={0} // Saturation 0-1 (default=0)
                fade
              />
              <ambientLight intensity={1} />
              <OBJ obj={media_obj} png={media_png} />
              <EffectComposer multisampling={0}>
                <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={500} />
                <Vignette eskil={false} offset={0.1} darkness={0.75} />
                <SMAA />
              </EffectComposer>
              <OrbitControls autoRotate />
            </Suspense>
          </Canvas>);
}
