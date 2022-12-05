use todoapp;

insert into user(email, password, username) VALUE ('test@seznam.cz','$2a$10$Osg3Zmh6okgVaaHKGaw.NeoFb0eIptoV0qoCWAymH4.nVfIzRC7hm','test');

insert into todo(description, done, finish, title, owner_id)
values ('List all tasks',true,'2022-12-05','List tasks',1),
       ('User can add task',true,'2022-12-05','Add task',1),
       ('User can edit task',true,'2022-12-05','Edit task description',1),
       ('User can check task',true,'2022-12-05','Mark task as done',1),
       ('User Can remove task',true,'2022-12-05','Remove task',1),
       ('Backend API in JAVA',true,'2022-12-05','Rest API',1),
       ('MySQL',true,'2022-12-05','Database',1),
       ('Basic user model',true,'2022-12-05','User model',1),
       ('Simple validation',false,'2022-12-05','Inputs are validated',1),
       ('JWT validation',true,'2022-12-05','Authentication',1),
       ('Trough the JWT',true,'2022-12-05','Authorization',1),
       ('1 Unit, 1 Int.',true,'2022-12-05','Tests',1)
