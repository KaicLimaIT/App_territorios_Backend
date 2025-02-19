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

/*
async function InserirNaTabela() {
  try {
    for (let i = 0; i < 18; i++) {
      await GrupoTerritorio.create({});
    }
    console.log('Registros inseridos com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir registros:', error);
  }
}

InserirNaTabela();
*/  