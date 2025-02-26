const db = require("./DB");

const GrupoTerritorio = db.sequelize.define("GrupoTerritorio", {
    ID: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    GRUPO_TERRITORIO: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
},{
    tableName: "TB_GRUPO_TERRITORIO",
    timestamps: true,
});

/*
async function adicionarGrupos() {
    try {
        for (let i = 1; i <= 18; i++) {
            await GrupoTerritorio.create({ GRUPO_TERRITORIO: i });
        }   
        console.log("18 grupos inseridos com sucesso!");
    } catch (error) {
        console.error("Erro ao inserir grupos:", error);
    }
}

adicionarGrupos();

*/
module.exports = GrupoTerritorio;

