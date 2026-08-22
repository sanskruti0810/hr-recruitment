const Job = require('../models/Job');
const Department = require('../models/Department');

const getJobs = async (req, res, next) => {
  try {
    const { search, department, status } = req.query;
    const query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (department) {
      query.department = department;
    }
    if (status) {
      query.status = status;
    }

    const jobs = await Job.find(query)
      .populate('department', 'name status')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    return res.json(jobs);
  } catch (error) {
    next(error);
  }
};

const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('department', 'name description')
      .populate('createdBy', 'name email');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    return res.json(job);
  } catch (error) {
    next(error);
  }
};

const createJob = async (req, res, next) => {
  try {
    const {
      title,
      department,
      description,
      skills,
      experience,
      employmentType,
      location,
      salaryRange,
      openPositions,
      applicationDeadline,
      status,
    } = req.body;

    if (!title || !department) {
      return res.status(400).json({ message: 'Job title and department are required' });
    }

    const departmentExists = await Department.findById(department);
    if (!departmentExists) {
      return res.status(404).json({ message: 'Department not found' });
    }

    const job = await Job.create({
      title: title.trim(),
      department,
      description: description || '',
      skills: Array.isArray(skills) ? skills : (skills || '').split(',').map((skill) => skill.trim()).filter(Boolean),
      experience: Number(experience) || 0,
      employmentType: employmentType || 'Full Time',
      location: location || '',
      salaryRange: {
        min: Number(salaryRange?.min) || 0,
        max: Number(salaryRange?.max) || 0,
      },
      openPositions: Number(openPositions) || 1,
      applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : undefined,
      status: status || 'Open',
      createdBy: req.user.id,
    });

    return res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const updateFields = [
      'title',
      'department',
      'description',
      'experience',
      'employmentType',
      'location',
      'status',
      'openPositions',
      'applicationDeadline',
    ];

    updateFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        job[field] = req.body[field];
      }
    });

    if (req.body.skills) {
      job.skills = Array.isArray(req.body.skills)
        ? req.body.skills
        : req.body.skills.split(',').map((skill) => skill.trim()).filter(Boolean);
    }

    if (req.body.salaryRange) {
      job.salaryRange = {
        min: Number(req.body.salaryRange.min) || job.salaryRange.min,
        max: Number(req.body.salaryRange.max) || job.salaryRange.max,
      };
    }

    await job.save();
    return res.json(job);
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    await job.deleteOne();
    return res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};
