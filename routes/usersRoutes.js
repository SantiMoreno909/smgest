const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");
const { body } = require("express-validator");

const validaciones = [];

router.get("/login", controller.login);
router.post("/ingresar", controller.ingresar);
router.get("/registro", validaciones, controller.registro);
router.post("/guardarUsuario", controller.guardarUsuario);

module.exports = router;
