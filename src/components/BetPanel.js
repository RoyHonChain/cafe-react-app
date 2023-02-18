import { useState } from 'react';
import ninjaFlipJson from '../utils/NinjaFlip.json';
import erc20Json from '../utils/RamblingERC20.json'
const { ethers, BigNumber } = require("ethers");


function BetPanel({currentAccount,setMsg,choose,setChoose,amount,setAmount,getRamblingBalance,getPlayerState,setPlayerState,setRamblingBalance}){

    const plusBtn=`game-btn game-btn-plus`;
    const minusBtn=`game-btn game-btn-minus`;
    const betBtn=`game-btn game-btn-bet`;
    const commitBtn=`game-btn game-btn-commit`;

    const ninjaFlipContractAddress = "0x36B8607c7299480D44E556C55675933766576309";
    const ninjaFlipAbi=ninjaFlipJson.abi;

    const erc20ContractAddress = "0x2F2d82Da4c49806659e01fD03B091F0d265cb80e";
    const erc20Abi = erc20Json;

    const [txProgress,setTxProgress] = useState("");

    function clickChoose(c){
        setChoose(c);
        if(c==0)
            setMsg(`Bet ${amount} $R on +PLUS...`);
        else if(c==1)
            setMsg(`Bet ${amount} $R on -minus...`);
    }

    function clickAmount(a){
        setAmount(a);
        if(choose=="0")
            setMsg(`Bet ${a} $R on +PLUS...`);
        else if(choose=="1")
            setMsg(`Bet ${a} $R on -minus...`);
    }

    const checkAllowance = async () => {
        try {
            const {ethereum} = window;
      
            if (ethereum) {
              const provider = new ethers.providers.Web3Provider(ethereum, "any");
              const signer = provider.getSigner();
              const erc20Token = new ethers.Contract(
                erc20ContractAddress,
                erc20Abi,
                signer
              );
      
              console.log("checking allowance...")
              setTxProgress("checking allowance...");

              const allowance = await erc20Token.allowance(currentAccount,ninjaFlipContractAddress);
              console.log("allowance=",allowance)
              setTxProgress("got allowance");
              if(allowance.lt(ethers.utils.parseEther(amount))){
                console.log(allowance);
                console.log(BigNumber.from(amount));
                setTxProgress("allowance not enough");
                const getApprove = await erc20Token.approve(ninjaFlipContractAddress,"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
                setTxProgress("getting approve...");
                await getApprove.wait();
                setTxProgress("got approve!");
              }
              
            }
          } catch (error) {
            console.log(error);
          }
    };

    const commitBet = async () => {
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
            await checkAllowance();
            console.log("commiting bet...")
            setTxProgress("commiting bet...");

            const flipTxn = await ninjaFlip.commitBet(choose,ethers.utils.parseEther(amount));
            setTxProgress("waiting Tx mined...");
            await flipTxn.wait();
            
            console.log("Tx mined ", flipTxn.hash);
    
            console.log("bet commited!");
            setTxProgress("bet commited!");
            setPlayerState(await getPlayerState());
            setRamblingBalance(ethers.utils.formatEther(await getRamblingBalance()));
          }
        } catch (error) {
          console.log(error);
        }
    };

    return(
        <div className='BetPanel'>
          <div className='PlusOrMinus'>
              <div className={plusBtn} onClick={()=>clickChoose(0)}>+</div>
              <div className={minusBtn} onClick={()=>clickChoose(1)}>-</div>
          </div>

          <div className='BetRow'>
              <div className={betBtn} onClick={()=>clickAmount("1")} >1 $R</div>
              <div className={betBtn} onClick={()=>clickAmount("5")} >5 $R</div>
              <div className={betBtn} onClick={()=>clickAmount("10")} >10 $R</div>
          </div>

          <div className='BetRow'>
              <div className={betBtn} onClick={()=>clickAmount("25")} >25 $R</div>
              <div className={betBtn} onClick={()=>clickAmount("50")} >50 $R</div>
              <div className={betBtn} onClick={()=>clickAmount("100")} >100 $R</div>
          </div>
          <div className='CommitRow'>
              <div className={commitBtn} onClick={()=>commitBet()}>Double Or Nothing</div>
              <div>{txProgress}</div>
          </div>

        </div>
    )
}

export default BetPanel;