const express = require("express");
const router = express.Router();


router.get('/', (req,res) =>{
    res.send('Pagina inicial do adm');
})

router.get('/DestribuirTerritorio', (req,res) =>{
    res.send('Pagina')
})

module.exports = router;