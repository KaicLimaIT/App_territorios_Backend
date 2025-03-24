    //Modulos
        const express = require('express'); //Express
        const app = express(); //Servidor
        const bodyParser = require('body-parser');// Pegar arquivos JSON
        const Usuario = require('./Models/usuario');//Model usuario
        const routeAdm = require('./Routes/ADM');//Rota
        const routeDirigente = require('./Routes/Dirigente');//Rota
        const routeUsuario = require('./Routes/Usuario');//Rota
        const bcrypt = require('bcryptjs');//Criptografar senhas
        const { body, validationResult } = require('express-validator');//Valida arquivos JSON



    //Config
        //BodyParser
            app.use(bodyParser.urlencoded({extended:false}));
            app.use(bodyParser.json());

    //Rotas
        //Rota Principal do servidor
            app.get('/', (req,res) => {
                res.send('Menu');
            });
        //Rota de Login
            app.post('/Login',
                [
                    body('usuario').notEmpty().exists().withMessage('O Campo usuario é obrigatorio').trim(),
                    body('senha').notEmpty().exists().withMessage('O Campo senha é obrigatorio').trim()
                ],
                async (req, res) => {

                const erros = validationResult(req); //Verifica erros

                if(!erros.isEmpty()){
                    return res.status(400).json({ mensagem:erros.array() })
                }

                const {usuario,senha} = req.body; //Pega JSON
                
                Usuario.findAll({
                    where: {
                        NOME_USUARIO: usuario,
                    }
                })
                .then((usuarios) => {
                    if (usuarios.length > 0) {
                        const usuarioBD = usuarios[0]; // Pega o primeiro resultado
                        const senhaUS = usuarioBD.SENHA_USUARIO;
                        const statusUS = usuarioBD.STATUS_USUARIO;
            
                        // Comparar a senha inserida com a hash do banco de dados
                        bcrypt.compare(senha, senhaUS, (erro, resultado) => {
                            if (erro) {
                                console.error('Erro ao comparar as senhas:', erro);
                                return res.status(500).send({ mensagem: 'Erro interno no servidor.' });
                            }
                            
                            if (resultado) {
                                // Senha correta
                                return res.status(200).send({ mensagem: 'Logado com sucesso!', status: statusUS});
                            } else {
                                // Senha incorreta
                                return res.status(401).send({ mensagem: 'Usuário ou senha inválidos!' });
                            }
                        });
                    } else {
                        // Usuário não encontrado
                        return res.status(401).send({ mensagem: 'Usuário ou senha inválidos!' });
                    }
                })
                .catch((error) => {
                    console.error('Erro na consulta ao banco de dados:', error);
                    res.status(500).send({ mensagem: 'Erro interno no servidor.' });
                });
            });
        
        app.use('/usuario', routeUsuario);

        app.use('/Digirente', routeDirigente)

        app.use('/ADM', routeAdm);










    //Inicialização do server
        const Port = process.env.SERVER_PORT || 3000;

        app.listen(Port, () => {
            console.log(`Servidor rodando em http://localhost:${Port}`);
        });