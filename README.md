# Aplicação de Lista de Tarefas
Esta é a aplicação frontend para a Lista de Tarefas, desenvolvida com React, TypeScript e Material-UI.

### Tecnologias Utilizadas
* React
* TypeScript
* Material-UI

### Funcionalidades
* Autenticação e autorização
* Interação com o backend para cadastro e gerenciamento de tarefas

### Como Executar
* Certifique-se de ter o Node.js instalado.
* Clone e execute o projeto [Backend](https://github.com/seu-usuario/todo-list-api)
* Clone este repositório.
* Instale as dependências usando `npm install`
* Execute o projeto com `npm start`
* Acesse a aplicação em `http://localhost:3000`

### Estrutura do Projeto
* **api/api.ts**: Configuração da API para comunicação com o backend.
* **components/Auth/Login.tsx**: Formulário de login.
* **components/Auth/Register.tsx**: Formulário de registro.
* **components/Task/TaskList.tsx**: Lista de tarefas.
* **components/Task/CreateTask.tsx**: Modal para criar uma nova tarefa.
* **components/Task/EditTask.tsx**: Modal para editar uma tarefa existente.
* **components/PrivateRoute.tsx**: Rota protegida para componentes que requerem autenticação.
* **context/AuthContext.tsx**: Contexto para gerenciar a autenticação.
* **styles/Auth/Authentication.module.css**: Estilos específicos para componentes de autenticação.
