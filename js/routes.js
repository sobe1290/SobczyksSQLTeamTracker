import {db} from '../index.js';
import * as mysql from 'mysql2';

export function viewAllDepartments () {
  db.query('SELECT * FROM department;', function (err, results) {
      console.log('reached the viewAllDepartments function')
      console.log(results);
    });
};

export function viewAllRoles () {
  db.query('SELECT role.title, role.id, department.name, role.salary FROM role JOIN department ON role.department_id = department.id ORDER BY id;', function (err, results) {
      console.table(results);
    });
};

export function viewAllEmployees () {
    db.query(`SELECT employee.id AS Employee_ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Title, department.name AS Department_Name, role.salary AS Salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager_Name FROM department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY employee.id;`, function (err, results) {
        console.table(results);
      });
};

export function addDepartment () {
  db.query(`INSERT INTO department (name) VALUES  (?,?,?);`, [enteredDeptName], function (err, results) {
    });
};

export function addRole () {
  db.query(`INSERT INTO role (title, salary, department_id) VALUES  (?,?,?);`, [enteredTitle, enteredSalary, enteredDepartment_id], function (err, results) {
  });
};

export function addEmployee () {
  db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES  (?,?,?);`, [enteredFirst_Name, enteredLast_Name, enteredRole_id, enteredManager_id], function (err, results) {
    });
};

export function updateEmployee () {
  db.query(`UPDATE employee SET first_name=?, last_name=?, role_id=?, manager_id=? WHERE employee.id=?;`, [enteredFirst_Name, enteredLast_Name, enteredRole_id, enteredManager_id], function (err, results) {
  });
};
