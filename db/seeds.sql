INSERT INTO department (name)
VALUES  ("Engineering"),
        ("Sales"),
        ("Finance"),
        ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES  ("Front_End_Developer", 109576.84, 1 ),
        ("Back_End_Developer",107447.85, 1),
        ("Accounts_Manager", 61754.86, 2),
        ("Sales_Representative", 73751.87, 2),
        ("Financial_Analyst", 82485.88, 3),
        ("Financial_Planner", 65454.89, 3),
        ("Legal_Assistant", 54618.90, 4),
        ("Entry_Counsel", 60604.91, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Bertram", "Gilfoyle", 1, 2),
        ("Hendricks", "Richard", 2, NULL),
        ("Gavin", "Belson", 3, NULL),
        ("Erlich", "Bachman", 4, 3),
        ("Nelson", "Bighetti", 5, 6),
        ("Monica", "Hall", 6, NULL),
        ("Jared", "Dunn", 7, 8),
        ("Laurie", "Bream", 8, NULL);