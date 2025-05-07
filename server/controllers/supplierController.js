const Supplier = require('../models/Supplier');

exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().populate('customer');
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSupplier = async (req, res) => {
  try {
    const {
      customer,
      name,
      contactPerson,
      phone,
      email,
      type,
      address
    } = req.body;

    // Safe JSON parsing fallback
    const parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;

    const supplier = new Supplier({
      customer,
      name,
      contactPerson,
      phone,
      email,
      type,
      address: parsedAddress,
      logo: req.file ? `/uploads/supplier-logos/${req.file.filename}` : ''
    });

    await supplier.save();
    res.status(201).json(supplier);
  } catch (error) {
    console.error('CREATE SUPPLIER ERROR:', error); // add this for better debugging
    res.status(500).json({ error: error.message });
  }
};

