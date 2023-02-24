import './App.css';
import TopHeader from './pages/TopHeader';
import Donate from './pages/Donate';
import Home from './pages/Home';
import Casino from './pages/Casino';
import Art from './pages/Art';
import Blog from './pages/Blog';
import erc20Abi from './utils/RamblingERC20.json'

import { useEffect, useState } from "react";
import { HashRouter, NavLink, Routes, Route } from "react-router-dom";

const { ethers } = require("ethers");

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [ramblingBalance, setRamblingBalance] = useState("");
  const [walletConnected,setWalletConnected] = useState(false);

  const ramblingTokenAddress="0x2F2d82Da4c49806659e01fD03B091F0d265cb80e";
  const ramblingTokenABI = erc20Abi;

  const isWalletConnected = async () => {
    try {
        const { ethereum } = window;

        const accounts = await ethereum.request({method: 'eth_accounts'})
        console.log("accounts: ", accounts);

        if (accounts.length > 0) {
            const account = accounts[0];
            setWalletConnected(true);
            setCurrentAccount(accounts[0]);
            console.log("wallet is connected! " + account);
            setRamblingBalance(ethers.utils.formatEther(await getRamblingBalance()));
            return true;
        } else {
            setWalletConnected(false);
            setCurrentAccount("");
            console.log("make sure MetaMask is connected");
            return false;
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

  const getRamblingBalance = async ()=>{
    
    try {
      
      const {ethereum} = window;
      
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const rambling = new ethers.Contract(
          ramblingTokenAddress,
          ramblingTokenABI,
          signer
        );
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts'
        });
        const ramblingBalance = await rambling.balanceOf(accounts[0]);
        
        return ramblingBalance;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <HashRouter>
      <div className="App">
        <TopHeader
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
        ramblingBalance={ramblingBalance}
        getRamblingBalance={getRamblingBalance}
        setRamblingBalance={setRamblingBalance}
        isWalletConnected={isWalletConnected}
        connectWallet={connectWallet}
        walletConnected={walletConnected}
        setWalletConnected={setWalletConnected}
        />

        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/Donate" element={ <Donate currentAccount={currentAccount} setCurrentAccount={setCurrentAccount} /> } />
          <Route path="/Casino" element={ <Casino walletConnected={walletConnected} isWalletConnected={isWalletConnected} currentAccount={currentAccount} setRamblingBalance={setRamblingBalance} getRamblingBalance={getRamblingBalance}/> } />
          <Route path="/Art" element={ <Art /> } />
          <Route path="/Blog" element={ <Blog /> } />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
