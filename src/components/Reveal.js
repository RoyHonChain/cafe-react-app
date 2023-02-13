function Reveal({stage,setStage,setMsg}){
    
    
    return(
        <div className="Reveal">
            {
                stage==1 && (
                    <div className="WaitBlock">
                        <div>&#127922; Please Wait 1 Block For A Fair Random Seed ... &#127922;</div>
                        <div>Waiting block:22221</div>
                        <div>Current block:22222</div>
                    </div>
                )
            }

            {
                stage==2 && (
                    <div className="FlipCoin">
                        <div>Click the Coin to flip!</div>
                    </div>
                )
            }

            {
                stage==3 && (
                    <div className="Result">
                        <button>Play Again</button>
                    </div>
                )
            }
            
            
        </div>
    )
}

export default Reveal;