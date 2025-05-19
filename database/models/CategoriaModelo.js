module.exports = (sequelize, DataTypes) => {
  const CategoriaModelo = sequelize.define("CategoriaModelo", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'categorias',
    timestamps: false
  });

  CategoriaModelo.associate = (models)  =>{
    
    CategoriaModelo.hasMany(models.Modelo, {
      foreignKey: 'categoria_id',
      as: 'categoria'
    });
  };

  return CategoriaModelo;
};
