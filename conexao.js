require('dotenv').config();

const Sequelize = require('sequelize');


const sequelize = new Sequelize(
    process.env.DB_NAME, //Procedente do .env
    process.env.DB_USER, //Procedente do .env
    process.env.DB_PASSWORD,{
    host:"localhost",
    dialect:'mysql'
})


sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso!");
}).catch(function(erro){
    console.log("Falha ao se conectar: " + erro)
});