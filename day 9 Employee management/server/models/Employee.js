const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  department: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, default: 'Active' },
  joinDate: { type: String },
  location: { type: String },
  manager: { type: String },
  salary: { type: String },
  skills: { type: String },
  rating: { type: Number, default: 3 }
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
