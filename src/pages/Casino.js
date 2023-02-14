import casino from '../images/casino.png';
import { Canvas, useFrame , useLoader} from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import Coin from '../components/Coin';
import { useState } from 'react';
import BetPanel from '../components/BetPanel';
import Reveal from '../components/Reveal';


function Casino() {

  const [stage,setStage]=useState(0);
  const [msg,setMsg]=useState("Welcome~ Good to see you ...");


  return (
    <div className='Casino'>
        <div className="banner-text">Gambling Not Good! but...</div>
        <div className='GamePanel'>
          <Canvas camera={{position:[0,7,-2.2],fov:50,rotation:[-0.6*Math.PI,0,0]}}  >
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Coin position={[0, 0, 0]}/>
          </Canvas>
        </div>
        <div className='BetInfo'>&#129399;: <a>{msg}</a> </div>
        { (stage==0) && <BetPanel setStage={setStage} setMsg={setMsg}></BetPanel>}
        { (stage>=1) && <Reveal stage={stage} setStage={setStage} setMsg={setMsg}></Reveal>} 
    </div>
  );
}

export default Casino;
