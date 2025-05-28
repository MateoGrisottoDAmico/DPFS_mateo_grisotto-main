const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const controllerAdmin = require("../controllers/admin.controller");
const adminAuth = require("../middlewares/adminAuth");
const validateModelo = require('../middlewares/validateModelo');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname,'../public/img'));
  },
  filename: function (req, file, cb) {
    cb(null, 'modelo' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({storage});

router.use(adminAuth);

router.get('/', controllerAdmin.index);
router.get('/add', controllerAdmin.add);
router.post('/save', upload.single('imagen'), controllerAdmin.save);
router.get('/detalle/:id', controllerAdmin.show);
router.get('/edit/:id', controllerAdmin.edit);
router.put('/edit/:id', upload.single('imagen'), controllerAdmin.update);
router.get('/delete/:id', controllerAdmin.destroy);

module.exports = router;