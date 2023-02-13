function BetPanel({setStage,setMsg}){

    const plusBtn=`game-btn game-btn-plus`;
    const minusBtn=`game-btn game-btn-minus`;
    const betBtn=`game-btn game-btn-bet`;
    const submmitBtn=`game-btn game-btn-submmit`;

    function submmitBet(){
        setStage(1);
        setMsg(`Bet "50" on "+".`);
    }

    return(
        <div className='BetPanel'>
          <div className='PlusOrMinus'>
              <div className={plusBtn}>+</div>
              <div className={minusBtn}>-</div>
          </div>

          <div className='BetRow'>
              <div className={betBtn}>1 $R</div>
              <div className={betBtn}>5 $R</div>
              <div className={betBtn}>10 $R</div>
          </div>

          <div className='BetRow'>
              <div className={betBtn}>25 $R</div>
              <div className={betBtn}>50 $R</div>
              <div className={betBtn}>100 $R</div>
          </div>
          <div className='BetRow'>
              <div className={submmitBtn} onClick={submmitBet}>Double! or Nothing!</div>
          </div>

        </div>
    )
}

export default BetPanel;