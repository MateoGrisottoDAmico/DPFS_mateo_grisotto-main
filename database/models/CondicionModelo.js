module.exports = (sequelize, DataTypes) => {
    const CondicionModelo = sequelize.define('CondicionModelo', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'condiciones_modelo',
        timestamps: false
    });

    CondicionModelo.associate = (models) => {
        CondicionModelo.hasMany(models.Modelo, {
            foreignKey: 'condicion_id',
            as: 'modelos'
        });
    };

    return CondicionModelo;
};
