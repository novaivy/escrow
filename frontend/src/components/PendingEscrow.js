import React, { useState, useEffect } from 'react';
import { getEscrow } from '../api';
import PhoneFrame from './PhoneFrame';

const PendingEscrow = ({ escrowId }) => {
  const [escrow, setEscrow] = useState(null);

  useEffect(() => {
  if (escrowId) fetchEscrow();
}, [escrowId, fetchEscrow]);

  const fetchEscrow = async () => {
    try {
      const { data } = await getEscrow(escrowId);
      setEscrow(data);
    } catch {
      alert('Escrow not found');
    }
  };

  if (!escrow) return <PhoneFrame statusBarText="LOADING..."><div>Loading...</div></PhoneFrame>;

  return (
    <PhoneFrame statusBarText="BUYER · ESCROW STATUS">
      <div className="ph-screen-title">Payment Held</div>
      <div className="ph-screen-sub">Awaiting seller delivery confirmation</div>

      <div className="ph-card">
        <div className="ph-card-row"><span className="k">Escrow ID</span><span className="v" style={{fontFamily:'DM Mono, monospace', fontSize:'11px'}}>{escrow._id.slice(-8)}</span></div>
        <div className="ph-card-row"><span className="k">Status</span><span className="v"><span className="badge pending">PENDING</span></span></div>
        <div className="ph-card-row"><span className="k">Buyer</span><span className="v">{escrow.buyer}</span></div>
        <div className="ph-card-row"><span className="k">Seller</span><span className="v">{escrow.seller}</span></div>
        <div className="ph-card-row"><span className="k">Item</span><span className="v">{escrow.item}</span></div>
        <div className="ph-card-row"><span className="k">Amount</span><span className="v green">KES {escrow.amount.toLocaleString()}</span></div>
        <div className="ph-card-row"><span className="k">Created</span><span className="v" style={{fontSize:'11.5px'}}>{new Date(escrow.createdAt).toLocaleString()}</span></div>
      </div>

      <div style={{background:'rgba(44,74,124,.07)', border:'1px solid rgba(44,74,124,.2)', borderRadius:'6px', padding:'12px', marginBottom:'14px', fontSize:'12px', color:'#2c4a7c', lineHeight:'1.5'}}>
        ℹ️ &nbsp;Funds are <strong>simulated as held</strong>. The seller will mark this as delivered once the item is shipped.
      </div>

      <button className="ph-btn secondary" onClick={fetchEscrow} style={{textAlign:'center', fontSize:'12px', padding:'10px'}}>Refresh Status</button>
    </PhoneFrame>
  );
};

export default PendingEscrow;