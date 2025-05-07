const Customer = require('../models/Customer');

exports.createCustomer = async (req, res) => {
  try {
    const {
      companyName,
      contactPerson,
      email,
      phone,
      currentPlan,
      nextRenewalDate,
      vehiclesRegistered
    } = req.body;

    const address = {
      street: req.body['address[street]'],
      city: req.body['address[city]'],
      state: req.body['address[state]'],
      zip: req.body['address[zip]'],
      country: req.body['address[country]'],
    };

    const logo = req.file ? req.file.filename : null;

    const customer = new Customer({
      companyName,
      contactPerson,
      email,
      phone,
      address,
      currentPlan,
      nextRenewalDate,
      vehiclesRegistered,
      logo
    });

    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    console.error('Create Customer Error:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().populate('currentPlan');
    res.status(200).json(customers);
  } catch (error) {
    console.error('GET /api/customers failed:', error);  
    res.status(500).json({ error: error.message });
  }
};
