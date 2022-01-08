// create functions for each of the choices listed in root/index.js
const db = require("../config/connection")

// view all departments
viewDepts = () => {
    const sql = 'SELECT * FROM departments'

    db.query(sql, (req, res) => {
        console.log('\n');
        console.table(res);
        console.log('\n');
    })
}

// view all roles
viewRoles = () => {
    const sql = 'SELECT * FROM roles'

    db.query(sql, (req, res) => {
        console.log('\n');
        console.table(res);
        console.log('\n');
    })
}

// view all employees
viewEmployees = () => {
    const sql = 'SELECT * FROM employees'

    db.query(sql, (req, res) => {
        console.log('\n');
        console.table(res);
        console.log('\n');    })
}

// add department
addDept = (name) => {
    const sql = 'SELECT * FROM employees'

    db.query(sql, (req, res) => {
        console.table(res);
    })
}

// add role
addRole = (title, salary, departmentId) => {
    const sql = 'SELECT * FROM employees'

    db.query(sql, (req, res) => {
        console.table(res);
    })
}

// add employee
addEmployee = (first_name, last_name, role_id, manager_id) => {
    const sql = 'SELECT * FROM employees'

    db.query(sql, (req, res) => {
        console.table(res);
    })
}

// update role
updateRole = () => {
    const sql = 'SELECT * FROM employees'

    db.query(sql, (req, res) => {
        console.table(res);
    })
}

module.exports = { viewDepts, viewRoles, viewEmployees, addDept, addRole, addEmployee, updateRole };