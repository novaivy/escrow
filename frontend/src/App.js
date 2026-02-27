import React, { useState } from 'react';
import './App.css';
import CreateEscrow from './components/CreateEscrow';
import PendingEscrow from './components/PendingEscrow';
import MarkDelivered from './components/MarkDelivered';
import BuyerSignature from './components/BuyerSignature';   // <-- import BuyerSignature
import Released from './components/Released';
import AllEscrows from './components/AllEscrows';

function App() {
  const [currentScreen, setCurrentScreen] = useState('create');
  const [escrowId, setEscrowId] = useState('');

  const handleCreated = (id) => {
    setEscrowId(id);
    setCurrentScreen('pending');
  };

  return (
    <div className="page-wrap">
      {/* Optional masthead and flow bar – you can add them if missing */}

      <div className="tab-nav">
        <button className={`tab-btn ${currentScreen === 'create' ? 'active' : ''}`} onClick={() => setCurrentScreen('create')}>1 · Create Escrow</button>
        <button className={`tab-btn ${currentScreen === 'pending' ? 'active' : ''}`} onClick={() => setCurrentScreen('pending')}>2 · Escrow Pending</button>
        <button className={`tab-btn ${currentScreen === 'deliver' ? 'active' : ''}`} onClick={() => setCurrentScreen('deliver')}>3 · Mark Delivered</button>
        <button className={`tab-btn ${currentScreen === 'sign' ? 'active' : ''}`} onClick={() => setCurrentScreen('sign')}>4 · Buyer Signs</button>
        <button className={`tab-btn ${currentScreen === 'released' ? 'active' : ''}`} onClick={() => setCurrentScreen('released')}>5 · Released</button>
        <button className={`tab-btn ${currentScreen === 'list' ? 'active' : ''}`} onClick={() => setCurrentScreen('list')}>6 · All Escrows</button>
      </div>

      <div className="screen active">
        {currentScreen === 'create' && <CreateEscrow onCreated={handleCreated} />}
        {currentScreen === 'pending' && escrowId ? <PendingEscrow escrowId={escrowId} /> : <div>Please create an escrow first</div>}
        {currentScreen === 'deliver' && escrowId ? <MarkDelivered escrowId={escrowId} /> : <div>Please create an escrow first</div>}
        {currentScreen === 'sign' && escrowId ? <BuyerSignature escrowId={escrowId} /> : <div>Please create an escrow first</div>}
        {currentScreen === 'released' && escrowId ? <Released escrowId={escrowId} /> : <div>Please create an escrow first</div>}
        {currentScreen === 'list' && <AllEscrows />}
      </div>
    </div>
  );
}

export default App;