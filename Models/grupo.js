const db = require('./DB');

const Grupo = db.sequelize.define('Grupo', {

        ID: {
            type: db.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        NOME_GRUPO: {
            type: db.Sequelize.STRING(9),
            allowNull: false,
        },
    },{
        tableName: 'TB_GRUPO',
        timestamps: true,
    });

    async function adicionarGrupos() {
        try {
          const grupos = await Grupo.bulkCreate([
            { NOME_GRUPO: 'Antioquia' },
            { NOME_GRUPO: 'Bereia' },
            { NOME_GRUPO: 'Corinto' },
            { NOME_GRUPO: 'Jerusalém' },
            { NOME_GRUPO: 'Judá' },
            { NOME_GRUPO: 'Roma' }
          ]);
      
          console.log('Grupos adicionados com sucesso:', grupos);
        } catch (error) {
          console.error('Erro ao adicionar grupos:', error);
        }
      }

      adicionarGrupos();

module.exports = Grupo;



// **AVISO IMPORTANTE**: O código abaixo sobrescreve a tabela, use apenas para testes!
// Não descomente sem necessidade, pois ele DESTRÓI a tabela e recria.
//Grupo.sync({ force: true });