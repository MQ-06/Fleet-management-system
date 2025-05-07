const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('customer');
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, type, customer, active } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      type, 
      customer: customer || undefined,
      active,
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(400).json({ error: err.message });
  }
};

