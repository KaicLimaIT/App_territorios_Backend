const db = require('./DB');

const Dupla = db.sequelize.define('Dupla', {
    ID_DUPLA: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    ID_USUARIO_1: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_USUARIO',
            key: 'ID_USUARIO',
        }
    },

    ID_USUARIO_2: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_USUARIO',
            key: 'ID_USUARIO',
        }
    }
},{
    tableName:'TB_DUPLA',
    timestamps: true,
})

Dupla.associate = (models) => {
    Dupla.belongsTo(models.Usuario, {
        foreignKey: 'ID_USUARIO_1',
        as: 'usuario1', // Alias para o primeiro usuário da dupla
    });

    Dupla.belongsTo(models.Usuario, {
        foreignKey: 'ID_USUARIO_2',
        as: 'usuario2', // Alias para o segundo usuário da dupla
    });
};

Dupla.sync({force: true})

module.exports = Dupla;