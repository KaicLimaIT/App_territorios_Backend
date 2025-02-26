const db = require('./DB');

const Casas = db.sequelize.define('Casas',{
        ID_CASA: {
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
            allowNull: true,
        },

        ID_RUA :{
            type: db.Sequelize.INTEGER,
            allowNull: false,
            references:{
                model: 'TB_RUAS',
                key: 'ID_RUA',
            }
        }
    },{
        tableName: 'TB_CASAS',
        timestamps: true,

        indexes: [
            {
                unique:true,
                fields: ['ID_RUA', 'NUMERO_CASA']
            }
        ]
    });

    Casas.associate = (models) => {
        Casas.belongsTo(models.Ruas, {
        foreignKey: 'ID_RUA',
        as: 'Rua',
        });
    };





// **AVISO IMPORTANTE**: O código abaixo sobrescreve a tabela, use apenas para testes!
// Não descomente sem necessidade, pois ele DESTRÓI a tabela e recria.
//Casas.sync({alter:true});


/*
async function criarCasas() {
    try {
        const ArrayCasas = [
            { NUMERO_CASA: '01', STATUS_CASA: false, ID_RUA: 1 },
            { NUMERO_CASA: '01A', STATUS_CASA: false, ID_RUA: 1 },
            { NUMERO_CASA: '02', STATUS_CASA: false, ID_RUA: 1 },
            { NUMERO_CASA: '03', STATUS_CASA: false, ID_RUA: 1 },
            { NUMERO_CASA: '04', STATUS_CASA: false, ID_RUA: 1 },

            { NUMERO_CASA: '01', STATUS_CASA: false, ID_RUA: 2 },
            { NUMERO_CASA: '01A', STATUS_CASA: false, ID_RUA: 2 },
            { NUMERO_CASA: '02', STATUS_CASA: false, ID_RUA: 2 },
            { NUMERO_CASA: '03', STATUS_CASA: false, ID_RUA: 2 },
            { NUMERO_CASA: '04', STATUS_CASA: false, ID_RUA: 2 },
            { NUMERO_CASA: '05', STATUS_CASA: true, ID_RUA: 2 },

        ];

        const novasCasas = await Casas.bulkCreate(ArrayCasas);

        console.log('Ruas criadas com sucesso:', novasCasas);
    } catch (erro) {
        console.error('Erro ao criar novas ruas:', erro.message);
    }
}

criarCasas();
*/
module.exports = Casas;