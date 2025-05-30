const db = require("../../database/models");

module.exports = {
  getModelos: async (req, res) => {
    try {
      let modelos = await db.Modelo.findAll({
        include: ['categoria', 'condicion'],
        attributes: { exclude: ['categoria_id', 'condicion_id'] }
      });

      modelos.forEach((modelo) => {
        modelo.imagen = `http://localhost:3000/img/${modelo.imagen}`;
        modelo.url = `http://localhost:3000/api/products/detalle/${modelo.id}`;
      });

      res.json({
        count: modelos.length,
        modelos: modelos,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los modelos" });
    }
  },

  detalle: async (req, res) => {
    try {
      const miModelo = await db.Modelo.findByPk(req.params.id, {
        include: ['categoria', 'condicion'],
        attributes: { exclude: ['categoria_id', 'condicion_id'] }
      });

      if (!miModelo) return res.status(404).send("Modelo no encontrado");

      miModelo.imagen = `http://localhost:3000/img/${miModelo.imagen}`;

      return res.json(miModelo);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al cargar el modelo");
    }
  },

  lastProduct: async (req, res) => {
    try {
      const ultimoModelo = await db.Modelo.findOne({
        order: [['createdAt', 'DESC']],
        include: ['categoria', 'condicion'],
        attributes: { exclude: ['categoria_id', 'condicion_id'] }
      });

      if (!ultimoModelo) {
        return res.status(404).json({ error: "No hay productos" });
      }

      ultimoModelo.imagen = `http://localhost:3000/img/${ultimoModelo.imagen}`;
      ultimoModelo.url = `http://localhost:3000/api/products/detalle/${ultimoModelo.id}`;

      return res.json(ultimoModelo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al obtener último producto" });
    }
  }
};
