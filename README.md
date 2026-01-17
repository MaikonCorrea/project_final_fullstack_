# Projeto Final Fullstack - Plataforma de Pesquisa de Notícias Globais

Este projeto final foi desenvolvido como parte do bootcamp, onde adquiri conhecimentos em várias tecnologias, que incluem HTML, CSS, JavaScript, Node.js, React.js/vite, Express.js, MongoDB. Durante o curso, aprendi sobre versionamento utilizando Git e GitHub, além de boas práticas de organização de código.

Esta plataforma permite aos usuários realizar pesquisas de notícias globais. Os usuários podem cadastrar-se com e-mail, senha e nome, e posteriormente fazer login para salvar artigos de seu interesse em seus perfis, podendo também excluí-los quando desejar.

### Visite a página do projeto [aqui](https://vercelfrontend-maikoncorreas-projects.vercel.app/).

## Tecnologias Utilizadas

- **Frontend**: React.js/vite
- **Backend**: Node.js
- **Banco de Dados**: MongoDB Atlas

- **Scripts**:
  - `lint`: Executa o ESLint para correção de padrões de codificação.
  - `dev`: Inicia o servidor Node.js.

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
  - `dev`: Inicia o servidor de desenvolvimento.
  - `build`: Compila o projeto para produção.

- **Variável de Ambiente**:
  - `VITE_BASE_URL_MAIN_API`: Crie um arquivo `.env` que terá uma variável com o valor `http://localhost:3000` para desenvolvimento, caso você faça o deploy no Vercel, pegue a URL criada após completar o deploy.

## Executando o Projeto

1. Clone este repositório e navegue até a pasta do projeto.
2. Instale as dependências do backend e do frontend utilizando `npm install` em ambos os diretórios.
3. Certifique-se de ter uma instância do MongoDB em execução, localmente ou no MongoDB Atlas.
4. Inicie o servidor backend com `npm run dev`.
5. Inicie o servidor frontend com `npm run dev`.
6. Acesse o projeto em seu navegador.

