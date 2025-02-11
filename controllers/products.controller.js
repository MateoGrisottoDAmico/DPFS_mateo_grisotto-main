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
    },
//     store: (req,res)=>{
//         let Autos = JSON.parse(fs.readFileSync(AutosPath, "utf-8"))
//         let colors = [];
//         const {name,brand,model, description,price,stock,categorySeason,categoryAge, color} = req.body;
//         let sizes = [];
//         colors.push(req.body.color1)
//         colors.push(req.body.color2)
//         colors.push(req.body.color3)
//         colors.push(req.body.color4)
//         sizes.push(req.body.size1)
//         sizes.push(req.body.size2)
//         sizes.push(req.body.size3)
//         sizes.push(req.body.size4)
//         sizes.push(req.body.size5)
//         sizes.push(req.body.size6)

//         //checkear que los name de los inputs esten bien puestos
//         let newAuto = {
//             id: clothes[clothes.length - 1].id + 1,
//             nombre: req.body.name,
//             marca: req.body.brand,
//       modelo: req.body.model,
//       descripcion: req.body.description,
//       precio: req.body.price,
//       stock: req.body.stock,
//       categorias: {
//         estacion: req.body.categorySeason,
//         edad: req.body.categoryAge,
//         genero: req.body.categoryGenre,
//       },
//       colores: colors,
//       tamaños: sizes,
//       imagen: req.file.filename || "default.png",
//       visibilidad: req.body.visibility
//         }
//         console.log("aca va el body",req.body)
//         console.log("aca va el file",req.file);


//         Autos.push(newAuto);
//         fs.writeFileSync(AutosPath, JSON.stringify(Autos, null, " "))
//         console.log("se creó correctamente");

//         res.redirect("/")
//     },
}

module.exports = productsController;