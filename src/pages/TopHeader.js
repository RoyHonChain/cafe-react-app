import { NavLink } from "react-router-dom";
import airdropAbi from '../utils/Airdrop.json';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useAccount} from 'wagmi'

const { ethers } = require("ethers");

function TopHeader({ramblingBalance,setRamblingBalance,getRamblingBalance}) {

  const {isConnected} = useAccount({
    onConnect({ address, connector }) {
      console.log('Connected', { address, connector })
      refreshBalance();
    },
  });

  //合約資訊
  const airdropContractAddress = "0x7d42973D25c3ECF48075c9E8881b4424148e38B4";
  const airdropContractABI = airdropAbi;

  //與 airdrop 合約 互動設定
  const { config } = usePrepareContractWrite({
    address: airdropContractAddress,
    abi: airdropContractABI,
    functionName: 'airdrop',
  })
  const { data:airdropData, write:airdrop} = useContractWrite(config)
  const { isLoading:txLoading, isSuccess:txSucess} = useWaitForTransaction({
    hash: airdropData?.hash,
    onSuccess(data) {
      console.log('Success!', data)
      refreshBalance();
    },
  })

  const refreshBalance = async()=>{
    console.log("refreshBalance");
    const balance = ethers.utils.formatEther(await getRamblingBalance());
    setRamblingBalance(balance);
    console.log(balance);
  }

  return (
    <div className='TopHeader'>
        <div className='ToolBar'>
          <NavLink to="/" className={({isActive})=>['textNavBtn',isActive ? 'router-link-active' : null].join(' ')}>Home</NavLink>
          <NavLink to="/Donate" className={({isActive})=>['textNavBtn',isActive ? 'router-link-active' : null].join(' ')}>Donate</NavLink>
          <NavLink to="/Casino" className={({isActive})=>['textNavBtn',isActive ? 'router-link-active' : null].join(' ')}>Casino</NavLink>
          <NavLink to="/Art" className={({isActive})=>['textNavBtn',isActive ? 'router-link-active' : null].join(' ')}>Art</NavLink>
          <NavLink to="/Blog" className={({isActive})=>['textNavBtn',isActive ? 'router-link-active' : null].join(' ')}>Blog</NavLink>
        </div>
        
        <div className='WebsiteLogo'>
          Rambling
        </div>
        
        <div className='ConnectWallet'>
          <button className='AirdropTokenBtn' disabled={isConnected?false:true} onClick={()=>{airdrop?.()}} >{txLoading ? "Airdroping..." : "Airdrop 100$R"}</button>
          <ConnectButton showBalance={false} accountStatus="address"/>
          {isConnected && <div className='playerBalance' onClick={()=>{refreshBalance?.()}}>Balance: {ramblingBalance} $R</div>}
        </div>
    </div>
  );
}

export default TopHeader;
