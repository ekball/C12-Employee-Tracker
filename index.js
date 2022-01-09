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
                        'Add a Department', 'Add a Role', 'Add an Employee', 'Update a Role', 'Exit']
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
const addEmployee = async () => {
    
    console.log('\n', '=================================================', '\n');

    // prompt user to provide the title of the new role
    const employeeName = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the new employee?',
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } 
                else {
                    console.log('You need to enter a first name for the employee!');
                    return false;
                }
            }        
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the employee?',
            validate: salaryInput => {
                if (salaryInput) {
                    return true;
                } 
                else {
                    console.log('You need to enter a last name for the new employee!');
                    return false;
                }
            }        
        }
    ])

    // set up sql variable to shortcut typing the sql code
    const sql = `SELECT roles.title FROM roles`

    // pull the above query from the database for a response
    db.query(sql, async(err, res) => {

        // prompt user to choose what dept the role belongs
        const whichRole = await inquirer.prompt([

            // use the response from the query to create a list of dept names only
            {
                type: 'list',
                name: 'title',
                message: 'Which role will this employee be assigned?',
                choices: () => res.map(res => res.title)      
            }
        ])

        // initialize empty variable to hold id of chosen department
        let roleId;

        // search through the rows of responses from the query to find the matching name
        for (const row of res) {

            // when the name matches a dept in a row
            if(row.name === whichRole.title){

                // assign that id to the empty variable
                deptId = row.id;
                continue;

            }
        }

    // set up sql variable to shortcut typing the sql code
    const sqlManager = `SELECT * FROM employees`

    // pull the above query from the database for a response
    db.query(sqlManager, async(err, res) => {
 
        // create an array containing all manager names
            // first and last names are combined

        let managerName = res.map(res => `${res.first_name} ${res.last_name}`);

        // add in 'null' choice if there is no manager being assigned
        managerName.push('N/A');

        // prompt user to choose what manager the employee is assigned
        const whichManager = await inquirer.prompt([

            // use the response from the query to create a list of manager names (first + last) only
            {
                type: 'list',
                name: 'manager',
                message: 'Which manger will this employee be assigned?',
                choices: managerName      
            }
        ])

        // initialize empty variable to hold id of chosen manager
        let managerId;

        // if there is no manager chosen/needed assign null to the manager's Id
        if (whichManager.manager === 'N/A'){
            managerId = null;
        }

        // search through the rows of responses from the query to find the matching name
        for (const row of res) {

            // combine first and last name of the response from the query to create full name
            row.fullName = `${row.first_name} ${row.last_name}`

            // when the full name matches a manager's name in a row
            if(row.fullName === whichManager.manager){

                // assign that id to the empty variable
                managerId = row.id;

                continue;
                
            }
        }
    

        // after gathering input, combine info into new role and add to roles table

            // set up sql variable to shortcut typing the sql code
            const sqlRoles = `INSERT INTO employees SET ?`

            db.query(sqlRoles, {

                first_name: employeeName.first_name,
                last_name: employeeName.last_name,
                role_id: roleId,
                manager_id: managerId

            }, (err, res) => {

                // let user know that new department was added
                console.log('\n');
                console.log(`Added ${employeeName.first_name} ${employeeName.last_name} into employee database`);
                console.log('\n', '=================================================', '\n');
                        
                // restart prompt for user input
                promptUser();

            })
    })
    })
}

// update role
const updateRole = () => {
     
    console.log('\n', '=================================================', '\n');

    // set up sql variable to shortcut typing the sql code
    const sql = `SELECT * FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id;
    `
   
    // pull the above query from the database for a response
    db.query(sql, async(err, res) => {

        // create an array of all employee full names (first + last)
        let employeeName = res.map(res => `${res.first_name} ${res.last_name}`);

        // prompt user to choose what employee will be reassigned
        const whichEmployee = await inquirer.prompt([

            // use the response from the query to create a list of employee names only
            {
                type: 'list',
                name: 'employee',
                message: 'Whose role would you like to update?',
                choices: employeeName      
            }
        ])
   
        // initialize empty variable to hold id of chosen employee
        let employeeId;

        // search through the rows of responses from the query to find the matching name
        for (const row of res) {

            // when the name matches a employee name in a row
            if(row.name === whichEmployee.employee){

                // assign that id to the empty variable
                employeeId = row.id;
                continue;

            }
        }

        // set up sql variable to shortcut typing the sql code
        const sqlRole = `SELECT * FROM roles`

        // pull the above query from the database for a response
        db.query(sqlRole, async(err, res) => {

            // prompt user to choose the new role 
            const whichRole = await inquirer.prompt([

                // use the response from the query to create a list of roles
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is the new role?',
                    choices: () => res.map(res => `${res.title}`)      
                }
            ])

            // initialize variable to hold id/title of role
            let roleId;
            let roleTitle;

            // search through the rows of responses from the query to find the matching title
            for (const row of res) {

                // when the title matches a tile in a row
                if (row.title === whichRole.role){

                    // assign the title to the empty variable
                    roleTitle = row.title;

                    // assign that id to the empty variable
                    roleId = row.id;
                    continue;
                }
            }

            // set up sql variable to shortcut typing the sql code
            const sqlUpdate = `UPDATE employee
            SET role.title = ${roleTitle}
            SET role_id = ${roleId}
            WHERE employee.id = ${employeeId}
            `;
            
            db.query(sqlUpdate, async(err, res) => {

                // let user know that employee's role was updated
                console.log('\n');
                console.log(`${whichEmployee.employee}'s role is now ${roleTitle}`);
                console.log('\n', '=================================================', '\n');    

                // restart the user prompt
                promptUser();
            })
        
        })
    })
}



// function to start program
promptUser();

