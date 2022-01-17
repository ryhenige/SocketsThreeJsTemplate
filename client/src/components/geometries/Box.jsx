import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useDrag } from "@use-gesture/react"

import { Listener, socket } from '../../helpers/sockets'

export default function Box(props) {
  const ref = useRef()
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width
  const [position, setPosition] = useState([0, 0, 0])

  useEffect(() => {
    Listener(handleSocket)
  }, [])


  useFrame(() => {
    ref.current.rotation.z += 0.001
    ref.current.rotation.x += 0.001
  })

  const handleSocket = (type, data) => {
    setPosition([data.x, data.y, data.z])
  }

  const bind = useDrag(({ offset: [x, y] }) => {
    const [,, z] = position;
    const data = {
      x: x / aspect,
      y: -y / aspect,
      z: z
    }
    socket.emit('updateBoxPos', data)
    setPosition([data.x, data.y, data.z])
}, { pointerEvents: true })

  return (
    <mesh    
      ref={ref}
      position={position}
      {...bind()}>
      <boxGeometry 
        attach="geometry" 
        args={[1, 1, 1]} 
        />
      <meshPhongMaterial 
        attach="material" 
        color="hotpink" />
    </mesh>
  );
}