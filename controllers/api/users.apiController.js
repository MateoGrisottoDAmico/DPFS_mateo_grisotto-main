const db = require("../../database/models");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await db.User.findAll({
        attributes: {
          exclude: ['password'],
        },
      });

      const usersMap = users.map(user => ({
        ...user.toJSON(),
        foto: `http://localhost:3000/img/users/${user.foto}`,
        url: `http://localhost:3000/api/users/${user.id}`
      }));

      res.json({
        count: users.length,
        users: usersMap,
      });
    } catch (error) {
      console.error("Error en getUsers:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  profile: async (req, res) => {
    try {
      const user = await db.User.findByPk(req.params.id, {
        attributes: {
          exclude: ['password'],
        },
      });

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const userData = {
        ...user.toJSON(),
        foto: `http://localhost:3000/img/users/${user.foto}`,
      };

      res.json(userData);
    } catch (error) {
      console.error("Error en profile:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },
};
