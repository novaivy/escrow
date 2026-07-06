import React, { useCallback, useState, useEffect } from 'react';
import { getEscrow } from '../api';
import PhoneFrame from './PhoneFrame';

const Released = ({ escrowId }) => {
  const [escrow, setEscrow] = useState(null);

   const fetchEscrow =useCallback(async () => {
    try {
      const { data } = await getEscrow(escrowId);
      setEscrow(data);
    } catch {
      alert('Failed to fetch escrow');
    }
  }, [escrowId]);
  
  useEffect(() => {
  if (escrowId) fetchEscrow();
}, [escrowId, fetchEscrow]);


  if (!escrow) return <PhoneFrame statusBarText="LOADING..."><div>Loading...</div></PhoneFrame>;

  return (
    <PhoneFrame statusBarText="ESCROW · COMPLETE">
      <div className="success-wrap">
        <div className="success-circle">✅</div>
        <div className="ph-screen-title" style={{fontSize:'20px',marginBottom:'6px'}}>Escrow Released!</div>
        <div className="ph-screen-sub" style={{marginBottom:'20px'}}>Signature captured · Transaction complete</div>
      </div>

      <div className="ph-card">
        <div className="ph-card-row"><span className="k">Escrow ID</span><span className="v" style={{fontFamily:'DM Mono, monospace', fontSize:'11px'}}>{escrow._id.slice(-8)}</span></div>
        <div className="ph-card-row"><span className="k">Final Status</span><span className="v"><span className="badge released">RELEASED</span></span></div>
        <div className="ph-card-row"><span className="k">Buyer</span><span className="v">{escrow.buyer}</span></div>
        <div className="ph-card-row"><span className="k">Seller</span><span className="v">{escrow.seller}</span></div>
        <div className="ph-card-row"><span className="k">Amount</span><span className="v green">KES {escrow.amount.toLocaleString()}</span></div>
        <div className="ph-card-row"><span className="k">Signed at</span><span className="v" style={{fontSize:'11.5px'}}>{new Date(escrow.updatedAt).toLocaleString()}</span></div>
      </div>

      <div style={{background:'rgba(45,106,79,.07)', border:'1px solid rgba(45,106,79,.2)', borderRadius:'6px', padding:'12px', marginBottom:'16px', fontSize:'12px', color:'#2d6a4f', lineHeight:'1.5'}}>
        🔏 &nbsp;Digital signature stored as proof of delivery. This record is permanent.
      </div>

      <button className="ph-btn secondary" onClick={() => window.location.href='/'}>View All Transactions</button>
    </PhoneFrame>
  );
};

export default Released;