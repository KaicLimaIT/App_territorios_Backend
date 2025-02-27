const db = require('./DB');

const TerritorioCasas = db.sequelize.define("TerritorioCasas", {
    ID_TERRITORIO_CASAS: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    ID_TERRITORIO: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "TB_TERRITORIO",
            key: "ID_TERRITORIO",
        }
    },

    ID_CASA: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "TB_CASAS",
            key:"ID_CASA",
        }
    }
}, {
    tableName: "TB_TERRITORIO_CASAS",
    timestamps: true,
});

module.exports = TerritorioCasas;

TerritorioCasas.sync({force: true});