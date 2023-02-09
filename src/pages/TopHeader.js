import { HashRouter, NavLink, Routes, Route } from "react-router-dom";

function TopHeader({currentAccount,setCurrentAccount}) {
  const btnClassName=`px-4 h-9 rounded-lg border font-medium text-base-2 text-white bg-black cursor-pointer`;
  

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
  }

  return (
    <div className='TopHeader'>
        <div className='ToolBar'>
          <NavLink to="/Home" className="textNavBtn">Home</NavLink>
          <NavLink to="/Donate" className="textNavBtn">Donate</NavLink>
          <NavLink to="/Casino" className="textNavBtn">Casino</NavLink>
          <NavLink to="/Art" className="textNavBtn">Art</NavLink>
          <NavLink to="/About" className="textNavBtn">About</NavLink>
        </div>
        
        <div className='WebsiteLogo'>
          Rambling
        </div>
        
        <div className='ConnectWallet'>
          <button className={btnClassName} onClick={connectWallet}>{currentAccount?`${currentAccount.slice(0,7)}...`:"Connect Wallet"}</button>
        </div>
    </div>
  );
}

export default TopHeader;
