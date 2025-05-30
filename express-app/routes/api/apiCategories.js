const express = require("express");
const router = express.Router();

const { getCategories } = require("../../controllers/api/categories.apiController");

// Endpoint de productos
router.get("/", getCategories);

module.exports = router;