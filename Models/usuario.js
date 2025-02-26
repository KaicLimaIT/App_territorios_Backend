const db = require('./DB');
//const bcrypt = require("bcryptjs");
require('dotenv');

// Definição do modelo de Usuario
const Usuario = db.sequelize.define('Usuario', {
    ID_USUARIO: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    NOME_USUARIO: {
        type: db.Sequelize.STRING(50),
        allowNull: false,
    },
    SENHA_USUARIO: {
        type: db.Sequelize.STRING(255),
        allowNull: false,
    },
    STATUS_USUARIO: {
        type: db.Sequelize.STRING(7),
        defaultValue: 'USUARIO',
        allowNull: false,
    },
    ID_GRUPO: { 
        type: db.Sequelize.INTEGER,
        allowNull: false, 
        references: {
            model: 'TB_GRUPO', 
            key: 'ID',         
        },
    },
}, {
    tableName: 'TB_USUARIO',
    timestamps: true,
});

// Definição da associação
Usuario.associate = (models) => {
    Usuario.belongsTo(models.Grupo, {
        foreignKey: 'ID_GRUPO',
        as: 'grupo',
    });
};


// Exporta o modelo
module.exports = Usuario;





// **AVISO IMPORTANTE**: O código abaixo sobrescreve a tabela, use apenas para testes!
//Usuario.sync({ force: true });

/*
async function criarAdministrador() {
    try {
        const adm = await Usuario.create({
            NOME_USUARIO: 'Kaic Lima',
            SENHA_USUARIO: process.env.DEFAULT_PASSWORD,
            STATUS_USUARIO: 'ADM',
            ID_GRUPO: 2, // Associe ao ID de um grupo existente
        });
        console.log('Administrador criado com sucesso:', adm);
    } catch (erro) {
        console.log('Erro ao criar ADM:', erro.message);
    }
}

// Chama a função
criarAdministrador();
*/
