const PORT = 3005;
const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const methodOverride = require("method-override");
const app = express();

app.use("", express.static(`${__dirname}/public`)); // Directorio público para archivos

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use("", express.static(`${__dirname}/publics`));
app.use(methodOverride("_method")); //para el PUT y DELETE
/*para el crud*/

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

// Rutas de prueba de carga de datos
app.get("/prueba", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "prueba.html"));
});
app.post("/datos", (req, res) => {
  let datos_html = false;

  try {
    datos_html = fs.readFileSync("./views/datos.html", {
      encoding: "utf8",
      flag: "r",
    });
    datos_html = datos_html.replace("%texto", req.body.texto);
  } catch (error) {
    res.status(200).send("Archivo no encontrado." + error);
  }
  return res.send(datos_html);
});

app.set("view engine", "ejs");
app.listen(PORT, () => console.log("Server funcionando en puerto " + PORT));
