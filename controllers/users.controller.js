const path = require("path");
const fs = require("fs");
const bcryptjs = require("bcryptjs");

const userPath = path.join(__dirname, "..", "data", "users.json");

module.exports={
  getLogin: (req,res)=>{
    res.render("users/login");
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
                foto: req.file.filename
            }
            users.push(nuevoUser);
            let nuevoUserGuardar = JSON.stringify(users,null,2);
            fs.writeFileSync(path.resolve(__dirname, '../data/users.json'), nuevoUserGuardar);
            res.redirect('/');
  },
  processLogin: (req,res)=>{
    let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json')));

    let userTologgin = users.find(user => user.email == req.body.email);
    
    if(userTologgin){
      
      let passV = bcryptjs.compareSync(req.body.password, userTologgin.password);

      if(passV){
        
        delete userTologgin.password;
        req.session.userLogged = userTologgin;

        if(req.body.rememberme == "on"){

          res.cookie('email', userTologgin.email, {maxAge: (60*1000)*60});
        }

        return res.redirect('/users/profile');
      }

      console.log("Las credenciales son incorrectas");
      return res.redirect('/users/login');
    }
    else{
      
      console.log("El mail no está ingresado");
      return res.redirect('/users/login');
    }

  },
  getProfile: (req,res)=>{
    res.render("users/profile", {user: req.session.userLogged});
  },
  logout: (req,res)=>{
    res.clearCookie('email');
    req.session.destroy();

    res.redirect('/');
  }
}