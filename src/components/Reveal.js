import { useEffect, useRef, useState } from "react";
import ninjaFlipJson from '../utils/NinjaFlip.json';
const { ethers } = require("ethers");

function Reveal({txProgress,setTxProgress,isWaiting,setIsWaiting,getPlayerState,setMsg,getGame,setPlayerState,getRamblingBalance,setRamblingBalance}){
    const revealBtn=`game-btn game-btn-reveal`;
    const [waitingBlock,setWaitingBlock] = useState(1);
    const [currentBlock,setCurrentBlock] = useState(0);
    const goal = useRef(false);
    const cb = useRef(0);
    const wb = useRef(0);
    const amount = useRef(0);
    useEffect(()=>{
        async function initReveal(){
            const game = await getGame();
            amount.current=ethers.utils.formatEther(game[2]);
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

    const ninjaFlipContractAddress = "0x71C2Fd7d36b4484E172286f40fEf5e21E4DBd85d";
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
    
            
            const revealTxn = await ninjaFlip.reveal();
            console.log("revealing bet...")
            setTxProgress("revealing bet...");
            setIsWaiting(true);
            await revealTxn.wait();
            console.log("mined ", revealTxn.hash);
            setTxProgress("bet revealed!");
            console.log("bet revealed!");
            setRamblingBalance(ethers.utils.formatEther(await getRamblingBalance()));
            const result = await getPlayerState()
            
            if(result==2){
                amount.current=amount.current*2*0.95;
                setMsg(`You Win!!! 🥳 +${amount.current}$R`);
            }
            else if(result==3)
                setMsg(`You Lose. 😖 Try again?`);

            setPlayerState(result);
            setIsWaiting(false);
          }
        } catch (error) {
          console.log(error);
        }
    };

    return(
        <div className="Reveal">
            {   (currentBlock>=waitingBlock)
                ?
                (
                    !isWaiting
                    ?
                    <div className={revealBtn} onClick={revealBet}>Reval</div>
                    :
                    <div className='TxProgress'>{txProgress}</div>
                )
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