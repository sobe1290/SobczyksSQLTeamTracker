const inquirer = require('inquirer');
const mysql = require('mysql2');


// This part sets up the connection
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'LMHEm6ND6aLA#B6X',
    database: 'team_db',
  },
);

//This part starts the connection and the inquirer questions
db.connect(function(err) {
  console.log(`"Connected!"\n
  
  #####                                           ###            #####   #####  #       
  #     #  ####  #####   ####  ###### #   # #    # ###  ####     #     # #     # #       
  #       #    # #    # #    #     #   # #  #   #   #  #         #       #     # #       
   #####  #    # #####  #         #     #   ####   #    ####      #####  #     # #       
        # #    # #    # #        #      #   #  #            #          # #   # # #       
  #     # #    # #    # #    #  #       #   #   #      #    #    #     # #    #  #       
   #####   ####  #####   ####  ######   #   #    #      ####      #####   #### # ####### 
   \n
   \n`);
    startQuestions();
  });


//This part starts the main menu in inquirer
function startQuestions() {
inquirer
  .prompt(mainMenu)
  .then(answers =>
    nextQuestion(answers)
        
    );
  };
  
//These are array placeholders that will hold values called from the SQL DB
const roleTitleAndIdArray = [];
const allEmployeesArray = [];
const allDepartments = [];
const employeeArrayForUpdate = [];
const updateRoleArray = [];


//This part below are the questions for inquirer  
const mainMenu = [
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
        type:'list',
        name: 'department_id',
        message: 'To what department does this role belong?',
        choices: allDepartments,
    }
]

const addDepartmentQuestion = [
    {
        type: 'input',
        name: 'department_name',
        message: 'What is the name of this Department?',
    }
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
        message: 'What is this employees last name?',
    },
    {
        type:'list',
        name: 'emp_role',
        message: 'What is the role of this employee?',
        choices: roleTitleAndIdArray,
    },
    {
        type:'list',
        name: 'manager_id',
        message: 'What who is the manager for this employee?',
        choices: allEmployeesArray,
        
    }
    
  ]


const updateEmployeeIDQuestions = [
    {
        type:'list',
        name: 'selected_update_id',
        message: 'Which employees role do you want to change?',
        choices: employeeArrayForUpdate,
    },
    {
        type:'list',
        name: 'role_id',
        message: 'Choose a role for this employee.',
        choices: updateRoleArray,
    },
    
    
]

//This is switch case which contains what do do based on the selection from the main menu

function nextQuestion (answers) {
  switch (answers.Main_Options) {
      case 'View All Employees':
          db.query(`SELECT employee.id AS Employee_ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Title, department.name AS Department_Name, role.salary AS Salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager_Name FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY employee.id;`, function (err, results) {
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
        db.query('SELECT * FROM role;', function (err, results) {               
            results.map((roles) => roleTitleAndIdArray.push({name: roles.title, value: roles.id}))           
            return roleTitleAndIdArray
          })   
        db.query('SELECT * FROM employee;', function (err, results){
            results.map((employee) => allEmployeesArray.push({name: employee.last_name, value: employee.id}))
            return allEmployeesArray
        })
        inquirer
        .prompt(addEmployeeQuestions)
        .then(answers =>{
            const enteredFirst_Name = answers.employee_first_name;
            const enteredLast_Name = answers.employee_last_name;
            const enteredRole = answers.emp_role;
            const enteredManager_id = answers.manager_id;
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES  (?,?,?,?);`, [enteredFirst_Name, enteredLast_Name, enteredRole, enteredManager_id], function (err, results) {
            });
            setTimeout(() => {
                startQuestions();
            }, 1000);
        })          
          break;
      case 'Add Role':
        db.query('SELECT * FROM department;', function (err, results){
            results.map((department) => allDepartments.push({name: department.name, value: department.id}))
            return allDepartments
        })
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
      case 'Update Employee Role': //Try adding async/await to see if that fixes this problem, array coming up empty to inquirer
        db.query('SELECT * FROM employee;', function (err, results){
            results.map((employees) => employeeArrayForUpdate.push({name: employees.last_name, value: employees.id}))
            return employeeArrayForUpdate
        })
        db.query('SELECT * FROM role;', function (err, results) {               
            results.map((roles) => updateRoleArray.push({name: roles.title, value: roles.id}))           
            return updateRoleArray
        })   
        inquirer
        .prompt(updateEmployeeIDQuestions)
        .then(answers => {         
            const employeeToEdit = answers.selected_update_id;
            const enteredUpRole_id = answers.role_id; 
            db.query(`UPDATE employee SET role_id=? WHERE id=?;`, [enteredUpRole_id, employeeToEdit], function (err, results) {
            });
            setTimeout(() => {
            startQuestions();
            }, 1000);
            });
          break;
      case 'All done, Exit':
          console.log('Thanks for using my application!')
          break;
  }
}



