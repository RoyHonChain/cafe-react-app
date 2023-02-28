import abi from '../utils/BuyMeACoffee.json';
import { useRef, useState } from "react";
import { useContractRead } from 'wagmi';

const { ethers } = require("ethers");


function Donate() {
    
    const contractAddress = "0xc3A08d77B529eCd2B5a8c9254B7b7adE92375efA";
    const contractABI = abi.abi;

    const [memos, setMemos] = useState([]);

    const name = useRef("");
    const message = useRef("");
    
    const onNameChange = (event) => {name.current=event.target.value;}
    const onMessageChange = (event) => {message.current=event.target.value;}

    
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
              name.current ? name.current : "anon",
              message.current ? message.current : "Enjoy your coffee!",
              {value: ethers.utils.parseEther(amount)}
            );
    
            await coffeeTxn.wait();
    
            console.log("mined ", coffeeTxn.hash);
    
            console.log("coffee purchased!");
            getMemos();
            // Clear the form fields.
            name.current="";
            message.current="";
          }
        } catch (error) {
          console.log(error);
        }
    };
    

    const { data, refetch:getMemos } = useContractRead({
      address: contractAddress,
      abi: contractABI,
      functionName: 'getMemos',
      onSuccess(data) {
        console.log('Success', data)
        let tempData = [...data];
        setMemos(tempData.reverse());
      },
      onError(error) {
        console.log('Error', error)
      },
    })
    
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

        <div className='ReceivedMemos'>
          <div style={{textAlign: "center",fontSize: "18px"}}>Memo Received(Newest 16):</div>
            <div className="Memos">
                {(memos.map((memo,idx)=>{
                  if(idx<=15)
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
  