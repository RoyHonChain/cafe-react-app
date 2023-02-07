import './App.css';
import Donate from './Donate';
import TopHeader from './TopHeader';
import { useEffect, useState } from "react";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");

  return (
    <div className="App">
      <TopHeader
      currentAccount={currentAccount}
      setCurrentAccount={setCurrentAccount}
      />
      <Donate
      currentAccount={currentAccount}
      setCurrentAccount={setCurrentAccount}
      />
    </div>
  );
}

export default App;
