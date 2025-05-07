const express = require('express');
const router = express.Router();
const Tax = require('../models/Tax');

// Get all
router.get('/', async (req, res) => {
  const taxes = await Tax.find();
  res.json(taxes);
});

// Create
router.post('/', async (req, res) => {
  const tax = new Tax(req.body);
  await tax.save();
  res.json(tax);
});

// Update
router.put('/:id', async (req, res) => {
  const tax = await Tax.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(tax);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Tax.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
