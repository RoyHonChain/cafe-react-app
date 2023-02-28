import './App.css';
import TopHeader from './pages/TopHeader';
import Donate from './pages/Donate';
import Home from './pages/Home';
import Casino from './pages/Casino';
import Art from './pages/Art';
import Blog from './pages/Blog';
import erc20Abi from './utils/RamblingERC20.json'

import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

const { ethers } = require("ethers");

function App() {

  //const [currentAccount, setCurrentAccount] = useState("");
  const [ramblingBalance, setRamblingBalance] = useState("");
  //const [walletConnected,setWalletConnected] = useState(false);

  const ramblingTokenAddress="0x2F2d82Da4c49806659e01fD03B091F0d265cb80e";
  const ramblingTokenABI = erc20Abi;

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
        console.log(accounts[0],ramblingBalance);
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
            ramblingBalance={ramblingBalance}
            getRamblingBalance={getRamblingBalance}
            setRamblingBalance={setRamblingBalance}
            />

            <Routes>
              <Route path="/" element={ <Home /> } />
              <Route path="/Donate" element={ <Donate /> } />
              <Route path="/Casino" element={ <Casino 
                setRamblingBalance={setRamblingBalance} 
                getRamblingBalance={getRamblingBalance}/> } />
              <Route path="/Art" element={ <Art /> } />
              <Route path="/Blog" element={ <Blog /> } />
            </Routes>
          </div>
        </HashRouter>
  );
}

export default App;
