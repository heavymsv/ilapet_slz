insert into role(authority) values (0);
insert into role(authority) values (1);

insert into user(name, password, email, username, telefone, enabled, access_level_id) values ('admin', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'admin_user@mail.com', 'admin_user@mail.com', "98982734057", true, 2),('Luis Carlos', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'user_user@mail.com', 'user_user@mail.com', "98984033393", true, 1);
insert into cliente(name, email) values ('admin', 'admin_user@mail.com'),('Luis Carlos', 'user_user@mail.com');
Insert into pet(name, user_id, tipo) values ('Leila',1,'Cachorro'),('Matilda',1,'Gato'),('Dina',2,'Cachorro');
insert into veterinario(name) values ('Carlos'),('Monique');
insert into exame(name) values ("Raio - X"),("Colonoscopia"),("Sangue");
insert into vacina(name,doses) values ("Proheart",1),("Polivalente V8",3);

