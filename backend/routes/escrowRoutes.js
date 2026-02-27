const express = require('express');
const router = express.Router();
const {
  createEscrow,
  markDelivered,
  addSignature,
  getEscrow,
  getAllEscrows
} = require('../controllers/escrowController');

router.post('/', createEscrow);
router.put('/:id/deliver', markDelivered);
router.put('/:id/sign', addSignature);
router.get('/', getAllEscrows);
router.get('/:id', getEscrow);

module.exports = router;