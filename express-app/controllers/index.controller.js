const path = require("path");
const productsPath = path.join(__dirname)
let fs = require("fs")
const modelosPath = path.join(__dirname,"..","data","modelos.json")

const db = require("../database/models");


module.exports = {
  getHome: async (req, res) => {
    try {
      const destacados = await db.Modelo.findAll({
        order: db.sequelize.random(),
        limit: 3,
        include: ['condicion', 'categoria']
      });
  
      const todos = await db.Modelo.findAll({
        include: ['condicion', 'categoria']
      });
  
      res.render("home.ejs", { destacados, todos });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al cargar los modelos");
    }
  }, 

    show: async (req, res) => {
        try {
          const miModelo = await db.Modelo.findByPk(req.params.id, {
            include: [
              { association: 'condicion' },
              { association: 'categoria' }
            ]
          });
          if (!miModelo) {
            return res.status(404).send('Modelo no encontrado');
          }
          res.render('admin/detalle', { miModelo });
        } catch (error) {
          console.error(error);
          res.status(500).send('Error al cargar modelo');
        }
      },      
      
    getDetalle: (req,res)=>{
        res.render("detalle.ejs")
    },

    getCarrito: (req,res)=>{
        res.render("carrito.ejs")
    }
}

