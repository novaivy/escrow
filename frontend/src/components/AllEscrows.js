import React, { useState, useEffect } from 'react';
import { getAllEscrows } from '../api';
import PhoneFrame from './PhoneFrame';

const AllEscrows = () => {
  const [escrows, setEscrows] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchEscrows();
  }, []);

  const fetchEscrows = async (search) => {
    try {
      const { data } = await getAllEscrows({ search }); // we need to adjust api to accept query
      setEscrows(data);
    } catch {
      alert('Failed to fetch escrows');
    }
  };

  const handleSearch = (e) => {
    setFilter(e.target.value);
    fetchEscrows(e.target.value);
  };

  return (
    <PhoneFrame statusBarText="ALL ESCROWS">
      <div className="ph-screen-title">Transactions</div>
      <div className="ph-screen-sub" style={{marginBottom:'16px'}}>All escrow records</div>

      <input className="ph-input ghost" placeholder="🔍  Search by ID, buyer, item…" value={filter} onChange={handleSearch} style={{marginBottom:'16px'}} />

      {escrows.map(escrow => (
        <div key={escrow._id} className="tx-row">
          <div className="tx-icon">{escrow.item?.charAt(0) || '📦'}</div>
          <div className="tx-info">
            <div className="tx-name">{escrow.item || 'Item'}</div>
            <div className="tx-meta">{escrow._id.slice(-8)} · {escrow.buyer} → {escrow.seller}</div>
          </div>
          <div className="tx-right">
            <div className="tx-amount" style={{color: escrow.status==='RELEASED'?'#2d6a4f':escrow.status==='DELIVERED'?'#c77b3a':'#2c4a7c'}}>KES {escrow.amount.toLocaleString()}</div>
            <div style={{marginTop:'3px'}}><span className={`badge ${escrow.status.toLowerCase()}`}>{escrow.status}</span></div>
          </div>
        </div>
      ))}
    </PhoneFrame>
  );
};

export default AllEscrows;