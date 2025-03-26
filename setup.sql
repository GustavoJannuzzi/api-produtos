CREATE DATABASE estoque;
USE estoque;

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    fornecedor VARCHAR(255),
    endereco_fornecedor VARCHAR(255),
    quantidade INT,
    endereco VARCHAR(255),
    preco_unitario FLOAT
);
