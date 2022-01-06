// import
const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// get all employees
router.get('/', (req, res) => {

});

// get single employee
router.get('/:id', (req, res) => {
    
});

// add new employee
router.post('/', (req, res) => {
    
});

// update employee info
router.put('/:id', (req, res) => {
    
});

// delete particular employee
router.delete('/:id', (req, res) => {
    
});

// export router
module.exports = router;