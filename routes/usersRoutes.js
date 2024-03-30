const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");

router.get("/login", controller.login);
router.get("/registro", controller.registro);
router.post("/guardarUsuario", controller.guardarUsuario);

module.exports = router;
