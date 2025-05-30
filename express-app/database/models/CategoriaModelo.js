'use strict';

module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define("Categoria", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    tableName: 'categorias',
    timestamps: true 
  });

  Categoria.associate = (models) => {
    Categoria.hasMany(models.Modelo, {
      foreignKey: 'categoria_id',
      as: 'modelos' 
    });
  };

  return Categoria;
};
