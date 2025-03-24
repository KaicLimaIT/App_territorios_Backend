//Modulos
    const express = require("express");
    const router = express.Router();
    const bcrypt = require('bcryptjs');
    const { body, validationResult } = require('express-validator');

    // Models
        const Grupo = require('../Models/grupo');
        const Usuario = require('../Models/usuario');
        const GrupoTerritorio = require('../Models/grupoTerritorio');
        const Ruas = require('../Models/ruas');
  


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
                        res.status(200).send({
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



    //Buscar Grupo de territorios
        router.post('/BuscarGrupoTerritorios', (req,res) =>{
            GrupoTerritorio.findAll({})
            .then((grupos) => {
                if(grupos.length > 0)
                    {
                        res.status(201).send({
                            mensagem: 'Grupos buscados com sucesso!',
                            dados: grupos,
                        })
                    }
                else{
                    res.status(404).send({
                        mensagem: 'Nenhum grupo encontrado!'
                    })
                }
            })
            .catch((error) =>{
                res.status(500).send({
                    mensagem: 'Erro do servidor!'
                })
            })
        });

    //Adicionar Territorios
        router.post('/AdicionarTerritorio',
            [
                body('grupoTerritorio').exists().notEmpty().isInt().withMessage('O campo Grupo Territorio é obrigatório!'),
                body('').exists().notEmpty(),
            ],
            (req, res) => {
            
        });

    // Adicionar Ruas
        router.post('/AdicionarRuas', [
            body('nomeRua').exists().notEmpty().isString().withMessage('O campo Rua é obrigatorio')
        ],
        async (req,res) => {
            const erros = validationResult(req);

            if(!erros.isEmpty()) {
                return res.status(400).json({ mensagem:erros.array() })
            }

            const { nomeRua } = req.body;

            Ruas.create({
                NOME_RUA: nomeRua,
            }).then(() => {
                res.status(201).send({
                    mensagem: "Rua criado com sucesso!"
                });
            })
            .catch((error) => {
                res.status(500).send({
                    mensagem: "Erro ao cadastrar Rua!",
                    erro: error.message
                });
            });
        })

module.exports = router;
