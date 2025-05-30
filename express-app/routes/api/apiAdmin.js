const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/api/admin.apiController');
const { detalle, getModelos } = require('../../controllers/api/admin.apiController');


router.get('/', getModelos);

router.get('/detalle/:id', detalle);

router.get('/last-product', adminController.lastProduct);

module.exports = router;