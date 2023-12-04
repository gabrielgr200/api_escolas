const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 6890;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const db = mysql.createConnection({
    host: 'containers-us-west-37.railway.app',
    user: 'root',
    password: '2F3UfdCTUbleiDyyydVt',
    database: 'escola',
    port: '5699'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conexão com o banco de dados realizado com sucesso');
});

app.get('/buscas', (req, res) => {
    const sql = 'Select * from escolas';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

app.get('/buscar-valores', (req, res) => {
    const sql = 'SELECT DISTINCT ano, rede, ensino FROM escolas';

    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao buscar valores' });
            return;
        }

        const anos = Array.from(new Set(result.map(row => row.ano)));
        const redes = Array.from(new Set(result.map(row => row.rede)));
        const ensinos = Array.from(new Set(result.map(row => row.ensino)));

        res.json({ anos, redes, ensinos });
    });
});


app.get('/buscar-escola', (req, res) => {
    const { ano, ensino, rede } = req.query;

    let sql = 'SELECT * FROM escolas WHERE 1=1';
    const params = [];

    if (ano) {
        sql += ' AND ano = ?';
        params.push(ano);
    }
    if (ensino) {
        sql += ' AND ensino = ?';
        params.push(ensino);
    }
    if (rede) {
        sql += ' AND rede = ?';
        params.push(rede);
    }

    db.query(sql, params, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})