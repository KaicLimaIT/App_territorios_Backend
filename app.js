    //Modulos
        const express = require('express');
        const app = express(); //Servidor
        const bodyParser = require('body-parser');
        const Irmao = require('./Models/usuario');
        const routeAdm = require('./Routes/ADM');
        const routeAnciaoServo = require('./Routes/Anciao_Servo');
        const routeUsuario = require('./Routes/Usuario');
        const usuario = require("./Models/usuario");
        



    //Config
        //BodyParser
            app.use(bodyParser.urlencoded({extended:false}));
            app.use(bodyParser.json());

    //Rotas
        app.get('/', (req,res) => {
            res.send('Menu');
        });

        app.post('/Login', (req, res) => {
            const { usuario, senha } = req.body;
        
            Irmao.findAll({
                where: {
                    NOME_USUARIO: usuario,
                    SENHA_USUARIO: senha
                }
            })
            .then((irmaos) => {
                if (irmaos.length > 0) {
                    res.status(200).send({ 
                        mensagem: 'Login realizado com sucesso!',
                        ID:'',
                    });
                } else {
                    res.status(401).send({ mensagem: 'Usuário ou senha inválidos!'});
                }
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send({ mensagem: 'Erro interno no servidor.' });
            });
        });
        
        app.use('/usuario', routeUsuario);

        app.use('/AnciaoServo', routeAnciaoServo)

        app.use('/ADM', routeAdm);

    //Outros
        const Port = 3000;

        app.listen(Port, () => {
            console.log(`Servidor rodando em http://localhost:${Port}`);
        });