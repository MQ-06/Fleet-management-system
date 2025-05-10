const Vehicle = require('../models/Vehicle');

exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate('customer').populate('fleet');
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createVehicle = async (req, res) => {
  try {
    const {
      customer, fleet, name, vin, licensePlate, brand, color, year,
      mileage, purchaseDate, cost, ownership, amountPaid,
      monthlyPayment, paymentDay, finalPaymentDate, notes, labels
    } = req.body;

    const photos = req.files?.photos?.map(f => `/uploads/vehicle-photos/${f.filename}`) || [];
    const documents = (req.files?.documents || []).map((file, index) => ({
      filename: `/uploads/vehicle-documents/${file.filename}`,
      label: labels && labels[index] ? labels[index] : 'Untitled'
    }));

    const vehicle = new Vehicle({
      customer, fleet, name, vin, licensePlate, brand, color, year,
      mileage, purchaseDate, cost, ownership,
      amountPaid, monthlyPayment, paymentDay, finalPaymentDate,
      notes, photos, documents
    });

    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    console.error('CREATE VEHICLE ERROR:', err);
    res.status(400).json({ error: err.message });
  }
};
