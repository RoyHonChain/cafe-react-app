function TopHeader({currentAccount,setCurrentAccount}) {
  const btnClassName=`px-4 h-9 rounded-lg border font-medium text-base text-white bg-black cursor-pointer`;
  const textbtnClassName=`font-medium text-base-2 cursor-pointer`;

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
          <a className={textbtnClassName} >Donate</a>
          <a className={textbtnClassName}>Casino</a>
          <a className={textbtnClassName}>Art</a>
          <a className={textbtnClassName}>About</a>
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
