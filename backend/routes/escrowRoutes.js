const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const {
  createEscrow,
  markDelivered,
  addSignature,
  getEscrow,
  getAllEscrows
} = require('../controllers/escrowController');

router.post('/', auth, createEscrow);
router.put('/:id/deliver', auth, markDelivered);
router.put('/:id/sign', auth, addSignature);
router.get('/', auth, getAllEscrows);
router.get('/:id', auth, getEscrow);

module.exports = router;