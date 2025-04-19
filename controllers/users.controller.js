const path = require("path");
const fs = require("fs");
const bcryptjs = require("bcryptjs");
const { name } = require("ejs");
const { destroy } = require("./admin.controller");
const { validationResult } = require('express-validator');

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
  processRegister: (req,res)=>{
    let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json')));
            let ultimoUser = users.pop();
            users.push(ultimoUser);
            const{nombre, apellido, email, telefono, password} = req.body;
            let nuevoUser = {
                id: ultimoUser.id +1,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                telefono: req.body.telefono,
                password: bcryptjs.hashSync(password, 10),
                foto: req.file.filename,
                role: "user"
            }
            users.push(nuevoUser);
            let nuevoUserGuardar = JSON.stringify(users,null,2);
            fs.writeFileSync(path.resolve(__dirname, '../data/users.json'), nuevoUserGuardar);
            res.redirect('/');
  },
  processLogin: (req,res)=>{
    const errors = validationResult(req);

    if(errors.isEmpty()){
      let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json')));
      let userTologgin = users.find(user => user.email == req.body.email);
      
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
  logout: (req,res)=>{
    res.clearCookie('email');
    req.session.destroy();

    res.redirect('/');
  },
  edit: (req,res)=>{
    const {id} = req.params;

    let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json')));
    let userFound = users.find(user => user.id == id);

    if(userFound){
      res.render('users/edit', {user: userFound});
    }
    res.status(404).render('not-found.ejs', {title: "Usuario inexistente"});
  },
  update: (req,res)=>{
    try {
      const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json')));
      const { id } = req.params;
      const { nombre, apellido, email, telefono, password } = req.body;
  
      let userFound = users.find(user => user.id == id);
      if (!userFound) {
        return res.status(404).send('Usuario no encontrado');
      }
  
      userFound.nombre = nombre;
      userFound.apellido = apellido;
      userFound.email = email;
      userFound.telefono = telefono;
      userFound.password = password == "" ? userFound.password:bcryptjs.hashSync(password, 10);
      userFound.foto = req.file?.filename || userFound.foto;
  
      fs.writeFileSync(path.resolve(__dirname, '../data/users.json'), JSON.stringify(users, null, 2));
      req.session.userLogged = userFound;
      return res.redirect('/');
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error al actualizar usuario');
    }
  },
  destroy: (req, res) => {
    try {
      let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json')));
      const userDeleteId = req.params.id;
  
      const updatedUsers = users.filter(user => user.id != userDeleteId);
  
      fs.writeFileSync(path.resolve(__dirname, '../data/users.json'), JSON.stringify(updatedUsers, null, 2));
  
      res.clearCookie('email');
      req.session.destroy();

      return res.redirect('/');
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al eliminar el usuario");
    }
  }
}