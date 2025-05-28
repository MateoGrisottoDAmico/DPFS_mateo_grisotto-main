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

  Categoria.associate = (models)  =>{
    
    Categoria.hasMany(models.Modelo, {
      foreignKey: 'categoria_id',
      as: 'categoria'
    });
  };

  return Categoria;
};
