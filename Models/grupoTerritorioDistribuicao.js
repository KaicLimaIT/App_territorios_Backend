const db = require('./DB');

const GrupoTerritorioDistribuicao = db.sequelize.define('GrupoTerritorioDistribuicao',{
    ID: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
},{
    tableName: 'TB_GRUPO_TERRITORIO_DISTRIBUICAO',
    timestamps: true,
})

GrupoTerritorioDistribuicao.associate = (models) => {
    GrupoTerritorioDistribuicao.belongsTo(models.GrupoTerritorio, {
    foreignKey: 'ID_GRUPO_TERRITORIO',
    as: 'grupoTerritorio',
    });
    GrupoTerritorioDistribuicao.belongsTo(models.Grupo, {
    foreignKey: 'ID_GRUPO',
    as: 'grupo',
    });
    GrupoTerritorioDistribuicao.belongsTo(models.Usuario, {
    foreignKey: 'ID_USUARIO',
    as: 'usuario',
    });
};

module.exports = GrupoTerritorioDistribuicao;

// **AVISO IMPORTANTE**: O código abaixo sobrescreve a tabela, use apenas para testes!
// Não descomente sem necessidade, pois ele DESTRÓI a tabela e recria.
//GrupoTerritorioDistribuicao.sync({force:true});