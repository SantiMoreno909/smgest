const PORT = 3005;
const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const methodOverride = require("method-override");
const multer = require("multer");
const { body } = require("express-validator");
const app = express();

// // PROBANDO CREACIÓN DIRECTA DE USUARIOS
// Salió bien la carga directa. El problema está en la captación de datos desde el req.body

// const db = require("./database/models");

// db.Usuarios.create({
//   nombre: "Prueba",
//   apellido: "Carga",
//   username: "pcarga1",
//   email: "pcarga1@gmail.com",
//   contrasena: "pruebaCarga",
//   confirmar_contrasena: "pruebaCarga",
//   telefono: "12345678",
//   fec_nac: "2001-03-29",
//   rol: "cliente",
// });

app.use("", express.static(`${__dirname}/public`)); // Directorio público para archivos

// Configuración de body-parser para analizar el cuerpo de las solicitudes en JSON
app.use(bodyParser.json());
// Configuración de body-parser para analizar los cuerpos de las solicitudes codificadas en URL
app.use(bodyParser.urlencoded({ extended: false }));

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img");
  },
  filename: (req, file, cb) => {
    let filename = `${Date.now()}_img${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

const uploadFile = multer({ storage });

// Distintos app.use
app.use(cors());
app.use("", express.static(`${__dirname}/publics`));
app.use(methodOverride("_method")); //para el PUT y DELETE

// Configuraciones de la app

// Importar rutas del proyecto
const rutasProductos = require("./routes/productsRoutes");
const rutasUsuarios = require("./routes/usersRoutes");

// Importar las rutas de la API
const apiRoutes = require("./controllers/api/apiRoutes.js");
const { body } = require("express-validator");

// Usar las rutas de la API
app.use("/api", apiRoutes);

// Importar rutas del proyecto
app.use("/", rutasProductos);
app.use("/usuarios", rutasUsuarios);

app.set("view engine", "ejs");
app.listen(PORT, () => console.log("Server funcionando en puerto " + PORT));
