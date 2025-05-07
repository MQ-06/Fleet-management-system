const mongoose = require('mongoose');

const TaxSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameSpanish: { type: String },
  type: { type: String, enum: ['fixed', 'percentage'], required: true },
  amount: { type: Number, required: true },
  country: { type: String, required: true },
  states: [String],
  cities: [String]
});

module.exports = mongoose.model('Tax', TaxSchema);
