// import inquirer
const inquirer = require('inquirer');
const { viewDepts, viewRoles, viewEmployees, addDept, addRole, addEmployee, updateRole } = require('./utils/getInfo');

// inquirer prompt 
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees',
                        'Add a Department', 'Add a Role', 'Add an Employee', 'Update a Role']
        }
    ])
    .then(response => {
        console.log('response', response);
        if( response = 'View All Departments'){
            viewDepts();
            promptUser();
            return;
        }
        else if ( response = 'View All Roles' ){
            viewRoles();
            promptUser();
            return;
        }
        else if ( response = 'View All Employees' ){
            viewEmployees();
            promptUser();
            return;
        }
        else if ( response = 'Add a Department' ){
            addDept();
            promptUser();
            return;
        }
        else if ( response = 'Add a Role' ){
            addRole();
            promptUser();
            return;
        }
        else if ( response = 'Add an Employee' ){
            addEmployee();
            promptUser();
            return;
        }
        else if ( response = 'Update a Role' ){
            updateRole();
            promptUser();
            return;
        }
        else if ( response = 'Exit' ) {
            return;
        }
    })
};



// function to start program
promptUser();