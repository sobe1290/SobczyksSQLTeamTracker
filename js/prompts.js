const { default: inquirer } = require("inquirer");

const mainMenu = [
    {
        type:'list',
        name:'Main_Options',
        message:'What would you like to do?',
        choices:['View All Employees', 'View All Roles', 'View All Departments', 'Add Employee', 'Add Role', 'Add Department', 'Update Employee Role', 'All done, Exit']
    },
]

const addEmployeeQuestions = [
    {
        type:'input',
        name: 'employee_first_name',
        message: 'What is this employees first name?',
    },
    {
        type:'input',
        name: 'employee_last_name',
        message: 'What is this employees last name?'
    }
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
    }
]

const addDepartmentQuestion = [
    {
        type: 'input',
        name: 'department_name',
        message: 'What is the name of this Department?'
    }
]

function nextQuestion (answers) {
    switch (answers) {
        case 'View All Employees':

            break;
        case 'View All Roles':

            break;
        case 'View All Departments':

            break;
        case 'Add Employee':
            inquirer
                .prompt(addEmployeeQuestions)
                .then(answers =>{

                })
            break;
        case 'Add Role':
            inquirer
                .prompt(addRoleQuestions)
                .then(answers =>{

            })
            break;
        case 'Add Department':
            inquirer
                .prompt(addDepartmentQuestion)
                .then(answers =>{

            })
            break;
        case 'Update Employee Role':

            break;
        case 'All done, Exit':

            break;
    }
}