module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      telefono: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      foto: {
        type: DataTypes.STRING,
        allowNull: true
      },
      rol: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
      }
    }, {
      tableName: 'users',
      timestamps: true
    });
  
    User.associate = function(models) {
      User.belongsToMany(models.Modelo, {
        through: 'carrito',
        foreignKey: 'users_id',
        otherKey: 'modelos_id',
        as: 'modelos'
      });
    };
  
    return User;
  };