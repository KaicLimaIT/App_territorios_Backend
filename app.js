const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.send('Olá');
});

const Port = 3000;

app.listen(Port, () => {
    console.log(`Servidor rodando em http://localhost:${Port}`);
});