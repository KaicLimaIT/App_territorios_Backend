const express = require("express");
const router = express.Router();


router.get('/', (req,res) =>{
    res.send('Pagina inicial do usuario');
})



module.exports = router;