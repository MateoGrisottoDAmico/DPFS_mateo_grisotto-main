const express = require('express');
const router = express.Router();
// const controllerAdmin = require("../controllers/admin.controller");
const { detalle, getModelos } = require('../../controllers/api/admin.apiController');


router.get('/', getModelos);

router.get('/detalle/:id', detalle);


module.exports = router;