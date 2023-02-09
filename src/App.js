import './App.css';
import TopHeader from './pages/TopHeader';
import Donate from './pages/Donate';
import Home from './pages/Home';
import Casino from './pages/Casino';
import Art from './pages/Art';
import About from './pages/About';
import { useEffect, useState } from "react";
import { HashRouter, NavLink, Routes, Route } from "react-router-dom";


function App() {
  const [currentAccount, setCurrentAccount] = useState("");

  return (
    <HashRouter>
      <div className="App">
        <TopHeader
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
        />

        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/Donate" element={ <Donate currentAccount={currentAccount} setCurrentAccount={setCurrentAccount} /> } />
          <Route path="/Casino" element={ <Casino /> } />
          <Route path="/Art" element={ <Art /> } />
          <Route path="/About" element={ <About /> } />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
