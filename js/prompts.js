import inquirer from 'inquirer';
import {db, startQuestions} from '../index.js';

export const mainMenu = [
    {
        type:'list',
        name:'Main_Options',
        message:'What would you like to do?',
        choices:['View All Employees', 'View All Roles', 'View All Departments', 'Add Employee', 'Add Role', 'Add Department', 'Update Employee Role', 'All done, Exit']
    },
]



const addRoleQuestions = [
    {
        type:'input',
        name: 'role_title',
        message: 'What is the title of this role?'
    },
    {
        type:'input',
        name: 'role_salary',
        message: 'What is the salary of this role?'
    },
    {
        type:'number',
        name: 'department_id',
        message: 'What is the department id of this role?'
    }
]

const addDepartmentQuestion = [
    {
        type: 'input',
        name: 'department_name',
        message: 'What is the name of this Department?',
    }
]




const updateEmployeeIDQuestions = [
    {
        type: 'number',
        name: 'selected_update_id',
        message: 'What is the id number of the employee whose role you wish to update?'
    },
    {
        type:'number',
        name: 'role_id',
        message: 'What is the role id number of this employee?'
    },
    {
        type:'input',
        name: 'employee_first_name',
        message: 'What is this employees first name?',
    },
    {
        type:'input',
        name: 'employee_last_name',
        message: 'What is this employees last name?'
    },
    {
        type:'number',
        name: 'manager_id',
        message: 'What is id number of the manager for this employee?'
    }
]

export function nextQuestion (answers) {
    switch (answers.Main_Options) {
        case 'View All Employees':
            db.query(`SELECT employee.id AS Employee_ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Title, department.name AS Department_Name, role.salary AS Salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager_Name FROM department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY employee.id;`, function (err, results) {
                console.table(results);
              });
              setTimeout(() => {
                startQuestions();
            }, 1000);
            break;
        case 'View All Roles':
            db.query('SELECT role.title, role.id, department.name, role.salary FROM role JOIN department ON role.department_id = department.id ORDER BY id;', function (err, results) {
                console.table(results);
              });
              setTimeout(() => {
                startQuestions();
            }, 1000);
            break;
        case 'View All Departments':
            db.query('SELECT * FROM department;', function (err, results) {
                console.table(results);
              });
              setTimeout(() => {
                startQuestions();
            }, 1000);
            break;
        case 'Add Employee':
            addNewEmployee();
            break;
        case 'Add Role':
            inquirer
                .prompt(addRoleQuestions)
                .then(answers =>{
                    const enteredTitle = answers.role_title;
                    const enteredSalary = answers.role_salary;
                    const enteredDepartment_id = answers.department_id;
                    db.query(`INSERT INTO role (title, salary, department_id) VALUES  (?,?,?);`, [enteredTitle, enteredSalary, enteredDepartment_id], function (err, results) {
                    });
                    setTimeout(() => {
                        startQuestions();
                    }, 1000);
                });
            
            break;
        case 'Add Department':
            inquirer
                .prompt(addDepartmentQuestion)
                .then(answers =>{
                    const enteredDeptName = answers.department_name
                    db.query(`INSERT INTO department (name) VALUES  (?);`, [enteredDeptName], function (err, results) {
                    });
                    setTimeout(() => {
                        startQuestions();
                    }, 1000);
                    });
            
            break;
        case 'Update Employee Role':
            inquirer
            .prompt(updateEmployeeIDQuestions)
            .then(answers =>{
                const enteredUpFirst_Name = answers.employee_first_name;
                const enteredUpLast_Name = answers.employee_last_name;
                const enteredUpRole_id = answers.role_id;
                const enteredUpManager_id = answers.manager_id;
                const EmployeeToEdit = answers.selected_update_id;
                db.query(`UPDATE employee SET first_name=?, last_name=?, role_id=?, manager_id=? WHERE employee.id=?;`, [enteredUpFirst_Name, enteredUpLast_Name, enteredUpRole_id, enteredUpManager_id, EmployeeToEdit], function (err, results) {
                });
                startQuestions();
                });
            break;
        case 'All done, Exit':
            console.log('Thanks for using my application!')
            break;
    }
}

  



  function addNewEmployee () {
     const addEmployeeQuestions = [
        {
            type:'input',
            name: 'employee_first_name',
            message: 'What is this employees first name?',
        },
        {
            type:'input',
            name: 'employee_last_name',
            message: 'What is this employees last name?',
        },
        {
            type:'choices',
            name: 'emp_role',
            message: 'What is the role of this employee?',
            choices: roleArray,
        },
        {
            type:'number',
            name: 'manager_id',
            message: 'What is id number of the manager for this employee?',
            
        }
    ]
    const roleArray = [];
   
    
    db.query('SELECT role.title FROM role;', function (err, results) {                
        results.map((roles) => roleArray.push(roles.title))  
        .then(inquirer
            .prompt(addEmployeeQuestions)
            .then(answers =>{
                const enteredFirst_Name = answers.employee_first_name;
                const enteredLast_Name = answers.employee_last_name;
                const enteredRole = answers.emp_role;
                const enteredManager_id = answers.manager_id;
                db.query(`INSERT INTO employee (first_name, last_name, manager_id) VALUES  (?,?,?,?);`, [enteredFirst_Name, enteredLast_Name, enteredRole, enteredManager_id], function (err, results) {});
                db.query(`INSERT INTO role (title) VALUES (?)`, [enteredRole], function (err, results) {});
                setTimeout(() => {
                    startQuestions();
                }, 1000);
            }))
        
      });
    
  }