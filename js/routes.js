function viewAllDepartments () {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
      });
};

function viewAllRoles () {
    db.query('SELECT * FROM role JOIN department ON role.department_id = department.id', function (err, results) {
        console.table(results);
      });
};

function viewAllEmployees () {
    db.query('SELECT * FROM employee JOIN role ON employee.role_id = role.id', function (err, results) {
        console.table(results);
      });
};

function addEmployee () {
    db.query(`INSERT INTO role (title, salary, department_id) VALUES  (${enteredTitle}, ${enteredSalary}, ${enteredDepartment_id} )`, function (err, results) {
      });

}

function addDepartment () {
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES  ("${enteredFirst_Name}", "${enteredLast_Name}", ${enteredRole_id}, ${enteredManager_id})`, function (err, results) {
      });
}