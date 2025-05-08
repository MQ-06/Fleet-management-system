const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RepairCategorySchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  type: { type: String, enum: ['repair', 'maintenance'], required: true },
  categoryEn: { type: String, required: true },
  categoryEs: { type: String, required: true },
  supplierTypes: [{ type: Schema.Types.ObjectId, ref: 'Supplier' }]
});

module.exports = mongoose.model('RepairCategory', RepairCategorySchema);
