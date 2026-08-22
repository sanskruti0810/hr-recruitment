const Department = require('../models/Department');

const getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    return res.json(departments);
  } catch (error) {
    next(error);
  }
};

const createDepartment = async (req, res, next) => {
  try {
    const { name, description, status } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Department name is required' });
    }

    const existing = await Department.findOne({ name: name.trim() });
    if (existing) {
      return res.status(409).json({ message: 'Department already exists' });
    }

    const department = await Department.create({
      name: name.trim(),
      description: description || '',
      status: status || 'Active',
    });

    return res.status(201).json(department);
  } catch (error) {
    next(error);
  }
};

const updateDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;

    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    department.name = name?.trim() || department.name;
    department.description = description ?? department.description;
    department.status = status || department.status;
    await department.save();

    return res.json(department);
  } catch (error) {
    next(error);
  }
};

const deleteDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    await department.deleteOne();
    return res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
