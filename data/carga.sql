-- CARGA DE CATEGORIAS
INSERT INTO "Categorias" ("nombre") VALUES ("vinos");
INSERT INTO "Categorias" ("nombre") VALUES ("licores");
INSERT INTO "Categorias" ("nombre") VALUES ("cervezas");
INSERT INTO "Categorias" ("nombre") VALUES ("sinAlcohol");

-- CARGA DE SUBCATEGORIAS PARA CATEGORIA VINO
INSERT INTO "Subcategorias" ("nombre", "categoriaID") VALUES ("malbec", (1));
INSERT INTO "Subcategorias" ("nombre", "categoriaID") VALUES ("syrah", (1));
INSERT INTO "Subcategorias" ("nombre", "categoriaID") VALUES ("bonarda", (1));
INSERT INTO "Subcategorias" ("nombre", "categoriaID") VALUES ("torrontes", (1));
INSERT INTO "Subcategorias" ("nombre", "categoriaID") VALUES ("cabernet sauvignon", (1));
INSERT INTO "Subcategorias" ("nombre", "categoriaID") VALUES ("merlot", (1));

-- CARGA DE SUBCATEGORIAS PARA CATEGORIA LICORES
INSERT INTO "Subcategorias" ("nombre", "categoriaID") VALUES ("fernet", (2));
INSERT INTO "Subcategorias" ("nombre", "categoriaID") VALUES ("whisky", (2));
INSERT INTO "Subcategorias" ("nombre", "categoriaID") VALUES ("tequila", (2));
INSERT INTO "Subcategorias" ("nombre", "categoriaID") VALUES ("ron", (2));
INSERT INTO "Subcategorias" ("nombre", "categoriaID") VALUES ("vodka", (2));
INSERT INTO "Subcategorias" ("nombre", "categoriaID") VALUES ("ginebra", (2));

-- CARGA DE SUBCATEGORIAS PARA CATEGORIA CERVEZAS
INSERT INTO "Subcategorias" ("nombre", "categoriaID") VALUES ("rubia", (3));
INSERT INTO "Subcategorias" ("nombre", "categoriaID") VALUES ("roja", (3));
INSERT INTO "Subcategorias" ("nombre", "categoriaID") VALUES ("negra", (3));
INSERT INTO "Subcategorias" ("nombre", "categoriaID") VALUES ("ipa", (3));
INSERT INTO "Subcategorias" ("nombre", "categoriaID") VALUES ("lager", (3));
INSERT INTO "Subcategorias" ("nombre", "categoriaID") VALUES ("ale", (3));
INSERT INTO "Subcategorias" ("nombre", "categoriaID") VALUES ("stout", (3));

-- CARGA DE SUBCATEGORIAS PARA CATEGORIA SIN ALCOHOL
INSERT INTO "Subcategorias" ("nombre", "categoriaID") VALUES ("gaseosa", (4));
INSERT INTO "Subcategorias" ("nombre", "categoriaID") VALUES ("jugo", (4));
INSERT INTO "Subcategorias" ("nombre", "categoriaID") VALUES ("energizante", (4));
INSERT INTO "Subcategorias" ("nombre", "categoriaID") VALUES ("isotónica", (4));

-- CARGA DE FORMAS DE PAGO
INSERT INTO "FormaPago" ("formaPago") VALUES ("efectivo");
INSERT INTO "FormaPago" ("formaPago") VALUES ("mercado pago");
INSERT INTO "FormaPago" ("formaPago") VALUES ("naranja x");
INSERT INTO "FormaPago" ("formaPago") VALUES ("bna");
INSERT INTO "FormaPago" ("formaPago") VALUES ("brubank");
INSERT INTO "FormaPago" ("formaPago") VALUES ("uala");
INSERT INTO "FormaPago" ("formaPago") VALUES ("prex");
INSERT INTO "FormaPago" ("formaPago") VALUES ("personal pay");
INSERT INTO "FormaPago" ("formaPago") VALUES ("itau");

-- CARGA DE PROVEEDORES
INSERT INTO "Proveedores" ("nombre", "direccion", "telefono") VALUES ("Distribuidora Uman", "Maria de Quiroga 188", 3804427285);
INSERT INTO "Proveedores" ("nombre", "direccion", "telefono") VALUES ("Distribuidora San Expedito", "Barrio Tambor de Tacuari", 3804133430);
INSERT INTO "Proveedores" ("nombre", "direccion", "telefono") VALUES ("Distribuidora San Nicolas", "San Nicolás de Bari 2700", 3804707304);
INSERT INTO "Proveedores" ("nombre", "direccion", "telefono") VALUES ("Distribuidora Brasileño", "Avenida Felix de la Colina y Avenida Santa Rosa", 3804918034);

-- CARGA DE USUARIOS
INSERT INTO Usuarios (nombre, apellido, username, contrasena, confirmar_contrasena, email, telefono, fec_nac, rol) VALUES 
('Santiago', 'Moreno', 'smoreno', 'smorenoContraseña', 'smorenoContraseña', 'smoreno@example.com', 1234567890, '2000-01-01', 'admin'),
('Omar', 'Gallardo', 'ogallardo', 'ogallardoContraseña', 'ogallardoContraseña', 'ogallardo@example.com', 0987654321, '2000-01-01', 'admin'),
('Fabricio', 'Vega', 'fvega', 'fvegaContraseña', 'fvegaContraseña', 'fvega@example.com', 5555555555, '2000-01-01', 'cliente');

-- CARGA DE VENDEDORES
INSERT INTO Vendedores (nombre, apellido, direccion, telefono, telefonoEmergencia, fecNac) VALUES 
('Omar', 'Gallardo', "la rioja 123", 65148965, 65487642, '2000-01-01');

-- CARGA DE PRODUCTOS CATEGORIA VINOS
INSERT INTO Productos ("nombre", "precioVenta", "categoriaID", "subcategoriaID", "proveedorID", "presentacion", "url_foto") VALUES
("Trapiche Alaris", 3800, 1, 1, 4, "botella 750ml", "/img/vinotrapichealarismalbec750.webp"),
("Seismiles", 7000, 1, 2, 4, "botella 750ml", "/img/vinoseismilessyrah750.webp"),
("Cuesta del Rodeo", 3000, 1, 1, 4, "botella 750ml", "/img/vinocuestadelrodeomalbec750.webp"),
("Colon", 2900, 1, 1, 4, "botella 750ml", "/img/vinocolonmalbec750.webp"),
("Cafayate Cosecha Tardía", 3500, 1, 4, 4, "botella 750ml", "/img/vinocafayatecosechatardiatorrontes750.webp"),
("Colonia Las Liebres", 4600, 1, 3, 4, "botella 750ml", "/img/vinocolonialasliebresbonarda750.webp");

-- CARGA DE PRODUCTOS CATEGORIA LICORES
INSERT INTO Productos ("nombre", "precioVenta", "categoriaID", "subcategoriaID", "proveedorID", "presentacion", "url_foto") VALUES
("Fernet Branca", 8900, 2, 1, 4, "botella 750ml", "/img/fernetbranca.webp"),
("100 Pippers", 7600, 2, 8, 4, "botella 750ml", "/img/whisky100pippers.webp"),
("Sernova Clásico", 5000, 2, 11, 4, "botella 750ml", "/img/vodkasernovaclasico.webp"),
("Sernova Frutos del bosque", 7100, 2, 11, 4, "botella 750ml", "/img/vodkasernovafrutosdelbosque.webp"),
("Sernova Caribbean Blend", 7500, 2, 11, 4, "botella 750ml", "/img/vodkasernovacaribbeanblend.webp"),
("Conquistador Silver", 7300, 2, 9, 4, "botella 750ml", "/img/tequilaconquistadorsilver.webp"),
("DF Dorado", 3900, 2, 9, 4, "botella 750ml", "/img/tequiladfdorado.webp");

-- CARGA DE PRODUCTOS CATEGORIA CERVEZAS
INSERT INTO Productos ("nombre", "precioVenta", "categoriaID", "subcategoriaID", "proveedorID", "presentacion", "url_foto") VALUES
("Corona", 1600, 3, 13, 1, "botella 330ml", "/img/cervezacoronachica.webp"),
("Six Pack Imperial Golden", 8200, 3, 13, 1, "six pack", "/img/cervezasiximperialgolden.webp"),
("Pampa Lata", 1600, 3, 16, 1, "lata 473ml", "/img/cervezapampaipalata.webp"),
("Amstel Lager Lata", 900, 3, 13, 1, "lata 473ml", "/img/cervezaamstellagerlata.webp"),
("Pampa Lata", 1600, 3, 13, 1, "lata 473ml", "/img/cervezapampadoradalata.webp"),
("Heineken chica", 1600, 3, 13, 1, "botella 330ml", "/img/cervezaheinekenchica.webp"),
("Brahma Dorada Lata", 1500, 3, 13, 1, "lata 473ml", "/img/cervezabrahmalata.webp"),
("Imperial Negra Lata", 1500, 3, 15, 1, "lata 473ml", "/img/imperiallatanegra.webp"),
("Six Pack Imperial Negra", 8500, 3, 15, 1, "six pack", "/img/siximperialnegra.webp");

-- CARGA DE PRODUCTOS CATEGORIA SIN ALCOHOL
INSERT INTO Productos ("nombre", "precioVenta", "categoriaID", "subcategoriaID", "proveedorID", "presentacion", "url_foto") VALUES
("Coca Cola 3lts", 4400, 4, 20, 1, "descartable", "/img/cocacola3litros.jpg"),
("Coca Cola 2.25lts", 3500, 4, 20, 1, "descartable", "/img/cocacola225litros.jpg"),
("Coca Cola 1.5lts", 2400, 4, 20, 1, "descartable", "/img/cocacola15litros.jpg"),
("Coca Cola 1.5lts retornable", 2400, 4, 20, 1, "retornable", "/img/cocacola15retornable.png"),
("Sprite 3lts", 4200, 4, 20, 1, "descartable", "/img/sprite3litros.webp"),
("Agua Saborizada Aquarius Pera", 2200, 4, 21, 1, "descartable", "/img/aquariuspera.webp"),
("Agua Saborizada Aquarius Pomelo Rosado", 2200, 4, 21, 1, "descartable", "/img/aquariuspomelorosado.webp"),
("Agua Saborizada Aquarius Manzana", 2200, 4, 21, 1, "descartable", "/img/aquariusmanzana.webp"),
("Speed", 1750, 4, 22, 1, "descartable", "/img/speed.webp"),
("Monster tradicional", 1750, 4, 22, 1, "descartable", "/img/monstertradicional.webp"),
("Monster de mango", 1750, 4, 22, 1, "descartable", "/img/monstermango.png"),
("Monster de ananá", 1750, 4, 22, 1, "descartable", "/img/monsteranana.jpg");
