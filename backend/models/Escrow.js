const mongoose = require('mongoose');

const EscrowSchema = new mongoose.Schema({
  buyer: { type: String, required: true },
  seller: { type: String, required: true },
  item: { type: String, required: true },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['PENDING', 'DELIVERED', 'RELEASED'],
    default: 'PENDING'
  },
  signature: { type: String }, // base64 image data
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Escrow', EscrowSchema);