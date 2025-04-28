const path = require("path");
const productsPath = path.join(__dirname)
let fs = require("fs")
const modelosPath = path.join(__dirname,"..","data","modelos.json")

const db = require("../database/models");


module.exports = {
    getHome: (req,res)=>{
        db.Modelo.findAll()
        .then(modelos=> {
            res.render("home.ejs", {modelos})
        })
    },
    show: (req,res) =>{
            let modelos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/modelos.json')));
            let miModelo = modelos.find(modelo => modelo.id == req.params.id);
            res.render('admin/detalle', {miModelo});
        },
    getDetalle: (req,res)=>{
        res.render("detalle.ejs")
    },
    getCarrito: (req,res)=>{
        res.render("carrito.ejs")
    }
}

