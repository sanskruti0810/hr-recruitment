const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require('../controllers/departmentController');

router.get('/', verifyToken, getDepartments);
router.post('/', verifyToken, authorizeRoles('Admin', 'HR'), createDepartment);
router.put('/:id', verifyToken, authorizeRoles('Admin', 'HR'), updateDepartment);
router.delete('/:id', verifyToken, authorizeRoles('Admin', 'HR'), deleteDepartment);

module.exports = router;
