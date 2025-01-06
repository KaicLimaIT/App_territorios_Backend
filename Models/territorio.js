const db = require('./DB');

const Territorio = db.sequelize.define('Territorio',{
        ID: {
            type: db.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        LADO_TERRITORIO: {
            type: db.Sequelize.STRING(2),
            unique: true,
            allowNull: false,
        },
    },{
        tableName: 'TB_TERRITORIO',
        timestamps: true,
    });


    Territorio.associate = (models) => {
        Territorio.belongsTo(models.GrupoTerritorio, {
        foreignKey: 'ID_GRUPO_TERRITORIO',
        as: 'grupoTerritorio',
        });
    };

module.exports = Territorio;

// **AVISO IMPORTANTE**: O código abaixo sobrescreve a tabela, use apenas para testes!
// Não descomente sem necessidade, pois ele DESTRÓI a tabela e recria.
//Territorio.sync({force:true});