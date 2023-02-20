import casino from '../images/casino.png';
import { Canvas, useFrame , useLoader} from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import Coin from '../components/Coin';
import { useEffect, useState } from 'react';
import BetPanel from '../components/BetPanel';
import Reveal from '../components/Reveal';
import ninjaFlipJson from '../utils/NinjaFlip.json';
const { ethers } = require("ethers");


function Casino({walletConnected,isWalletConnected,getRamblingBalance,setRamblingBalance,currentAccount}) {

  const [playerState,setPlayerState]=useState(0);
  const [choose,setChoose]=useState("0");
  const [amount,setAmount]=useState("1");
  const [msg,setMsg]=useState(`Welcome~ Good to see you...`);
  const [txProgress,setTxProgress] = useState("");
  const [isWaiting,setIsWaiting] = useState(false);

  const ninjaFlipContractAddress = "0x71C2Fd7d36b4484E172286f40fEf5e21E4DBd85d";
  const ninjaFlipAbi=ninjaFlipJson.abi;


  const getGame = async ()=>{

    try {
      
      const {ethereum} = window;
      
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const ninjaFlip = new ethers.Contract(
          ninjaFlipContractAddress,
          ninjaFlipAbi,
          signer
        );

        const accounts = await ethereum.request({
          method: 'eth_requestAccounts'
        });
        const game = await ninjaFlip.playerRec(accounts[0]);
        return game;
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getPlayerState = async ()=>{
    const game = await getGame();
    const gameState = game[3]
    console.log("game state=",gameState);
    console.log(typeof(gameState));
    return gameState;
  }

  useEffect(()=>{    
    async function initPlayerState(){
      if(!(await isWalletConnected())){
        setMsg('Please connect the wallet...');
      }
      else{
        setPlayerState(await getPlayerState());
        setMsg(`Welcome~ Good to see you...`);
      }
    }
    initPlayerState();
  },[currentAccount]);

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
        <div className='BetInfo'> &#129399;: <a>{msg}</a> </div>
        
        
        { walletConnected
        ?
        ((playerState!=1) && <BetPanel 
          setPlayerState={setPlayerState} 
          setMsg={setMsg}
          choose={choose}
          setChoose={setChoose}
          amount={amount}
          setAmount={setAmount}
          getRamblingBalance={getRamblingBalance}
          getPlayerState={getPlayerState}
          setRamblingBalance={setRamblingBalance}
          currentAccount={currentAccount}
          txProgress={txProgress}
          setTxProgress={setTxProgress}
          isWaiting={isWaiting}
          setIsWaiting={setIsWaiting}
          >
          </BetPanel>)
          :
          <div></div>
          }


        { (playerState==1) && <Reveal 
          getPlayerState={getPlayerState} 
          setMsg={setMsg}
          getGame={getGame}
          setPlayerState={setPlayerState} 
          getRamblingBalance={getRamblingBalance} 
          setRamblingBalance={setRamblingBalance} 
          txProgress={txProgress}
          setTxProgress={setTxProgress}
          isWaiting={isWaiting}
          setIsWaiting={setIsWaiting}
          >
          </Reveal>} 
    </div>
  );
}

export default Casino;
