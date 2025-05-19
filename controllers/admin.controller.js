const db = require("../database/models");

module.exports = {
  index: async (req, res) => {
    try {
      const modelos = await db.Modelo.findAll({
        include: ['categoria', 'condicion'] 
      });
      return res.render('admin/index', { modelos });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al cargar modelos");
    }
  },

  add: async (req, res) => {
    try {
      const categorias = await db.Categoria.findAll();    
      const condiciones = await db.Condicion.findAll();   
      return res.render('admin/add', { categorias, condiciones });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al cargar formulario");
    }
  },

  save: async (req, res) => {
    try {
      const nuevoModelo = await db.Modelo.create({
        titulo: req.body.titulo,
        marca: req.body.marca,
        kilometraje: req.body.kilometraje,
        color: req.body.color,
        combustible: req.body.combustible,
        transmision: req.body.transmision,
        precio: req.body.precio,
        stock: req.body.stock,
        categoria_id: req.body.categoria,
        condicion_id: req.body.condicion,
        imagen: req.file.filename
      });
      return res.redirect('/admin');
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al guardar modelo");
    }
  },

  show: async (req, res) => {
    try {
      const miModelo = await db.Modelo.findByPk(req.params.id, {
        include: ['categoria', 'condicion']
      });

      if (!miModelo) return res.status(404).send("Modelo no encontrado");

      return res.render('admin/detalle', { miModelo });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al cargar el modelo");
    }
  },

  edit: async (req, res) => {
    try {
      const editModelo = await db.Modelo.findByPk(req.params.id);
      const categorias = await db.Categoria.findAll();
      const condiciones = await db.Condicion.findAll();

      if (!editModelo) return res.status(404).send("Modelo no encontrado");

      return res.render('admin/edit', { editModelo, categorias, condiciones });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al cargar edición");
    }
  },

  update: async (req, res) => {
    try {
      const modelo = await db.Modelo.findByPk(req.params.id); 
      if (!modelo) return res.status(404).send("Modelo no encontrado");
  
      const categoria = await db.Categoria.findByPk(req.body.categoria);
      if (!categoria) return res.status(400).send("Categoría inválida");
  
      const condicion = await db.Condicion.findByPk(req.body.condicion);
      if (!condicion) return res.status(400).send("Condición inválida");
  
      await modelo.update({
        titulo: req.body.titulo,
        marca: req.body.marca,
        kilometraje: req.body.kilometraje,
        color: req.body.color,
        combustible: req.body.combustible,
        transmision: req.body.transmision,
        precio: req.body.precio,
        stock: req.body.stock,
        categoria_id: categoria.id,
        condicion_id: condicion.id,
        imagen: req.file ? req.file.filename : req.body.oldImagen
      });
  
      return res.redirect('/admin');
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al actualizar modelo");
    }
  },  

  destroy: async (req, res) => {
    try {
      const modelo = await db.Modelo.findByPk(req.params.id);
      if (!modelo) return res.status(404).send("Modelo no encontrado");

      await modelo.destroy();
      return res.redirect('/admin');
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al eliminar modelo");
    }
  }
};
