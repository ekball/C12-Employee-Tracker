// import packages/files
const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// get all departments
router.get('/', (req, res) => {

});

// get single department (by id)
router.get('/:id', (req, res) => {
    
});

// add new department
router.post('/', (req, res) => {
    
});

// update department name (by id)
router.put('/:id', (req, res) => {
    
});

// delete particular department (by id)
router.delete('/:id', (req, res) => {
    
});

// export router
module.exports = router;