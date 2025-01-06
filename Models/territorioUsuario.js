const db = require('./DB');

const TerritorioUsuario = db.sequelize.define('TerritorioUsuario',{
        ID: {
            type: db.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    },{
        tableName: 'TB_TERRITORIO_USUARIO',
        timestamps: true,
    })

    TerritorioUsuario.associate = (models) => {
        TerritorioUsuario.belongsTo(models.Usuario, {
        foreignKey: 'ID_USUARIO',
        as: 'usuario',
        });
        TerritorioUsuario.belongsTo(models.Territorio, {
        foreignKey: 'ID_TERRITORIO',
        as: 'territorio',
        });
    };

module.exports = TerritorioUsuario;

// **AVISO IMPORTANTE**: O código abaixo sobrescreve a tabela, use apenas para testes!
// Não descomente sem necessidade, pois ele DESTRÓI a tabela e recria.
//TerritorioUsuario.sync({force:true});