const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index.controller");

router.get("/", indexController.getHome);
router.get("/products/detalle/:id", indexController.show); 

module.exports = router;
