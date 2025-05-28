const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const multer = require('multer');
const path = require("path");
const loggedAuth = require("../middlewares/loggedAuth");
const invitadosAuth = require("../middlewares/invitadosAuth");
const { registerValidator, loginValidator } = require('../middlewares/validations');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname,'../public/img/users'))
  },
  filename: function (req, file, cb) {
    cb(null, 'user' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage})

router.get("/login", loggedAuth, usersController.getLogin);
router.get("/register", loggedAuth, usersController.getRegister);

router.post("/register", upload.single('foto'), registerValidator, usersController.processRegister);

router.post("/login", loginValidator, usersController.processLogin);
router.get("/profile", invitadosAuth, usersController.getProfile);
router.get("/logout", invitadosAuth, usersController.logout);
router.get("/edit/:id", invitadosAuth, usersController.edit);
router.put("/edit/:id", upload.single('foto'), usersController.update);
router.get('/delete/:id', usersController.destroy);

module.exports = router;
