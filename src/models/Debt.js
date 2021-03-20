
const mongoose = require('mongoose');

// The document schema should have 3 things
// A "firstName" that is a string
// A "lastName" that is a string
// An "age" that is a number
// All of these should be required.
// Create your schema here

const DebtModelSchema = new mongoose.Schema({
  creditor: { type: String, required: true },
  debtor: { type: String, required: true },
  amount: { type: Number, min: 1, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  note: { type: String },
  isRequested: { type: Boolean, required: true },
  isPaid: { type: Boolean , required: true },
  status: { type: String, required: true },
}) 



// You must export your model through module.exports
// The collection name should be 'student'
module.exports = mongoose.model('debt', DebtModelSchema);