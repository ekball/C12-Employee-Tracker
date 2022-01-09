// import inquirer
const inquirer = require('inquirer');
const db = require("./config/connection")

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
        if( response.options === 'View All Departments'){
            viewDepts();
            return;
        }
        else if ( response.options === 'View All Roles' ){
            viewRoles();
            return;
        }
        else if ( response.options === 'View All Employees' ){
            viewEmployees();
            return;
        }
        else if ( response.options === 'Add a Department' ){
            addDept();
            return;
        }
        else if ( response.options === 'Add a Role' ){
            addRole();
            return;
        }
        else if ( response.options === 'Add an Employee' ){
            addEmployee();
            return;
        }
        else if ( response.options === 'Update a Role' ){
            updateRole();
            return;
        }
        else if ( response.options === 'Exit' ) {
            return;
        }
    })
};

// view all departments
const viewDepts = () => {
    const sql = 'SELECT * FROM departments'

    db.query(sql, (req, res) => {

        console.log('\n');
        console.table(res);
        console.log('\n');

        // restart prompt for user input
        promptUser();
    })
}

// view all roles (connect the roles and departments table via department_id)
const viewRoles = () => {
    const sql = `SELECT roles.*, departments.name AS department_name FROM roles
    LEFT JOIN departments ON roles.department_id = departments.id;
    `

    db.query(sql, (req, res) => {
       
        // print roles table joined to department table
        console.log('\n');
        console.table(res);
        console.log('\n');

        // restart prompt for user input
        promptUser();
    })
}

// view all employees
const viewEmployees = () => {
    const sql = `SELECT * FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id;
    `

    db.query(sql, (req, res) => {
        // print employees table joined to other tables
        console.log('\n');
        console.table(res);
        console.log('\n');   
        
        // restart prompt for user input
        promptUser();
    })
}

// add department
const addDept = () => {

    console.log('\n', '=================================================', '\n');

    // prompt user to provide the name of the new department
    const newDept = inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the new department?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } 
                else {
                    console.log('You need to enter a name for the department!');
                    return false;
                }
            }        
        }
    ])
    .then(newDept => {
        // set up sql to put new name into a new row in the departments table
        const sql = `INSERT INTO departments SET ?`

        const deptName = { name: newDept.name };

        db.query(sql, deptName, (req, res) => {

            // let user know that new department was added
            console.log('\n');
            console.log(`Added the ${newDept.name} Department`);

            
            // restart prompt for user input
            promptUser();

        })
    })
}

// add role
const addRole = async () => {

    console.log('\n', '=================================================', '\n');

    // prompt user to provide the title of the new role
    const roleTitle = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the new role?',
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } 
                else {
                    console.log('You need to enter a title for the role!');
                    return false;
                }
            }        
        }
    ])

    const roleSalary = await inquirer.prompt([
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the new role?',
            validate: salaryInput => {
                if (salaryInput) {
                    return true;
                } 
                else {
                    console.log('You need to enter a salary for the new role!');
                    return false;
                }
            }        
        }
    ])

    // set up sql variable to shortcut typing the sql code
    const sql = `SELECT departments.* FROM departments`

    // pull the above query from the database for a response
    db.query(sql, async(err, res) => {

        // prompt user to choose what dept the role belongs
        const whichDept = await inquirer.prompt([

            // use the response from the query to create a list of dept names only
            {
                type: 'list',
                name: 'name',
                message: 'Which department will this role be assigned?',
                choices: () => res.map(res => res.name)      
            }
        ])

        // initialize empty variable to hold id of chosen department
        let deptId;

        // search through the rows of responses from the query to find the matching name
        for (const row of res) {

            // when the name matches a dept in a row
            if(row.name === whichDept.name){

                // assign that id to the empty variable
                deptId = row.id;
                continue;
            }
        }
    

        // after gathering input, combine info into new role and add to roles table

        // set up sql variable to shortcut typing the sql code
        const sqlRoles = `INSERT INTO roles SET ?`

        db.query(sqlRoles, {

            title: roleTitle.title,
            salary: roleSalary.salary,
            department_id: deptId

        }, (err, res) => {

            // let user know that new department was added
            console.log('\n');
            console.log(`Added the ${roleTitle.title} Role into the ${whichDept.name} Department`);
            console.log('\n', '=================================================', '\n');
                    
            // restart prompt for user input
            promptUser();

        })
    })
}

// add employee
const addEmployee = () => {
    const sql = 'SELECT * FROM employees'

    db.query(sql, (req, res) => {
        console.table(res);
    })
}

// update role
const updateRole = () => {
    const sql = 'SELECT * FROM employees'

    db.query(sql, (req, res) => {
        console.table(res);

        // restart prompt for user input
        promptUser();
    })
}


// function to start program
promptUser();

