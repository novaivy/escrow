const Escrow = require('../models/Escrow');

// @desc    Create a new escrow
// @route   POST /api/escrow
exports.createEscrow = async (req, res) => {
  try {
    const { buyer, seller, item, amount } = req.body;
    if (!buyer || !seller || !item || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const escrow = await Escrow.create({ buyer, seller, item, amount });
    res.status(201).json(escrow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Mark escrow as delivered (seller action)
// @route   PUT /api/escrow/:id/deliver
exports.markDelivered = async (req, res) => {
  try {
    const escrow = await Escrow.findById(req.params.id);
    if (!escrow) return res.status(404).json({ error: 'Escrow not found' });
    if (escrow.status !== 'PENDING') {
      return res.status(400).json({ error: 'Escrow cannot be marked delivered' });
    }
    escrow.status = 'DELIVERED';
    escrow.updatedAt = Date.now();
    await escrow.save();
    res.json(escrow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Add buyer signature and release escrow
// @route   PUT /api/escrow/:id/sign
exports.addSignature = async (req, res) => {
  try {
    const { signature } = req.body; // base64 image string
    if (!signature) return res.status(400).json({ error: 'Signature required' });

    const escrow = await Escrow.findById(req.params.id);
    if (!escrow) return res.status(404).json({ error: 'Escrow not found' });
    if (escrow.status !== 'DELIVERED') {
      return res.status(400).json({ error: 'Escrow is not in delivered state' });
    }

    escrow.signature = signature;
    escrow.status = 'RELEASED';
    escrow.updatedAt = Date.now();
    await escrow.save();
    res.json(escrow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get escrow by ID
// @route   GET /api/escrow/:id
exports.getEscrow = async (req, res) => {
  try {
    const escrow = await Escrow.findById(req.params.id);
    if (!escrow) return res.status(404).json({ error: 'Escrow not found' });
    res.json(escrow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get all escrows (with optional filters)
// @route   GET /api/escrow
exports.getAllEscrows = async (req, res) => {
  try {
    const { status, buyer, seller } = req.query;
    let filter = {};
    if (status) filter.status = status;
    if (buyer) filter.buyer = { $regex: buyer, $options: 'i' };
    if (seller) filter.seller = { $regex: seller, $options: 'i' };
    const escrows = await Escrow.find(filter).sort({ createdAt: -1 });
    res.json(escrows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};