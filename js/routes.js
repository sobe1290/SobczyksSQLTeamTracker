function viewAllDepartments () {
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
      });
};

function viewAllRoles () {

};

function viewAllEmployees () {

};

