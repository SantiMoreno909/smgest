const PORT = 3005;
const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const methodOverride = require("method-override");
const multer = require("multer");
const session = require("express-session");
const app = express();

app.use("", express.static(`${__dirname}/public`)); // Directorio público para archivos

// Configuración de body-parser para analizar el cuerpo de las solicitudes en JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configuración de session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      // Configura el tiempo de vida de la cookie de sesión en el navegador (en milisegundos)
      // Aquí, la sesión expirará después de 24 horas de inactividad
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

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

// Usar las rutas de la API
app.use("/api", apiRoutes);

// Importar rutas del proyecto
app.use("/", rutasProductos);
app.use("/usuarios", rutasUsuarios);

app.set("view engine", "ejs");
app.listen(PORT, () => console.log("Server funcionando en puerto " + PORT));
