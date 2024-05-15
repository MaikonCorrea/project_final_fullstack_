# Projeto Final Fullstack - Plataforma de Pesquisa de Notícias Globais

Este projeto final foi desenvolvido como parte do bootcamp, onde adquiri conhecimentos em várias tecnologias, incluindo HTML, CSS, JavaScript, Node.js, React.js e MongoDB. Durante o curso, aprendi sobre versionamento utilizando Git e GitHub, além de boas práticas de organização de código, como a metodologia BEM.

Esta plataforma permite aos usuários realizar pesquisas de notícias globais em várias línguas. Os usuários podem se cadastrar com e-mail, senha e nome, e posteriormente fazer login para salvar artigos de seu interesse em seus perfis, podendo também excluí-los quando desejarem.

### Visite a página do projeto [aqui](https://vercelfrontend-maikoncorreas-projects.vercel.app/).

## Tecnologias Utilizadas

- **Frontend**: React.js
- **Backend**: Node.js (implantado no Render)
- **Banco de Dados**: MongoDB Atlas (ou MongoDB local)

## Pré-requisitos

- **Node.js**: Certifique-se de ter o Node.js instalado localmente. Você pode baixá-lo em [nodejs.org](https://nodejs.org).
- **MongoDB**: Você pode optar por usar o MongoDB localmente ou no MongoDB Atlas. Se você escolher o MongoDB local, certifique-se de tê-lo instalado. Você pode baixá-lo em [mongodb.com](https://www.mongodb.com/try/download/community).
- **API de Notícias**: Você precisará de uma chave de API de notícias de terceiros. Recomendamos a [News API](https://newsapi.org/).

## Configurações

### Backend

- **Dependências**:
  - bcrypt
  - bcryptjs
  - body-parser
  - celebrate
  - cors
  - dotenv
  - eslint-config-airbnb-base
  - express
  - express-winston
  - joi
  - jsonwebtoken
  - mongoose
  - validator
  - winston

- **Scripts**:
  - `lint`: Executa o ESLint para correção de padrões de codificação.
  - `start`: Inicia o servidor Node.js.

- **Variáveis de Ambiente**:
  - `TOKEN_API`: Esta variável é configurada em um arquivo `.env`. Seu conteúdo é um token gerado pela API de terceiros, que cada usuário recebe para uso no desenvolvimento de projetos usando a API.
  - `JWT_SECRET`: Gere uma chave secreta de JWT (JSON Web Token) usando o seguinte comando no bash ou shell: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"` e coloque-a no arquivo `.env`.
  - `PASSWORD_MONGODB`: Ao criar uma conta no MongoDB Atlas, você fará o cadastro de uma senha de acesso. Coloque essa senha na variável de ambiente `PASSWORD_MONGODB` no arquivo `.env`.

### Frontend

- **Dependências**:
  - react
  - react-dom
  - react-router-dom
  - react-scripts

- **Scripts**:
  - `start`: Inicia o servidor de desenvolvimento.
  - `build`: Compila o projeto para produção.

- **Variável de Ambiente**:
  - `REACT_APP_BASE_URL_MAIN_API`: Crie um arquivo `.env` que terá uma variável com o valor `http://localhost:3000` para desenvolvimento, caso você faça o deploy no Vercel, pegue a URL criada após completar o deploy.

## Executando o Projeto

1. Crie um novo projeto React utilizando o comando `npx create-react-app nome-do-seu-projeto`.
2. Clone este repositório e navegue até a pasta do projeto.
3. Instale as dependências do backend e do frontend utilizando `npm install` em ambos os diretórios.
4. Certifique-se de ter uma instância do MongoDB em execução, localmente ou no MongoDB Atlas.
5. Inicie o servidor backend com `npm start`.
6. Inicie o servidor frontend com `npm start`.
7. Acesse o projeto em seu navegador.

## Implementação Local vs. Deployment

- **Local**: Para implementar localmente, você pode usar o MongoDB local e configurar as variáveis de ambiente necessárias. Siga as instruções acima.
- **Deployment**: Para implantação em produção/teste online, recomendamos usar o MongoDB Atlas para o banco de dados, Render para o backend e Vercel para o frontend.
