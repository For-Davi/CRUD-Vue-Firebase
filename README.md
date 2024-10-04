# CRUD - Vue & Firebase

Este projeto é um sistema de gerenciamento de tarefas desenvolvido com **Vue 3 com Vite** e **Firebase**. Ele permite que os usuários registrem-se, façam login, redefinam suas senhas e, após autenticados, possam gerenciar suas tarefas através de um sistema de **cards**.

## Funcionalidades Principais

- **Registro, Login e Redefinição de Senha**: O usuário pode se registrar, fazer login e redefinir sua senha diretamente no sistema.
- **Atualização de Perfil**: Após autenticado, o usuário pode atualizar seu nome e foto de perfil, desde que informe sua senha atual para garantir a segurança.
- **Gerenciamento de Tarefas**:
  - **Criar**: O usuário pode criar novos cards de tarefas, inserindo título e descrição.
  - **Listar**: Os cards são listados no `/dashboard`, onde os cards **pendentes** aparecem primeiro, seguidos pelos **finalizados**.
  - **Atualizar**: O usuário pode editar o título e a descrição dos cards já criados.
  - **Deletar**: O usuário pode deletar cards de tarefas.
  - **Atualizar Status**: O status da tarefa pode ser alterado para "finalizado" ao clicar no botão verde presente no card. Cards finalizados mostram um botão amarelo que, quando clicado, reverte o status da tarefa para "pendente".

## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Vue 3**: Framework JavaScript para a construção de interfaces interativas.
- **Pinia**: Biblioteca de gerenciamento de estado.
- **Sass**: Pré-processador CSS para facilitar o gerenciamento de estilos.
- **Tailwind CSS**: Framework CSS utilitário que facilita o desenvolvimento responsivo.
- **Element UI**: Um framework de componentes baseados em Vue.js.
- **TypeScript**: Superconjunto de JavaScript que adiciona tipagem estática ao projeto.
- **ESLint**: Ferramenta de linting para JavaScript e outras linguagens que ajuda a identificar e corrigir problemas no código, seguindo regras de estilo e boas práticas.
- **Prettier**:Um formatador de código opinativo que garante um estilo consistente ao reformatar o código automaticamente.
- **Firebase**:
  - **Firebase Auth**: Para autenticação de usuários.
  - **Firestore**: Banco de dados NoSQL utilizado para armazenar os cards de tarefas.
  - **Firebase Storage**: Utilizado para armazenar as fotos de perfil dos usuários.
  - **Firebase Hosting**: O aplicativo está hospedado no Firebase Hosting para fácil acesso e distribuição.

## Configuração do arquivo .env

Para rodar o projeto localmente, é necessário criar um arquivo `.env` na raiz do projeto e definir as seguintes variáveis de ambiente com as credenciais fornecidas pelo seu projeto do Firebase no console:

```bash
VITE_FIREBASE_API_KEY=SuaApiKey
VITE_FIREBASE_AUTH_DOMAIN=SeuAuthDomain
VITE_FIREBASE_PROJECT_ID=SeuProjectId
VITE_FIREBASE_STORAGE_BUCKET=SeuStorageBucket
VITE_FIREBASE_MESSAGING_SENDER_ID=SeuMessagingSenderId
VITE_FIREBASE_APP_ID=SeuAppId
VITE_FIREBASE_MEASUREMENT_ID=SeuMeasurementId
```

Esses valores devem ser exatamente iguais aos fornecidos no seu projeto do Firebase. Certifique-se de inserir as credenciais corretas para que o projeto funcione adequadamente.

## Criação de Conta e Redefinição de Senha

### Requisitos para Criação de Conta

Ao criar uma nova conta no sistema **The Card**, o usuário deve atender aos seguintes requisitos:

1. **Nome**:

   - O campo de nome deve conter mais de 2 caracteres.
   - O campo não pode estar em branco.

2. **E-mail**:

   - O e-mail deve ser válido.
   - O campo não pode estar em branco.

3. **Senha**:
   - A senha deve ter mais de 7 caracteres.
   - O campo de senha e o campo de confirmação de senha devem ser idênticos.
   - Ambos os campos não podem estar em branco.

Se alguma dessas regras não for cumprida, o formulário não será enviado até que o erro seja corrigido.

### Redefinição de Senha

Caso o usuário tenha esquecido sua senha, ele pode redefini-la seguindo os passos abaixo:

1. Clique em **"Esqueceu a senha?"**
2. Insira o e-mail registrado no campo solicitado.
3. Um e-mail de redefinição de senha será enviado para o endereço fornecido.
4. Acesse o link no e-mail e insira sua nova senha.
5. Após definir a nova senha, volte à página de login e faça o login novamente com a nova senha.

Certifique-se de que o e-mail informado seja o mesmo utilizado para o cadastro, para garantir o recebimento do e-mail de redefinição de senha.

## Configurações básicas

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
