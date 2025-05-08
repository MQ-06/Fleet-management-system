const Fleet = require('../models/Fleet');
exports.getFleets = async (req, res) => {
  try {
    const { customer } = req.query;
    const filter = customer ? { customer } : {};
    const fleets = await Fleet.find(filter).populate('customer');
    res.json(fleets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.createFleet = async (req, res) => {
  try {
    console.log('BODY:', req.body); // 🔍 Add this
    const { customer, name, supervisor } = req.body;
    const fleet = new Fleet({ customer, name, supervisor });
    await fleet.save();
    res.status(201).json(fleet);
  } catch (err) {
    console.error('CREATE FLEET ERROR:', err); // 🔍 Print detailed error
    res.status(500).json({ error: err.message });
  }
};
