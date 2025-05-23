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
};
