const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Employee name is required'], trim: true },
  email: { type: String, required: [true, 'Employee email is required'], trim: true, lowercase: true, unique: true },
  position: { type: String, trim: true, default: '' },
  department: { type: String, trim: true, default: '' },
  salary: { type: Number, default: 0, min: 0 },
  dateHired: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
