const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const multer = require('multer');
const path = require("path");
const loggedAuth = require("../middlewares/loggedAuth");
const invitadosAuth = require("../middlewares/invitadosAuth");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname,'../public/img/users'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, 'user' + Date.now() + path.extname(file.originalname))
    }
  })
  
  const upload = multer({storage})

  router.get("/login", loggedAuth, usersController.getLogin);
  router.get("/register", loggedAuth, usersController.getRegister);
  router.post("/register", upload.single('foto'), usersController.processRegister);
  router.post("/login", usersController.processLogin);
  router.get("/profile", invitadosAuth, usersController.getProfile);
  router.get("/logout", invitadosAuth, usersController.logout);

module.exports = router;
