import React from "react";
import { Canvas  } from '@react-three/fiber'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import Box from './geometries/Box'

export default function CanvasComponent(props) {

    // const CameraController = () => {
    //     const { camera, gl } = useThree();
    //     useEffect(
    //        () => {
    //           const controls = new OrbitControls(camera, gl.domElement);
    //           controls.minDistance = 3;
    //           controls.maxDistance = 20;
    //           return () => {
    //             controls.dispose();
    //           };
    //        },
    //        [camera, gl]
    //     );
    //     return null;
    // };

  return (
    <Canvas>
        <ambientLight />
        <spotLight intensity={1.2} position={[30, 30, 50]} angle={0.2} penumbra={1} castShadow />
        {/* <CameraController /> */}
        <Box />
    </Canvas>
  );
}
