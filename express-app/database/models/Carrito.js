module.exports = (sequelize, DataTypes) => {
    const Carrito = sequelize.define("Carrito", {
      users_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      modelos_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'carrito',
      timestamps: true
    });
  
    Carrito.associate = (models)=> {

      Carrito.belongsTo(models.User, {
        foreignKey: 'users_id',
        as: 'usuario'
      });
  
      Carrito.belongsTo(models.Modelo, {
        foreignKey: 'modelos_id',
        as: 'modelo'
      });
    };
  
    return Carrito;
  };