import abi from './utils/BuyMeACoffee.json';
import { useEffect, useState } from "react";
const { ethers } = require("ethers");


function Donate({currentAccount,setCurrentAccount}) {
    
    const contractAddress = "0xc3A08d77B529eCd2B5a8c9254B7b7adE92375efA";
    const contractABI = abi.abi;

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [memos, setMemos] = useState([]);

    const onNameChange = (event) => {setName(event.target.value);}
    const onMessageChange = (event) => {setMessage(event.target.value);}

    // Wallet connection logic
    const isWalletConnected = async () => {
        try {
            const { ethereum } = window;

            const accounts = await ethereum.request({method: 'eth_accounts'})
            console.log("accounts: ", accounts);

            if (accounts.length > 0) {
                const account = accounts[0];
                console.log("wallet is connected! " + account);
            } else {
                console.log("make sure MetaMask is connected");
            }
        } catch (error) {
            console.log("error: ", error);
        }
    }

    const buyCoffee = async (amount) => {
        try {
          const {ethereum} = window;
    
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum, "any");
            const signer = provider.getSigner();
            const buyMeACoffee = new ethers.Contract(
              contractAddress,
              contractABI,
              signer
            );
    
            console.log("buying coffee..")
            const coffeeTxn = await buyMeACoffee.buyCoffee(
              name ? name : "anon",
              message ? message : "Enjoy your coffee!",
              {value: ethers.utils.parseEther(amount)}
            );
    
            await coffeeTxn.wait();
    
            console.log("mined ", coffeeTxn.hash);
    
            console.log("coffee purchased!");
            // Clear the form fields.
            setName("");
            setMessage("");
          }
        } catch (error) {
          console.log(error);
        }
    };
    
    
    // Function to fetch all memos stored on-chain.
    const getMemos = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const buyMeACoffee = new ethers.Contract(
                    contractAddress,
                    contractABI,
                    signer
                );
                console.log("fetching memos from the blockchain..");
                const memos = await buyMeACoffee.getMemos();
                console.log("fetched!");
                setMemos(memos);
            } else {
                console.log("Metamask is not connected");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        let buyMeACoffee;
        isWalletConnected();
        getMemos();
    
        // Create an event handler function for when someone sends
        // us a new memo.
        const onNewMemo = (from, timestamp, name, message,amount) => {
          console.log("Memo received: ", from, timestamp, name, message,amount);
          setMemos((prevState) => [
            {
              address: from,
              timestamp: new Date(timestamp * 1000),
              message,
              name,
              amount
            },
            ...prevState
          ]);
        };
    
        const {ethereum} = window;
    
        // Listen for new memo events.
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum, "any");
          const signer = provider.getSigner();
          buyMeACoffee = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
    
          buyMeACoffee.on("NewMemo", onNewMemo);
        }
    
        return () => {
          if (buyMeACoffee) {
            buyMeACoffee.off("NewMemo", onNewMemo);
          }
        }
      }, [currentAccount]);
    


    return (
    <div className='Donate'>
        
        <div>
            <div className="banner-text">Buy Roy a coffee</div>

            <div className="TipForm">
                <div>
                    <label>Name</label>
                    <br/>
                    <input id="name" type="text" placeholder="anon" onChange={onNameChange}/>
                </div>
                <div>
                    <label>Send Roy a message:</label>
                    <br/>
                    <textarea rows="5" placeholder="Enjoy your coffee!" id="message" onChange={onMessageChange} required></textarea>
                </div>
                <div className="CoffeeBtnList">
                    <button type="button" className="CoffeeBtn" onClick={()=>buyCoffee("0.001")} > &#9749; 0.001 Ξ</button>
                    <button type="button" className="CoffeeBtn" onClick={()=>buyCoffee("0.002")}> &#9749; &#9749; 0.002 Ξ</button>
                    <button type="button" className="CoffeeBtn" onClick={()=>buyCoffee("0.003")}> &#9749; &#9749; &#9749; 0.003 Ξ</button>
                </div>
            </div>
            
        </div>

        <div>
            {currentAccount && (<div className={`text-center text-base-2 `}>Memo Received:</div>)}
            <div className="Memos">
                {currentAccount && (memos.map((memo,idx)=>{
                    return (
                        <div key={idx} className="Memo">
                        <p style={{"fontWeight":"bold"}}>{memo.message}</p>
                        <p>From: {memo.name}</p>
                        <p>Tip: {ethers.utils.formatEther(memo.amount)} Ξ</p>
                        <p>Timestamp: {memo.timestamp.toString()}</p>
                        </div>
                    )
                }))}
                
            </div>
            
        </div>

        
    </div>
    );
}

export default Donate;
  