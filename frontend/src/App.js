import React, { useState } from 'react';
import './App.css';
import CreateEscrow from './components/CreateEscrow';
import PendingEscrow from './components/PendingEscrow';
import MarkDelivered from './components/MarkDelivered';
import BuyerSignature from './components/BuyerSignature';
import Released from './components/Released';
import AllEscrows from './components/AllEscrows';

function App() {
  const [currentScreen, setCurrentScreen] = useState('create');
  const [escrowId, setEscrowId] = useState('');
  const [escrowStatus, setEscrowStatus] = useState('');

  const handleCreated = (id) => {
    setEscrowId(id);
    setEscrowStatus('PENDING');
    setCurrentScreen('pending');
  };

  const canAccess = (screen) => {
    if (screen === 'create') return true;
    if (screen === 'list') return true;
    if (screen === 'pending') return !!escrowId;
    if (screen === 'deliver') return escrowStatus === 'PENDING' || escrowStatus === 'DELIVERED';
    if (screen === 'sign') return escrowStatus === 'DELIVERED';
    if (screen === 'released') return escrowStatus === 'RELEASED';
    return false;
  };

  const handleScreenChange = (screen) => {
    if (canAccess(screen)) {
      setCurrentScreen(screen);
    } else {
      alert('Complete the previous step first!');
    }
  };

  return (
    <div className="page-wrap">
      <div className="tab-nav">
        <button className={`tab-btn ${currentScreen === 'create' ? 'active' : ''} ${!canAccess('create') ? 'locked' : ''}`} onClick={() => handleScreenChange('create')}>1 · Create Escrow</button>
        <button className={`tab-btn ${currentScreen === 'pending' ? 'active' : ''} ${!canAccess('pending') ? 'locked' : ''}`} onClick={() => handleScreenChange('pending')}>2 · Escrow Pending</button>
        <button className={`tab-btn ${currentScreen === 'deliver' ? 'active' : ''} ${!canAccess('deliver') ? 'locked' : ''}`} onClick={() => handleScreenChange('deliver')}>3 · Mark Delivered</button>
        <button className={`tab-btn ${currentScreen === 'sign' ? 'active' : ''} ${!canAccess('sign') ? 'locked' : ''}`} onClick={() => handleScreenChange('sign')}>4 · Buyer Signs</button>
        <button className={`tab-btn ${currentScreen === 'released' ? 'active' : ''} ${!canAccess('released') ? 'locked' : ''}`} onClick={() => handleScreenChange('released')}>5 · Released</button>
        <button className={`tab-btn ${currentScreen === 'list' ? 'active' : ''}`} onClick={() => handleScreenChange('list')}>6 · All Escrows</button>
      </div>

      <div className="screen active">
        {currentScreen === 'create' && <CreateEscrow onCreated={handleCreated} />}
        {currentScreen === 'pending' && escrowId ? <PendingEscrow escrowId={escrowId} /> : currentScreen === 'pending' && <div>Please create an escrow first</div>}
        {currentScreen === 'deliver' && escrowId ? (
          <MarkDelivered
            escrowId={escrowId}
            goBack={() => setCurrentScreen('pending')}
            onDelivered={() => { setEscrowStatus('DELIVERED'); setCurrentScreen('sign'); }}
          />
        ) : currentScreen === 'deliver' && <div>Please create an escrow first</div>}
        {currentScreen === 'sign' && escrowId ? (
          <BuyerSignature
            escrowId={escrowId}
            onReleased={() => { setEscrowStatus('RELEASED'); setCurrentScreen('released'); }}
          />
        ) : currentScreen === 'sign' && <div>Please create an escrow first</div>}
        {currentScreen === 'released' && escrowId ? <Released escrowId={escrowId} /> : currentScreen === 'released' && <div>Please create an escrow first</div>}
        {currentScreen === 'list' && <AllEscrows />}
      </div>
    </div>
  );
}

export default App;