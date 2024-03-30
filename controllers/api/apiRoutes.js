const express = require("express");
const router = express.Router();
const controller = require("./apiControllers");

router.get("/productos", controller.productos);
router.get("/productos/:id", controller.productoPorId);
router.get("/usuarios", controller.usuarios);
router.get("/usuarios/:id", controller.usuarioPorId);

module.exports = router;
