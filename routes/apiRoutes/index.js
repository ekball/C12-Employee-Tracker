const router = require('express').Router();

// import routes
const departmentRoutes = require('./departmentRoutes');
const roleRoutes = require('./roleRoutes');
const employeeRoutes = require('./employeeRoutes');

// set up the url's to access various parts of the api/database
router.use('/departments', departmentRoutes);
router.use('/roles', roleRoutes);
router.use('/employees', employeeRoutes);

module.exports = router;