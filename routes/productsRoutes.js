const express = require("express");
const router = express.Router();
const controller = require("../controllers/productsController");

router.get("/", controller.index);
router.get("/producto/:id", controller.detalleProductos);
router.get("/productos/vinos", controller.vinos);
router.get("/productos/cervezas", controller.cervezas);
router.get("/productos/licores", controller.licores);
router.get("/productos/sinAlcohol", controller.sinAlcohol);

module.exports = router;
