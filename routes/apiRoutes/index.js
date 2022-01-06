const router = require('express').Router();

// import routes
const departmentRoutes = require('./departmentRoutes');
const roleRoutes = require('./roleRoutes');
const employeeRoutes = require('./employeeRoutes');

// set up the url's to access various parts of the api/database
router.use('/department', departmentRoutes);
router.use('/role', roleRoutes);
router.use('/employee', employeeRoutes);

module.exports = router;