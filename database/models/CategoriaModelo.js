module.exports = (sequelize, DataTypes) => {
    const CategoriaModelo = sequelize.define('CategoriaModelo', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'categoria_modelo',
        timestamps: false
    });

    CategoriaModelo.associate = function(models) {
        CategoriaModelo.hasMany(models.Modelo, {
            foreignKey: 'categoria_id',
            as: 'modelos'
        });
    };

    return CategoriaModelo;
};