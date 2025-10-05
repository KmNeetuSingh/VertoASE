const Employee = require('../model/Employee');

exports.getAllEmployees = async (req, res) => {
  try {
    const { q } = req.query;
    const filter = {};
    if (q) {
      const regex = new RegExp(q, 'i');
      filter.$or = [{ name: regex }, { position: regex }, { department: regex }, { email: regex }];
    }
    const employees = await Employee.find(filter).sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: 'Employee not found' });
    res.json(emp);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') return res.status(400).json({ message: 'Invalid ID' });
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { name, email, position, department, salary, dateHired } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Name and email are required' });

    const newEmp = new Employee({ name, email, position, department, salary, dateHired });
    const saved = await newEmp.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) return res.status(409).json({ message: 'Email already exists' });
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Employee not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) return res.status(409).json({ message: 'Email already exists' });
    if (err.kind === 'ObjectId') return res.status(400).json({ message: 'Invalid ID' });
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const removed = await Employee.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') return res.status(400).json({ message: 'Invalid ID' });
    res.status(500).json({ message: 'Server error' });
  }
};
