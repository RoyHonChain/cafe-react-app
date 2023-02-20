import soon from '../images/soon.png';
function Home() {
  return (
    <div className='Home'>
        <h1>Sorry I'm homeless... lol</h1>
        <h3>All the Smart Contract is on Goerli.</h3>
        <h5>Please make sure you change to the right network.</h5>
        <img src={soon} />
    </div>
  );
}

export default Home;
