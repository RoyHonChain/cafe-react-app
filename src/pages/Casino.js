import casino from '../images/casino.png';
import { Canvas, useFrame , useLoader} from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import Coin from '../components/Coin';


function Casino() {
  
  const plusBtn=`game-btn game-btn-plus`;
  const minusBtn=`game-btn game-btn-minus`;
  const betBtn=`game-btn game-btn-bet`;


  return (
    <div className='Casino'>
        <div className="banner-text">Gamble Not Good! but...</div>
        <div className='GamePanel'>
          <Canvas camera={{position:[0,7,-2.2],fov:50,rotation:[-0.6*Math.PI,0,0]}}  >
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Coin position={[0, 0, 0]}/>
          </Canvas>
        </div>
        <div className='PlusOrMinus'>
            <div className={plusBtn}>+</div>
            <div className={minusBtn}>-</div>
        </div>

        <div className='BetRow'>
            <div className={betBtn}>1 $R</div>
            <div className={betBtn}>5 $R</div>
            <div className={betBtn}>10 $R</div>
        </div>

        <div className='BetRow'>
            <div className={betBtn}>25 $R</div>
            <div className={betBtn}>50 $R</div>
            <div className={betBtn}>100 $R</div>
        </div>

    </div>
  );
}

export default Casino;
