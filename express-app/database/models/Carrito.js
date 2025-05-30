module.exports = (sequelize, DataTypes) => {
  const Carrito = sequelize.define("Carrito", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    modelo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'modelos',
        key: 'id'
      }
    }
  }, {
    tableName: 'carrito',
    timestamps: true
  });

  Carrito.associate = (models) => {
    Carrito.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'usuario'
    });

    Carrito.belongsTo(models.Modelo, {
      foreignKey: 'modelo_id',
      as: 'modelo'
    });
  };

  return Carrito;
};
