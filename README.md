# <p align = "center"> Projeto #20 - RepoProvas </p>

<p align="center">
   <img src="./images/Logo.png"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-PauloCruz06-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/PauloCruz06/projeto20-repoprovas?color=4dae71&style=flat-square" />
</p>


##  :clipboard: Descrição

O projeto RepoProvas simula um sistema de compartilhamento de provas entre os estudantes! Nessa API é feito um sistema onde poderá ser armazenada e consultada, provas de acordo com a disciplina.

***

## :computer:	 Tecnologias e Conceitos

- REST APIs
- JWTs & refresh tokens
- Node.js
- TypeScript
- SQL with PostgreSQL
- Jest & Supertest

***
 ## :rocket: Rotas

 ## Rota <span style="color:orange"> **POST** </span>/signup

Rota não autenticada. Nela é possível cadastrar um novo usuário

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "email": "email do usuário", //string
  "password": "senha do usuário (minímo de 6 caracteres)", //string
  "confirmPassword": "confirmação de senha" //string
}
```

 ## Rota <span style="color:orange"> **POST** </span>/signin

Rota não autenticada. Permite o usuário entrar na sua conta caso tenha se registrado, a requisição é respondida com um objeto que contém o token do usuário para usar em rotas autenticadas.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "email": "email do usuário", //string
  "password": "senha do usuário (minímo de 6 caracteres)" //string
}
```

 ## Rota <span style="color:orange"> **POST** </span>/register/tests

Essa é uma rota autenticada com header http do tipo "Authorization". Permite o usuário cadastrar novas provas.

O Body da requisição deve ser feito no seguinte formato:

```json
{
   "name": "nome da prova", // string
   "pdfUrl": "link do pdf da prova", // string
   "categoryName": "nome da categoria da prova (categoria previamente cadastrada)", // string
   "disciplineName": "nome da disciplina (disciplina previamente cadastrada)", // string
   "teacherName": "nome do instrutor(a) (instrutor previamente cadastrado)" // string
}
```


## Rota <span style="color:green"> **GET** </span>/tests/disciplines

Essa é uma rota autenticada com header http do tipo "Authorization". Retorna um objeto contendo todas as provas com o nome do instrutor organizadas por periodo e disciplina.

O Body da requisição não deve ser enviado.

## Rota <span style="color:green"> **GET** </span>/tests/teachers

Essa é uma rota autenticada com header http do tipo "Authorization". Retorna um objeto contendo todas as provas com o nome da disciplina organizadas por instrutor.

O Body da requisição não deve ser enviado.
***

## 🏁 Rodando a aplicação

Este projeto foi inicializado usando a última versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente. Também foi utilizado [Prisma ORM](https://github.com/prisma/prisma) para modelagem e manipulação de banco de dados.

Para essa API são feitos testes de integração usando [Jest](https://github.com/facebook/jest) e [SuperTest](https://github.com/visionmedia/supertest).

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/PauloCruz06/projeto20-repoprovas.git
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Finalizado o processo, é só inicializar o servidor
```
npm start
```

Também é possível rodar testes automatizados para as endpoints com o comando:
```
npm test
```

:grey_exclamation:[template usado nesse readme](https://gist.github.com/luanalessa/7f98467a5ed62d00dcbde67d4556a1e4#file-readme-md) :)