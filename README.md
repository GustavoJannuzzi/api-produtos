# API CRUD de Produtos (Node.js + MySQL)

## Sobre
Esta API foi desenvolvida em **Node.js** utilizando **Express** e **MySQL** 

## Stacks Escolhidas
- Node.js
- Express
- MySQL
- cURL (para testes)

## 📂 Estrutura do Projeto
```
📁 api-produtos
│-- 📄 server.js  # Código principal da API
│-- 📄 banco_de_dados.sql  # Script para criação do banco de dados
│-- 📄 testes_curl.txt  # Comandos cURL para testar a API
```


##  Rotas da API

| Método  | Rota               | Descrição                      |
|---------|--------------------|--------------------------------|
| GET     | `/produtos`        | Retorna todos os produtos     |
| POST    | `/produtos`        | Adiciona um novo produto      |
| PUT     | `/produtos/:id`    | Atualiza um produto por ID    |
| DELETE  | `/produtos/:id`    | Remove um produto por ID      |

## 🛠️ Tratamento de Erros
- **200**: Operação bem-sucedida
- **404**: Produto não encontrado
- **500**: Erro interno do servidor
- **501**: Método não implementado
- **502**: Erro externo (não usado nesta API)

## Autor
Desenvolvido por **Gustavo Jannuzzi R. Siebel**. 

