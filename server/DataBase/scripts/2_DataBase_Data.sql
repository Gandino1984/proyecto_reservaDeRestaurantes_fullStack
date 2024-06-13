INSERT INTO `Bookitdb`.`User` (`Name`, `Is_Admin`, `Email`, `Password`, `Is_Client`)
VALUES 
('asd', 1, 'asd', '$2a$10$ElAMuNDFm4zre8Ym2toDMe3GCpC798fyY4Q1SzqaYyYsGiLhrGU1q', 0),
('qwe', 1, 'qwe', 'qwe', 1),
('Maria Garcia', 1, 'maria.garcia@example.com', 'password123', 1),
('Luis Martinez', 1, 'luis.martinez@example.com', 'password123', 1),
('Ana Rodriguez', 0, 'ana.rodriguez@example.com', 'password123', 1),
('Carlos Hernandez', 0, 'carlos.hernandez@example.com', 'password123', 1),
('Laura Lopez', 0, 'laura.lopez@example.com', 'password123', 0),
('David Gonzalez', 0, 'david.gonzalez@example.com', 'password123', 1),
('Jose Sanchez', 0, 'jose.sanchez@example.com', 'password123', 1),
('Marta Ramirez', 0, 'marta.ramirez@example.com', 'password123', 0),
('Pablo Torres', 0, 'pablo.torres@example.com', 'password123', 1),
('Lucia Flores', 0, 'lucia.flores@example.com', 'password123', 1),
('Raul Diaz', 0, 'raul.diaz@example.com', 'password123', 1),
('Elena Morales', 0, 'elena.morales@example.com', 'password123', 1),
('Javier Fernandez', 0, 'javier.fernandez@example.com', 'password123', 0),
('Sofia Gomez', 0, 'sofia.gomez@example.com', 'password123', 1);

INSERT INTO `Bookitdb`.`Restaurante` (`Restaurante_id`, `Name`, `Hora_Apertura`, `Hora_Cierre`, `User_id`, `Tipo_Restaurante`)
VALUES 
(1, 'Pizzeria Italia', '15:00:00', '23:00:00', 1, 'Pizza'),
(2, 'Sushi Master', '15:00:00', '23:00:00', 2, 'Sushi'),
(3, 'Taco House', '15:00:00', '23:00:00', 3, 'Mexicana'),
(4, 'Burger King', '15:00:00', '23:00:00', 4, 'Hamburguesas'),
(5, 'Vegan Delight', '15:00:00', '23:00:00', 5, 'Vegana'),
(6, 'BBQ Heaven', '15:00:00', '23:00:00', 6, 'Barbacoa'),
(7, 'Italian Bistro', '15:00:00', '23:00:00', 7, 'Italiana'),
(8, 'Indian Spice', '15:00:00', '23:00:00', 8, 'India'),
(9, 'French Gourmet', '15:00:00', '23:00:00', 9, 'Francesa'),
(10, 'Greek Taverna', '15:00:00', '23:00:00', 10, 'Griega'),
(11, 'Chinese Dragon', '15:00:00', '23:00:00', 11, 'China'),
(12, 'Seafood Paradise', '15:00:00', '23:00:00', 12, 'Mariscos'),
(13, 'Steakhouse Grill', '15:00:00', '23:00:00', 13, 'Carnes'),
(14, 'Thai Garden', '15:00:00', '23:00:00', 14, 'Tailandesa'),
(15, 'Mediterranean Feast', '15:00:00', '23:00:00', 15, 'Mediterranea');

INSERT INTO `Bookitdb`.`Mesas` (`Mesa_Id`, `Restaurante_id`, `Sillas`)
VALUES 
(1, 1, 4),
(2, 2, 6),
(3, 3, 4),
(4, 4, 2),
(5, 5, 8),
(6, 6, 6),
(7, 7, 4),
(8, 8, 6),
(9, 9, 4),
(10, 10, 2),
(11, 11, 8),
(12, 12, 6),
(13, 13, 4),
(14, 14, 2),
(15, 15, 6);

INSERT INTO `Bookitdb`.`Reservas` (`User_id`, `Date`, `Hora_Inicio`, `Hora_Final`, `Is_Accepted`, `Mesa_Id`, `Name`)
VALUES 
(1, '2024-07-01', '15:00:00', '17:00:00', 1, 1, 'Reserva Juan Perez'),
(2, '2024-07-02', '15:00:00', '17:00:00', 0, 2, 'Reserva Maria Garcia'),
(3, '2024-07-03', '16:00:00', '18:00:00', 1, 3, 'Reserva Luis Martinez'),
(4, '2024-07-04', '16:00:00', '18:00:00', 0, 4, 'Reserva Ana Rodriguez'),
(5, '2024-07-05', '17:00:00', '19:00:00', 1, 5, 'Reserva Carlos Hernandez'),
(6, '2024-07-06', '17:00:00', '19:00:00', 0, 6, 'Reserva Laura Lopez'),
(7, '2024-07-07', '18:00:00', '20:00:00', 1, 7, 'Reserva David Gonzalez'),
(8, '2024-07-08', '18:00:00', '20:00:00', 0, 8, 'Reserva Jose Sanchez'),
(9, '2024-07-09', '19:00:00', '21:00:00', 1, 9, 'Reserva Marta Ramirez'),
(10, '2024-07-10', '19:00:00', '21:00:00', 0, 10, 'Reserva Pablo Torres'),
(11, '2024-07-11', '20:00:00', '22:00:00', 1, 11, 'Reserva Lucia Flores'),
(12, '2024-07-12', '20:00:00', '22:00:00', 0, 12, 'Reserva Raul Diaz'),
(13, '2024-07-13', '21:00:00', '23:00:00', 1, 13, 'Reserva Elena Morales'),
(14, '2024-07-14', '21:00:00', '23:00:00', 0, 14, 'Reserva Javier Fernandez'),
(15, '2024-07-15', '15:00:00', '17:00:00', 1, 15, 'Reserva Sofia Gomez');
