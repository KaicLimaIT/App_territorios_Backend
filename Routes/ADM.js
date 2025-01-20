//Modulos
    const express = require("express");
    const router = express.Router();
    const Grupo = require('../Models/grupo');
    const Usuario = require('../Models/usuario');
    const bcrypt = require('bcryptjs');
    const { body, validationResult } = require('express-validator');

//Rotas
    //Menu
        router.get('/', (req,res) =>{
            res.send('Pagina inicial do adm');
        });

    //Buscar Grupos
        router.get('/BuscarGrupos', (req,res) => {
            Grupo.findAll({})
            .then((grupos) => {
                if(grupos.length > 0) {
                    res.status(200).send({
                        mensagem: 'Grupos buscados com sucesso!',
                        dados: grupos,
                    });
                } else {
                    res.status(404).send({
                        mensagem: 'Nenhum grupo encontrado!',
                    });
                }
            })
            .catch((error) => {
                res.status(500).send({
                    mensagem: 'Erro interno do servidor',
                    erro: error.message
                });
            });
        });
    //Cadastro de usuarios
        router.post('/CadUser',
            [
                body('nome').exists().notEmpty().withMessage('O campo nome é obrigatorio'),
                body('senha').exists().notEmpty().withMessage('O campo senha é obrigatorio'),
                body('grupo').exists().notEmpty().withMessage('O campo grupo é obrigatorio'),
                body('status').exists().notEmpty().isIn([
                    'Usuario', 'Servo', 'Ancião', 'ADM'
                ]).withMessage('O campo status é obrigatorio'),
            ],
            async (req,res) => {

            const erros = validationResult(req);

            if(!erros.isEmpty()){
                return res.status(400).json({ mensagem:erros.array() })
            }
            
            const { nome, senha, grupo, status } = req.body;

            if (!nome || !senha || !grupo || !status) {
                return res.status(400).send({
                    mensagem: "Todos os campos precisam estar preenchidos!" + nome + senha + grupo + status
                });
            }

            bcrypt.genSalt(8, (erro, salt) => {
                if (erro) {
                    return res.status(400).send({
                        mensagem: "Houve um erro durante o salt da senha"
                    });
                }

                bcrypt.hash(senha, salt, (erro, hash) => {
                    if (erro) {
                        return res.status(400).send({
                            mensagem: "Houve um erro durante o hasheamento da senha"
                        });
                    }

                    // Criação do usuário diretamente no banco com a senha já hasheada
                    Usuario.create({
                        NOME_USUARIO: nome,
                        SENHA_USUARIO: hash,
                        ID_GRUPO: grupo,
                        STATUS_USUARIO: status,
                    })
                    .then(() => {
                        res.status(201).send({
                            mensagem: "Usuário criado com sucesso!"
                        });
                    })
                    .catch((error) => {
                        res.status(500).send({
                            mensagem: "Erro ao cadastrar usuário!",
                            erro: error.message
                        });
                    });
                });
            });
        });

    //Distribuir Territorios
        router.get('/DestribuirTerritorio', (req,res) => {
            res.send('Página de Distribuição de Território');
        });

module.exports = router;
