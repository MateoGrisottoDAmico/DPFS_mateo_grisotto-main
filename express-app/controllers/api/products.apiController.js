let fs = require("fs")
let path = require("path");

const AutosPath = path.join(__dirname, "..", "data", "modelos.json")

const productsController = {
    getDetalle: (req,res)=>{
        res.render("products/detalle.ejs")
    },
    getCarrito: (req,res)=>{
        res.render("products/carrito.ejs")
    },
    getAdd: (req,res)=>{
        res.render("products/add.ejs")
    },
    getEdit: (req,res)=>{
        res.render("products/edit.ejs")
    }
}

module.exports = productsController;