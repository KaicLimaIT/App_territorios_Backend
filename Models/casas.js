const db = require('./DB');

const Casas = db.sequelize.define('Casas',{
        ID: {
            type: db.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        NUMERO_CASA: {
            type: db.Sequelize.STRING(10),
        },
        STATUS_CASA: {
            type: db.Sequelize.BOOLEAN,
            defaultValue: false,
        },
        OBSERVACAO_CASA: {
            type: db.Sequelize.STRING(50),
        },
    },{
        tableName: 'TB_CASAS',
        timestamps: true,
    });

    Casas.associate = (models) => {
        Casas.belongsTo(models.Territorio, {
        foreignKey: 'ID_TERRITORIO',
        as: 'territorio',
        });
    };

module.exports = Casas;

// **AVISO IMPORTANTE**: O código abaixo sobrescreve a tabela, use apenas para testes!
// Não descomente sem necessidade, pois ele DESTRÓI a tabela e recria.
//Casas.sync({force:true})