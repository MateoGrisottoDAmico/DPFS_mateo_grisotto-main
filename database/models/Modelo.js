module.exports = (sequelize, DataTypes) => {
    const Modelo = sequelize.define("Modelo", {
      titulo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      marca: {
        type: DataTypes.STRING,
        allowNull: false
      },
      kilometraje: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
          min: 0
        }
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false
      },
      combustible: {
        type: DataTypes.STRING,
        allowNull: false
      },
      transmision: {
        type: DataTypes.STRING,
        allowNull: false
      },
      precio: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      stock: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: true
      },
      categoria_id: {
        type: DataTypes.INTEGER, references:{model:"categorias",key:"id"},
        allowNull: false
      },
      condicion_id: {
        type: DataTypes.INTEGER, references:{model:"condiciones",key:"id"},
        allowNull: false
      }
    }, {
      tableName: 'modelos',
      timestamps: false
    });
  
    Modelo.associate = (models)=> {
      
        Modelo.belongsTo(models.Categoria, {
        foreignKey: 'categoria_id',
        as: 'categoria'
      });
  
      Modelo.belongsTo(models.Condicion, {
        foreignKey: 'condicion_id',
        as: 'condicion'
      });
  
      Modelo.belongsToMany(models.User, {
        through: 'carrito',
        foreignKey: 'modelos_id',
        otherKey: 'users_id',
        as: 'usuarios'
      });
    };
  
    return Modelo;
  };