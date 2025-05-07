const Subscriber = require('../models/Subscriber');

exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
      .populate('customer')
      .populate('initialPlan')
      .populate('currentPlan');
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addSubscriber = async (req, res) => {
  try {
    const newSub = new Subscriber(req.body);
    await newSub.save();
    res.status(201).json(newSub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
