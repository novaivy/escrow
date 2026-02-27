import React, { useState } from 'react';
import { createEscrow } from '../api';
import PhoneFrame from './PhoneFrame';


const CreateEscrow = ({ onCreated }) => {
  const [form, setForm] = useState({ buyer: '', seller: '', item: '', amount: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createEscrow(form);
      alert(`Escrow created with ID: ${data._id}`);
      onCreated(data._id);
    } catch (err) {
      alert('Error creating escrow');
    }
  };

  return (
    <PhoneFrame statusBarText="BUYER · NEW TRANSACTION">
      <div className="ph-steps">
        <div className="ph-step s-done"><div className="ph-step-dot active">1</div><div className="ph-step-lbl active">Create</div></div>
        <div className="ph-step"><div className="ph-step-dot">2</div><div className="ph-step-lbl">Hold</div></div>
        <div className="ph-step"><div className="ph-step-dot">3</div><div className="ph-step-lbl">Deliver</div></div>
        <div className="ph-step"><div className="ph-step-dot">4</div><div className="ph-step-lbl">Sign</div></div>
      </div>

      <div className="ph-screen-title">Create Escrow</div>
      <div className="ph-screen-sub">Fill in transaction details to hold funds securely</div>

      <form onSubmit={handleSubmit}>
        <div className="ph-label">Your Name (Buyer)</div>
        <input className="ph-input" placeholder="e.g. Alice Kamau" value={form.buyer} onChange={e => setForm({...form, buyer: e.target.value})} required />

        <div className="ph-label">Seller Name</div>
        <input className="ph-input" placeholder="e.g. John Mwangi" value={form.seller} onChange={e => setForm({...form, seller: e.target.value})} required />

        <div className="ph-label">Item Description</div>
        <input className="ph-input" placeholder="e.g. MacBook Pro 14-inch" value={form.item} onChange={e => setForm({...form, item: e.target.value})} required />

        <div className="ph-label">Amount (KES)</div>
        <input className="ph-input" type="number" placeholder="0.00" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} required />

        <div className="ph-divider"></div>
        <button type="submit" className="ph-btn primary">Create Escrow Transaction →</button>
      </form>
    </PhoneFrame>
  );
};

export default CreateEscrow;