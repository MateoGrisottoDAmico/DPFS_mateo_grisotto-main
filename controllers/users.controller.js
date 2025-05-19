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
  getRegister: (req,res)=>{
    res.render("users/register");
  },
  processRegister: async(req,res)=>{
            const{nombre, apellido, email, telefono, password} = req.body;
            const nuevoUser = await db.User.create({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                telefono: req.body.telefono,
                password: bcryptjs.hashSync(password, 10),
                foto: req.file.filename,
                role: "user"
            });

            res.redirect('/');
  },
  processLogin: async(req,res)=>{
    const errors = validationResult(req);

    if(errors.isEmpty()){
      // let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json')));
      // let userTologgin = users.find(user => user.email == req.body.email);
      let userTologgin = await db.User.findOne({where:{email:req.body.email}})
      if(userTologgin){
        let passV = bcryptjs.compareSync(req.body.password, userTologgin.password);

        if (passV) {
          delete userTologgin.password;
          req.session.userLogged = userTologgin;
        
          if (req.body.rememberme == "on") {
            res.cookie('email', userTologgin.email, { maxAge: (60 * 1000) * 60 });
          }
        
          return res.redirect('/users/profile');
        } else {
          return res.render('users/login', {
            errors: {
              password: {
                msg: 'Credenciales inválidas'
              }
            },
            old: req.body
          });
        }        
      }
      else{
        return res.render('users/login', {
          errors: {
            email: {
              msg: 'El correo ingresado no está registrado'
            }
          },
          old: req.body
        });        
      }
    } 
    else{
      return res.render('users/login', {
        errors: errors.mapped(),
        old: req.body
      });
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
  
      req.session.userLogged = user;
  
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