const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");
// const upload = require("../middleware/multer");

router.get("/detalle",productsController.getDetalle);
router.get("/carrito",productsController.getCarrito);
router.get("/add",productsController.getAdd);
router.get("/edit",productsController.getEdit);

module.exports = router;