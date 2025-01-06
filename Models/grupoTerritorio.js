const db = require('./DB');

const GrupoTerritorio = db.sequelize.define('GrupoTerritorio', {
    ID: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'TB_GRUPO_TERRITORIO',
    timestamps: true,  // Adicionando timestamps
  });

module.exports = GrupoTerritorio;

// **AVISO IMPORTANTE**: O código abaixo sobrescreve a tabela, use apenas para testes!
// Não descomente sem necessidade, pois ele DESTRÓI a tabela e recria.
//GrupoTerritorio.sync({ force:true})