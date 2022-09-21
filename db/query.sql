SELECT role.id, role.title, role.salary, role.department_id
FROM role
JOIN department ON role.department_id = department.id;

SELECT *
FROM employee
JOIN role ON employee.role_id = role.id;

SELECT *
FROM department;