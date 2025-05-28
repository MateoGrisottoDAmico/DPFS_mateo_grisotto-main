const path = require("path");
const fs = require("fs");
const bcryptjs = require("bcryptjs");
const { name } = require("ejs");
const { destroy } = require("./admin.controller");
const { validationResult } = require('express-validator');
const db = require("../database/models");

const userPath = path.join(__dirname, "..", "data", "users.json");

module.exports={
  getLogin: (req, res) => {
    return res.render('users/login', {
      errors: {},
      old: {}
    });
  },
  
  getRegister: (req,res) => {
    res.render("users/register", {
      errors: {},
      old: {}
    });
  },  

  processRegister: async (req, res) => {
    try {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.render('users/register', {
          errors: errors.mapped(),
          old: req.body
        });
      }
  
      const { nombre, apellido, email, telefono, password } = req.body;
  
      const nuevoUser = await db.User.create({
        nombre,
        apellido,
        email,
        telefono,
        password: bcryptjs.hashSync(password, 10),
        foto: req.file ? req.file.filename : null,
        role: "user"
      });
  
      return res.redirect('/');
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al registrar usuario");
    }
  },

  processLogin: async (req, res) => {
    try {
      const resultValidation = validationResult(req);
  
      if (resultValidation.isEmpty()) {
        const userFound = await db.User.findOne({
          where: { email: req.body.email },
        });
  
        if (userFound) {
          const passwordOk = bcryptjs.compareSync(
            req.body.password,
            userFound.password
          );
  
          if (passwordOk) {
            const userSession = { ...userFound.dataValues };
            delete userSession.password;
            req.session.userLogged = userSession;
  
            if (req.body.remember_me === "on") {
              res.cookie("email", userFound.email, {
                maxAge: 1000 * 60 * 60 * 24 * 7, 
              });
            }
  
            return res.redirect("/users/profile");
          } else {
            return res.render("users/login", {
              errors: {
                password: { msg: "Credenciales inválidas" },
              },
              old: req.body,
            });
          }
        } else {
          return res.render("users/login", {
            errors: {
              email: { msg: "El correo ingresado no está registrado" },
            },
            old: req.body,
          });
        }
      } else {
        return res.render("users/login", {
          errors: resultValidation.mapped(),
          old: req.body,
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error inesperado");
    }
  },
  
  getProfile: (req,res)=>{
    res.render("users/profile", {user: req.session.userLogged});
  },

  logout: (req, res) => {
    res.clearCookie('email');
    req.session.destroy(err => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error al cerrar sesión");
      }
      return res.redirect('/');
    });
  },  

  edit: async (req, res) => {
    const { id } = req.params;
    const user = await db.User.findByPk(id);
    if (user) {
      return res.render('users/edit', { user });
    }
    return res.status(404).render('not-found.ejs', { title: "Usuario inexistente" });
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, apellido, email, telefono, password, oldFoto } = req.body;
      const user = await db.User.findByPk(id);
  
      if (!user) return res.status(404).send('Usuario no encontrado');
  
      user.nombre = nombre;
      user.apellido = apellido;
      user.email = email;
      user.telefono = telefono;
  
      if (password) {
        user.password = bcryptjs.hashSync(password, 10);
      }
  
      user.foto = req.file ? req.file.filename : oldFoto;
  
      await user.save();
  
      const userSession = { ...user.dataValues };
      delete userSession.password;
      req.session.userLogged = userSession;
  
      return res.redirect('/');
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error al actualizar usuario');
    }
  },  
    
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await db.User.findByPk(id);
  
      if (!user) return res.status(404).send("Usuario no encontrado");
  
      await user.destroy();
  
      res.clearCookie('email');
      req.session.destroy(err => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error al eliminar sesión del usuario");
        }
        return res.redirect('/');
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al eliminar el usuario");
    }
  },   
}