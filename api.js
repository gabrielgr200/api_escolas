const express = require('express');
const mysql =  require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 6890;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Skyfall20#?',
    database: 'estudos',
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conexão com o banco de dados realizado com sucesso');
});

app.get('/buscas', (req, res) => {
    const sql = 'Select * from escola';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

app.get('/buscar/id', (req, res) => {
    const sql = 'Select * from escola ';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})