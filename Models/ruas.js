const db = require('./DB');

const Ruas = db.sequelize.define("Ruas", {
    ID_RUA:{
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    NOME_RUA:{
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
},{
    tableName: "TB_RUAS",
    timestamps: true,
});

Ruas.associate = (models) => {
    Ruas.belongsToMany(models.Territorio, {
        through: models.TerritorioRuas,
        foreignKey: "ID_RUA"
    });
};

Ruas.sync({alter:true});

async function criarRuas() {
    try {
        const ArrayRuas = [
            { NOME_RUA: 'Rua Martins'},
            { NOME_RUA: 'Rua Francisco Alves'},
        ];

        const novasRuas = await Ruas.bulkCreate(ArrayRuas);

        console.log('Ruas criadas com sucesso:', novasRuas);
    } catch (erro) {
        console.error('Erro ao criar novas ruas:', erro.message);
    }
}

criarRuas();

module.exports = Ruas;