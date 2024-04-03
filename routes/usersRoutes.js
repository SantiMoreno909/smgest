const express = require("express");
const router = express.Router();
const path = require("path");
const { body, validationResult } = require("express-validator");
const { Usuarios } = require("../database/models");
const controller = require("../controllers/usersController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../publics/img/users"));
  },
  filename: (req, file, cb) => {
    const newFilename = "user-" + Date.now() + path.extname(file.originalname);
    cb(null, newFilename);
  },
});

const upload = multer({ storage });

// Validaciones
const validarCreacionUsuario = [
  body("nombre")
    .bail()
    .notEmpty()
    .withMessage("Debes completar el nombre")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres"),

  body("apellido")
    .bail()
    .notEmpty()
    .withMessage("Debes completar el apellido")
    .isLength({ min: 2 })
    .withMessage("El apellido debe tener al menos 2 caracteres"),

  body("email")
    .bail()
    .isEmail()
    .withMessage("Debes completar un email válido")
    .custom(async (value, { req }) => {
      const existingUser = await Usuarios.findOne({ where: { email: value } });
      if (existingUser) {
        throw new Error("El email ya está registrado");
      }
      return true;
    }),

  body("telefono")
    .bail()
    .notEmpty()
    .withMessage("Debes completar el teléfono")
    .custom(async (value, { req }) => {
      // Se verifica si el número de teléfono ya está registrado
      const existingUser = await Usuarios.findOne({
        where: { telefono: value },
      });
      if (existingUser) {
        throw new Error("El número de teléfono ya está registrado");
      }
      return true;
    }),

  body("fec_nac")
    .bail()
    .notEmpty()
    .withMessage("Debes completar la fecha de nacimiento"),

  body("contrasena")
    .bail()
    .notEmpty()
    .withMessage("Debes completar la contraseña")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .optional()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "La contraseña debe tener letras mayúsculas, minúsculas, un número y un carácter especial"
    ),

  body("confirmar_contrasena")
    .bail()
    .notEmpty()
    .withMessage("Debes completar la contraseña repetida"),
];

const validarLogin = [
  body("email").isEmail().withMessage("Debes proporcionar un email válido"),
  body("contrasena").notEmpty().withMessage("Debes proporcionar la contraseña"),
];

// Rutas para ingresar
router.get("/login", controller.login);
router.post("/ingresar", validarLogin, controller.iniciarSesion);

// Rutas para el registro de usuarios
router.get("/registro", controller.registro);
router.post(
  "/guardarUsuario",
  validarCreacionUsuario,
  controller.guardarUsuario
);

// Ruta para ver detalles del usuario
router.get("/detallesUsuario/:username", controller.detallesUsuario);
// router.put("/modificarUsuario/:username", controller.editarUsuario);

// RUTAS COPIADAS DE LA CASACA
// Ruta para eliminar usuarios
router.delete("/eliminar/:id", controller.destruirUsuario);

// Ruta para cerrar sesión
router.get("/cerrarSesion", controller.cerrarSesion);

module.exports = router;
