const db = require('./DB');
const bcrypt = require("bcryptjs");
require('dotenv');

// Definição do modelo de Usuario
const Usuario = db.sequelize.define('Usuario', {
    ID: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    NOME_USUARIO: {
        type: db.Sequelize.STRING(50),
        allowNull: false,
    },
    SENHA_USUARIO: {
        type: db.Sequelize.STRING(255), // Aumentei para suportar senhas mais longas
        allowNull: false,
    },
    STATUS_USUARIO: {
        type: db.Sequelize.STRING(7),
        defaultValue: 'USUARIO',
        allowNull: false,
    },
    ID_GRUPO: { // Certifique-se de ter esse campo na tabela
        type: db.Sequelize.INTEGER,
        allowNull: false,  // Pode ser NULL se o usuário não for associado a nenhum grupo
        references: {
            model: 'TB_GRUPO', // Tabela do grupo
            key: 'ID',         // Chave primária da tabela de grupos
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
