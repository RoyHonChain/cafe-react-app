import { useRef, useState } from 'react'
import { Canvas, useFrame , useLoader} from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useSpring, animated, config, useSprings } from '@react-spring/three'

function Coin(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()

    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
  
    const [plus,minus,edge] = useLoader(TextureLoader, ['plus.png','minus.png','edge.png'])

    useFrame((state,delta)=>{
        ref.current.rotation.z+=delta;
    });

    return (
      <animated.mesh
        {...props}
        ref={ref}
        scale={hovered ? 1.35 : 1}
        onPointerOver={(event) => {
          hover(true) 
        }}
        onPointerOut={(event) => {
          hover(false)
        }}>
        <cylinderGeometry args={[2.2,2.2,0.5,100]}/>
        <meshBasicMaterial attach="material-0" map={edge} />
        <meshBasicMaterial attach="material-1" map={minus} />
        <meshBasicMaterial attach="material-2" map={plus} />
        
      </animated.mesh>
    )
  }


  export default Coin;