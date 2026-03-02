import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { submitSignature, getEscrow } from '../api';
import PhoneFrame from './PhoneFrame';

const BuyerSignature = ({ escrowId, onReleased }) => {
  const [escrow, setEscrow] = useState(null);
  const sigRef = useRef();

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

  const handleSign = async () => {
    if (sigRef.current.isEmpty()) {
      alert('Please provide a signature');
      return;
    }
    const signatureData = sigRef.current.toDataURL();
    try {
      await submitSignature(escrowId, signatureData);
      alert('Signature submitted, escrow released!');
      fetchEscrow();
      setTimeout(() => {
        if (onReleased) onReleased();
      }, 500);
    } catch {
      alert('Error submitting signature');
    }
  };

  const clearSignature = () => sigRef.current.clear();

  if (!escrow) return <PhoneFrame statusBarText="LOADING..."><div>Loading...</div></PhoneFrame>;

  return (
    <PhoneFrame statusBarText="BUYER · CONFIRM RECEIPT">
      <div className="ph-steps">
        <div className="ph-step s-done"><div className="ph-step-dot done">✓</div><div className="ph-step-lbl">Create</div></div>
        <div className="ph-step s-done"><div className="ph-step-dot done">✓</div><div className="ph-step-lbl">Hold</div></div>
        <div className="ph-step s-done"><div className="ph-step-dot done">✓</div><div className="ph-step-lbl">Deliver</div></div>
        <div className="ph-step"><div className="ph-step-dot active">4</div><div className="ph-step-lbl active">Sign</div></div>
      </div>

      <div className="ph-card">
        <div className="ph-card-row"><span className="k">Status</span><span className="v"><span className="badge delivered">DELIVERED</span></span></div>
        <div className="ph-card-row"><span className="k">Item</span><span className="v">{escrow.item}</span></div>
        <div className="ph-card-row"><span className="k">To Release</span><span className="v green">KES {escrow.amount.toLocaleString()}</span></div>
      </div>

      <div className="ph-label">Sign below to confirm receipt</div>
      <div className="sig-area" style={{position:'relative'}}>
        <SignatureCanvas
          ref={sigRef}
          penColor="#000000"
          canvasProps={{ 
            style:{width:'100%', height:'120px', display:'block'},
            className: 'sigCanvas' 
          }}
        />
      </div>

      <div style={{display:'flex',gap:'8px',marginBottom:'14px'}}>
        <button onClick={clearSignature} className="ph-btn secondary" style={{padding:'6px 12px', fontSize:'10px'}}>CLEAR</button>
      </div>

      {escrow.status === 'DELIVERED' && (
        <button className="ph-btn primary" onClick={handleSign}>Submit Signature & Release →</button>
      )}
      {escrow.status === 'RELEASED' && (
        <div className="ph-card-row"><span className="badge released">RELEASED</span></div>
      )}
    </PhoneFrame>
  );
};

export default BuyerSignature;