module.exports = (sequelize, DataTypes) => {
  const CondicionModelo = sequelize.define("CondicionModelo", {
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

  CondicionModelo.associate = (models) =>{
    
    CondicionModelo.hasMany(models.Modelo, {
      foreignKey: 'condicion_id',
      as: 'condicion'
    });
  };

  return CondicionModelo;
};
