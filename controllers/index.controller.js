const path = require("path");
const productsPath = path.join(__dirname)
let fs = require("fs")
const modelosPath = path.join(__dirname,"..","data","modelos.json")

const indexController = {
    getHome: (req,res)=>{
        let modelos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/modelos.json')));
        res.render("home.ejs", {modelos})
    },
    getDetalle: (req,res)=>{
        res.render("detalle.ejs")
    },
    getCarrito: (req,res)=>{
        res.render("carrito.ejs")
    }
}

module.exports = indexController;