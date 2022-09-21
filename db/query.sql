SELECT *
FROM department;

SELECT role.title, role.id, department.name, role.salary 
FROM role
JOIN department ON role.department_id = department.id
ORDER BY id;

SELECT employee.id AS Employee_ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Title, department.name AS Department_Name, role.salary AS Salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager_Name
FROM department
LEFT JOIN role ON role.department_id = department.id
LEFT JOIN employee ON employee.role_id = role.id 
LEFT JOIN employee manager ON manager.id = employee.manager_id
ORDER BY employee.id;




