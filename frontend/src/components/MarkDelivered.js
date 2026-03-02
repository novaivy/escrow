import React, { useState, useEffect } from 'react';
import { markDelivered, getEscrow } from '../api';
import PhoneFrame from './PhoneFrame';

const MarkDelivered = ({ escrowId, onDelivered, goBack }) => {
  const [escrow, setEscrow] = useState(null);

  useEffect(() => {
    if (escrowId) fetchEscrow();
  }, [escrowId]);

  const fetchEscrow = async () => {
    try {
      const { data } = await getEscrow(escrowId);
      setEscrow(data);
    } catch {
      alert('Failed to load escrow');
    }
  };

  const handleDeliver = async () => {
    try {
      await markDelivered(escrowId);
      alert('Marked as delivered');
      fetchEscrow();
      if (onDelivered) onDelivered();
    } catch {
      alert('Error marking as delivered');
    }
  };

  if (!escrow) return <PhoneFrame statusBarText="LOADING..."><div>Loading...</div></PhoneFrame>;

  return (
    <PhoneFrame statusBarText="SELLER · MARK DELIVERY">
      <div className="ph-screen-title">Mark as Delivered</div>
      <div className="ph-screen-sub">Confirm you have sent the item to the buyer</div>
      <div className="ph-card">
        <div className="ph-card-row"><span className="k">Escrow ID</span><span className="v">{escrow._id.slice(-8)}</span></div>
        <div className="ph-card-row"><span className="k">Status</span><span className="v"><span className={`badge ${escrow.status.toLowerCase()}`}>{escrow.status}</span></span></div>
        <div className="ph-card-row"><span className="k">Buyer</span><span className="v">{escrow.buyer}</span></div>
        <div className="ph-card-row"><span className="k">Item</span><span className="v">{escrow.item}</span></div>
        <div className="ph-card-row"><span className="k">Held Amount</span><span className="v green">KES {escrow.amount.toLocaleString()}</span></div>
      </div>

      {escrow.status === 'PENDING' && (
        <>
          <div style={{background:'rgba(199,123,58,.08)', border:'1px solid rgba(199,123,58,.25)', borderRadius:'6px', padding:'12px', marginBottom:'16px', fontSize:'12px', color:'#c77b3a', lineHeight:'1.5'}}>
            ⚠️ Only mark delivered once the buyer has physically received the item. This cannot be undone.
          </div>
          <button className="ph-btn orange" onClick={handleDeliver}>✓ Confirm Delivery</button>
        </>
      )}
      {escrow.status === 'DELIVERED' && <p>Already marked as delivered. Waiting for buyer confirmation.</p>}
      {escrow.status === 'RELEASED' && <p>Escrow already released.</p>}
      <button className="ph-btn secondary" onClick={goBack}>← Back</button>
    </PhoneFrame>
  );
};

export default MarkDelivered;