import { useRef, useState,useEffect } from "react";
import { HashRouter, NavLink, Routes, Route } from "react-router-dom";
import airdropAbi from '../utils/Airdrop.json';
const { ethers } = require("ethers");

function TopHeader({currentAccount,setCurrentAccount,ramblingBalance,getRamblingBalance}) {
  const connectWalletBtn=`px-4 h-9 rounded-lg border font-medium text-base text-white bg-black cursor-pointer cant-select`;
  const airdropTokenBtn=`px-4 h-9 rounded-lg border font-medium text-base bg-white cursor-pointer cant-select`;
  
  const [walletConnected,setWalletConnected] = useState(false);

  const airdropContractAddress = "0x7d42973D25c3ECF48075c9E8881b4424148e38B4";
  const airdropContractABI = airdropAbi;



  const isWalletConnected = async () => {
    try {
        const { ethereum } = window;

        const accounts = await ethereum.request({method: 'eth_accounts'})
        console.log("accounts: ", accounts);

        if (accounts.length > 0) {
            const account = accounts[0];
            setWalletConnected(true);
            console.log("wallet is connected! " + account);
            getRamblingBalance();
            
        } else {
            setWalletConnected(false);
            console.log("make sure MetaMask is connected");
        }
    } catch (error) {
        console.log("error: ", error);
    }
  }

  const connectWallet = async () => {
    try {
      const {ethereum} = window;
      if (!ethereum) {
        console.log("please install MetaMask");
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      });

      setCurrentAccount(accounts[0]);
      console.log("currentAccount:",currentAccount);
      
    } catch (error) {
      console.log(error);
    }
    isWalletConnected();
  }

  const airdropToken = async ()=>{
    console.log("airdrop!");
    console.log("connected?",walletConnected);

    try {
      
      const {ethereum} = window;
      
      if (ethereum) {
        
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        
        const signer = provider.getSigner();
        
        const airdrop = new ethers.Contract(
          airdropContractAddress,
          airdropContractABI,
          signer
        );
        
        console.log("request airdrop...")
        const airdropTxn = await airdrop.airdrop();

        await airdropTxn.wait();
        getRamblingBalance();
        console.log("mined ", airdropTxn.hash);

        console.log("Airdroped 100$R to you");
      }
    } catch (error) {
      console.log(error);
    }
  }




  useEffect(()=>{
    connectWallet();
  },[]);

  return (
    <div className='TopHeader'>
        <div className='ToolBar'>
          <NavLink to="/" className={({isActive})=>['textNavBtn',isActive ? 'router-link-active' : null].join(' ')}>Home</NavLink>
          <NavLink to="/Donate" className={({isActive})=>['textNavBtn',isActive ? 'router-link-active' : null].join(' ')}>Donate</NavLink>
          <NavLink to="/Casino" className={({isActive})=>['textNavBtn',isActive ? 'router-link-active' : null].join(' ')}>Casino</NavLink>
          <NavLink to="/Art" className={({isActive})=>['textNavBtn',isActive ? 'router-link-active' : null].join(' ')}>Art</NavLink>
          <NavLink to="/About" className={({isActive})=>['textNavBtn',isActive ? 'router-link-active' : null].join(' ')}>About</NavLink>
        </div>
        
        <div className='WebsiteLogo'>
          Rambling
        </div>
        
        <div className='ConnectWallet'>
          <button className={airdropTokenBtn} disabled={walletConnected?false:true} onClick={airdropToken} >Airdrop 100$R</button>
          <button className={connectWalletBtn} onClick={connectWallet}>{currentAccount?`${currentAccount.slice(0,7)}...`:"Connect Wallet"}</button>
          {walletConnected && <div className='playerBalance'>Balance: {ramblingBalance} $R</div>}
        </div>
    </div>
  );
}

export default TopHeader;
