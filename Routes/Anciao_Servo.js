const express = require("express");
const router = express.Router();


router.get('/', (req,res) =>{
    res.send('Pagina inicial dos Anciaos e servos');
})



module.exports = router;