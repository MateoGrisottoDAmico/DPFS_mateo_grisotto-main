const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const controllerAdmin = require("../controllers/admin.controller");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname,'../public/img'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, 'modelo' + Date.now() + path.extname(file.originalname))
    }
  })
  
  const upload = multer({storage})

router.get('/', controllerAdmin.index);
router.get('/add', controllerAdmin.add);

module.exports = router;