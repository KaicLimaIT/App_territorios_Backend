require('dotenv').config(); //.env

    //Config
        //Config Banco de dados
            const Sequelize = require('sequelize');
            const sequelize = new Sequelize(
                process.env.DB_NAME, //Procedente do .env
                process.env.DB_USER, //Procedente do .env
                process.env.DB_PASSWORD,{
                host:process.env.DB_HOST,
                dialect:'mysql',
                timezone:'-03:00',
            })

sequelize.authenticate()
    .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso.'))
    .catch((err) => console.error('Erro ao conectar ao banco:', err));


module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}