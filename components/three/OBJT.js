import { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useTexture, OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, SMAA } from '@react-three/postprocessing';
import atob from 'atob';

import NearestFilter from 'three';

function OBJ(props) {
  const pngString = props.png;
  const texture = useTexture(`data:image/png;base64,${pngString}`);
  texture.anisotropy = 16;
  texture.magFilter = NearestFilter;
  texture.minFilter = NearestFilter;

  const objString = atob(props.obj);
  const obj_loader = new OBJLoader();
  const obj = obj_loader.parse(objString);

  obj.traverse((o) => {
    if (o.isMesh) {
      // eslint-disable-next-line no-param-reassign
      o.material.map = texture;
    }
  });

  const group = useRef();

  return (
    <group ref={group} dispose={null}>
      <primitive
        object={obj}
        material={texture}
        position={[0, -2, 0]}
      />
    </group>
  );
}

export default function OBJT(properties) {
  if (!properties.data) {
    return null;
  }

  const media_json = JSON.parse(atob(properties.data));

  const media_obj = media_json ? media_json.media_obj : undefined;
  const media_png = media_json ? media_json.media_png : undefined;

  if (!media_obj || !media_png) {
    return null;
  }

  return (<Canvas
    style={{
      height: '500px',
      backgroundColor: 'black',
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
              <OrbitControls autoRotate minDistance={10} maxDistance={200} />
            </Suspense>
          </Canvas>);
}
