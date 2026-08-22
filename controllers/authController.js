const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Candidate = require('../models/Candidate');

const generateToken = (user) => jwt.sign(
  { id: user._id, role: user.role, name: user.name, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

const registerUser = async (req, res, next) => {
  try {
    const { name, fullName, email, password, role, phone } = req.body;
    const userName = name || fullName;
    if (!userName || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (await User.findOne({ email: normalizedEmail })) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const user = await User.create({
      name: userName.trim(),
      email: normalizedEmail,
      phone,
      password: await bcrypt.hash(password, 10),
      role: role || 'Candidate',
    });

    if (user.role === 'Candidate') await Candidate.create({ user: user._id });

    return res.status(201).json({
      token: generateToken(user),
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = email ? await User.findOne({ email: email.trim().toLowerCase() }) : null;
    if (!user || !password || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.json({
      token: generateToken(user),
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { registerUser, loginUser };