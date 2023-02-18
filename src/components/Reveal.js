import { useEffect, useRef, useState } from "react";
import ninjaFlipJson from '../utils/NinjaFlip.json';
const { ethers } = require("ethers");

function Reveal({getPlayerState,setMsg,getGame,setPlayerState,getRamblingBalance,setRamblingBalance}){
    const revealBtn=`game-btn game-btn-reveal`;
    const [waitingBlock,setWaitingBlock] = useState(1);
    const [currentBlock,setCurrentBlock] = useState(0);
    const goal = useRef(false);
    const cb = useRef(0);
    const wb = useRef(0);

    useEffect(()=>{
        async function initReveal(){
            const game = await getGame();
            wb.current=parseInt(game[0])+1;
            setWaitingBlock(wb.current);   //game[0] is blockNumber
            if(game[1]==0)  // game[1] is choose
                setMsg(`Bet ${ethers.utils.formatEther(game[2])} $R on +PLUS...`);    // game[2] is choose
            else if(game[1]==1)
                setMsg(`Bet ${ethers.utils.formatEther(game[2])} $R on -minus...`);
        
            const {ethereum} = window;
            const provider = new ethers.providers.Web3Provider(ethereum, "any");
                      
            const interval = setInterval(async() => {
        
                if(!goal.current){
                    cb.current = await provider.getBlockNumber();
                    setCurrentBlock(cb.current);
                    if(cb.current>=wb.current)
                        goal.current=true;
                }
                else{
                    setCurrentBlock(cb.current);
                    clearInterval(interval);
                }
            }, 3000);        
        
        
        }

        initReveal();
    },[]);

    const ninjaFlipContractAddress = "0x36B8607c7299480D44E556C55675933766576309";
    const ninjaFlipAbi=ninjaFlipJson.abi;

    const revealBet = async () => {
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
    
            console.log("revealing bet...")
            const revealTxn = await ninjaFlip.reveal();
            await revealTxn.wait();
    
            console.log("mined ", revealTxn.hash);
    
            console.log("bet revealed!");
            setRamblingBalance(ethers.utils.formatEther(await getRamblingBalance()));
            setPlayerState(await getPlayerState());
          }
        } catch (error) {
          console.log(error);
        }
    };

    return(
        <div className="Reveal">
            {   (currentBlock>=waitingBlock)
                ?
                <div className={revealBtn} onClick={revealBet}>Reval</div>
                :
                <div className="WaitBlock">
                    <div>&#127922; Please Wait 1 Block For A Fair Random Seed ... &#127922;</div>
                    <div>Waiting block: {ethers.utils.commify(waitingBlock)}</div>
                    <div>Current block: {(currentBlock==0) ? "fetching ..." : ethers.utils.commify(currentBlock)}</div>
                </div>
            }
            
        </div>
    )
}

export default Reveal;