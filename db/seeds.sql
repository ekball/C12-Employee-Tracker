INSERT INTO department (name)
VALUES
  ('Produce'),
  ('Bakery'),
  ('Deli');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Manager', 40000, 1);
  ('Grunt', 24000, 1);
  ('Manager', 40000, 2);
  ('Grunt', 24000, 2);
  ('Manager', 40000, 3);
  ('Grunt', 24000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Patrick', 'Star', 2, 1),
    ('Larry', 'Lobster', 1, NULL),
    ('Spongebob', 'Squarepants', 4, 3),
    ('Eugene', 'Krabs', 3, Null),
    ('Sandy', 'Cheeks', 6, 5),
    ('Squidward', 'Tentacles', 5, NULL);