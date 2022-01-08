// import
const express = require('express');
const router = express.Router();
const db = require('../../config/connection');

// get all employees
router.get('/employees', (req, res) => {
    const sql = `SELECT * FROM employees`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// get single employee
router.get('/employee/:id', (req, res) => {
    const sql = `SELECT * FROM employees WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// delete particular employee
router.delete('/employee/:id', (req, res) => {
    const sql = `DELETE FROM employees WHERE id = ?`;

    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
        } 
        else if (!result.affectedRows) {
            res.json({
            message: 'Employee not found'
            });
        } 
        else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// export router
module.exports = router;