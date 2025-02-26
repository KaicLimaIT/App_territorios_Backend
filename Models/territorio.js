const db = require('./DB');

const Territorio = db.sequelize.define('Territorio', {
    ID_TERRITORIO: {
            type: db.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
    },

    LADO_TERRITORIO: {
        type: db.Sequelize.STRING(2),
        allowNull: false,
    },

    STATUS_TERRITORIO:{
        type: db.Sequelize.STRING(12),
        allowNull: false,
        defaultValue: "Devolvido",
    },

    GRUPO_TERRITORIO: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: require("./grupoTerritorio"), // Importa o modelo Sequelize corretamente
            key: "ID",
        },
    },
    
},{
    tableName: "TB_TERRITORIO",
    timestamps: true,
});

Territorio.associate = (models) => {
    Territorio.belongsTo(models.GrupoTerritorio, {
        foreignKey: "GRUPO_TERRITORIO",
        as: "grupo",
    });
};


Territorio.sync({ alter: true });

/*
async function criarTerritorios() {
    try {
        const territorios = [
            { LADO_TERRITORIO: 'L1', GRUPO_TERRITORIO: 1 },
            { LADO_TERRITORIO: 'L2', GRUPO_TERRITORIO: 1 },
            { LADO_TERRITORIO: 'L3', GRUPO_TERRITORIO: 1 },
            { LADO_TERRITORIO: 'L4', GRUPO_TERRITORIO: 1 },
        ];

        const novosTerritorios = await Territorio.bulkCreate(territorios);

        console.log('Territórios criados com sucesso:', novosTerritorios);
    } catch (erro) {
        console.error('Erro ao criar territórios:', erro.message);
    }
}

criarTerritorios();
*/

module.exports = Territorio;
