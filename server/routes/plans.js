const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan');

router.get('/', async (req, res) => {
  const plans = await Plan.find().populate('applicableTaxes', 'name'); // only fetch `name`
  res.json(plans);
});


router.post('/', async (req, res) => {
  const plan = new Plan(req.body);
  await plan.save();
  res.json(plan);
});

module.exports = router;
