// Importação das dependências
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Configuração do app Express
const app = express();
app.use(bodyParser.json());

// Configuração do banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Altere conforme seu usuário do MySQL
    password: '', // Adicione sua senha
    database: 'estoque'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar no banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

// Criar tabela produtos
const createTable = `CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    fornecedor VARCHAR(255),
    endereco_fornecedor VARCHAR(255),
    quantidade INT,
    endereco VARCHAR(255),
    preco_unitario FLOAT
);`;

db.query(createTable, err => {
    if (err) console.error('Erro ao criar tabela:', err);
});

// Inserção de dados iniciais
const seedData = `INSERT INTO produtos (nome, fornecedor, endereco_fornecedor, quantidade, endereco, preco_unitario) VALUES 
    ('Produto A', 'Fornecedor X', 'Rua 1', 10, 'Armazém 1', 25.50),
    ('Produto B', 'Fornecedor Y', 'Rua 2', 20, 'Armazém 2', 15.75),
    ('Produto C', 'Fornecedor Z', 'Rua 3', 15, 'Armazém 3', 30.00),
    ('Produto D', 'Fornecedor W', 'Rua 4', 50, 'Armazém 4', 10.99)
    ON DUPLICATE KEY UPDATE nome=VALUES(nome);`;

db.query(seedData, err => {
    if (err) console.error('Erro ao popular tabela:', err);
});

// Rotas CRUD
app.get('/produtos', (req, res) => {
    db.query('SELECT * FROM produtos', (err, results) => {
        if (err) return res.status(500).send('Erro ao buscar produtos.');
        res.status(200).json(results);
    });
});

app.post('/produtos', (req, res) => {
    const { nome, fornecedor, endereco_fornecedor, quantidade, endereco, preco_unitario } = req.body;
    const sql = 'INSERT INTO produtos (nome, fornecedor, endereco_fornecedor, quantidade, endereco, preco_unitario) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [nome, fornecedor, endereco_fornecedor, quantidade, endereco, preco_unitario], err => {
        if (err) return res.status(500).send('Erro ao adicionar produto.');
        res.status(200).send('Produto adicionado com sucesso.');
    });
});

app.put('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, fornecedor, endereco_fornecedor, quantidade, endereco, preco_unitario } = req.body;
    const sql = 'UPDATE produtos SET nome=?, fornecedor=?, endereco_fornecedor=?, quantidade=?, endereco=?, preco_unitario=? WHERE id=?';
    db.query(sql, [nome, fornecedor, endereco_fornecedor, quantidade, endereco, preco_unitario, id], (err, results) => {
        if (err) return res.status(500).send('Erro ao atualizar produto.');
        if (results.affectedRows === 0) return res.status(404).send('Produto não encontrado.');
        res.status(200).send('Produto atualizado com sucesso.');
    });
});

app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM produtos WHERE id=?';
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send('Erro ao remover produto.');
        if (results.affectedRows === 0) return res.status(404).send('Produto não encontrado.');
        res.status(200).send('Produto removido com sucesso.');
    });
});

// Tratamento de erros para métodos não implementados
app.use((req, res) => {
    res.status(501).send('Método não implementado.');
});

// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
