module.exports = (sequelize, DataTypes) => {
  const Condicion = sequelize.define("Condicion", {
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
    tableName: 'condiciones',
    timestamps: false
  });

  Condicion.associate = (models) =>{
    
    Condicion.hasMany(models.Modelo, {
      foreignKey: 'condicion_id',
      as: 'condicion'
    });
  };

  return Condicion;
};
