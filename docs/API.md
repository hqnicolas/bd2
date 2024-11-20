# Manual da API bd2

Este manual fornece um guia abrangente sobre como interagir com o aplicativo `bd2` usando o cliente Insomnia ou Postman REST API. Ele inclui instruções de instalação e configuração, documentação detalhada de todos os endpoints da API, exemplos concretos de solicitações e respostas da API e instruções sobre como configurar e usar autenticação básica. Além disso, ele explica códigos e mensagens de erro comuns.

## Instruções de instalação e configuração

### Insomnia

1. **Baixe o Insomnia**:
   - Visite o site oficial do Insomnia: https://insomnia.rest/
   - Baixe a versão apropriada para seu sistema operacional.
   - Instale o Insomnia seguindo as instruções de instalação.

2. **Crie uma nova solicitação**:
   - Abra o Insomnia.
   - Clique em "Criar" e selecione "Solicitar".
   - Nomeie sua solicitação e defina o método HTTP (por exemplo, GET, POST, PUT, DELETE).
   - Insira a URL do endpoint da API na barra de URL.

### Postman

1. **Baixe o Postman**:
   - Visite o site oficial do Postman: https://www.postman.com/
   - Baixe o aplicativo Postman para seu sistema operacional.
   - Instale o Postman seguindo as instruções de instalação.

2. **Crie uma nova solicitação**:
   - Abra o Postman.
   - Clique no botão "+" para criar uma nova solicitação.
   - Nomeie sua solicitação e defina o método HTTP (por exemplo, GET, POST, PUT, DELETE).
   - Insira a URL do ponto de extremidade da API na barra de URL.

## Configuração do Ambiente

1. **Defina o Ambiente**:
   - Configure um ambiente no Postman ou Insomnia com as seguintes variáveis:
     - `base_url`: URL base da sua API, por exemplo, `http://localhost:8080/api`.
   - No Postman, vá para `File > Manage Environments > Add` e adicione as variáveis.
   - No Insomnia, vá para `Manage Environments` e adicione as variáveis.

## API Endpoints

### Manual para Testar Conexões REST API com Postman ou Insomnia

#### 1. Configuração Inicial

1. **Instale o Postman ou Insomnia**:
   - Baixe e instale o Postman ou Insomnia em seu computador.
   - Abra o aplicativo de sua escolha.

2. **Crie uma nova coleção**:
   - No Postman ou Insomnia, crie uma nova coleção para organizar suas requisições.
   - Nomeie a coleção de acordo com o seu projeto, por exemplo, "DB Control API".

#### 2. Testando as Rotas

##### 3.1. Procedimentos Armazenados

**Listar Todos os Procedimentos Armazenados**:
- **Método**: GET
- **URL**: `http://localhost:8080/api/db-control/stored-procedures`
- **Resposta Esperada**: Lista de todos os procedimentos armazenados.

**Executar um Procedimento Armazenado**:
- **Método**: POST
- **URL**: `http://localhost:8080/api/db-control/stored-procedures/execute`
- **Corpo da Requisição** (raw, JSON):
  ```json
  {
    "procedureName": "example_procedure",
    "parameters": {
      "param1": "value1",
      "param2": "value2"
    }
  }
  ```
- **Resposta Esperada**: Resultado da execução do procedimento armazenado.

##### 3.2. DML Statements

**Listar Todos os DML Statements**:
- **Método**: GET
- **URL**: `http://localhost:8080/api/db-control/dml-statements`
- **Resposta Esperada**: Lista de todos os DML statements.

**Executar um DML Statement**:
- **Método**: POST
- **URL**: `http://localhost:8080/api/db-control/dml-statements/execute`
- **Corpo da Requisição** (raw, JSON):
  ```json
  {
    "statement": "INSERT INTO example_table (column1, column2) VALUES ('value1', 'value2')"
  }
  ```
- **Resposta Esperada**: Resultado da execução do DML statement.

##### 3.3. Funções

**Listar Todas as Funções**:
- **Método**: GET
- **URL**: `http://localhost:8080/api/db-control/functions`
- **Resposta Esperada**: Lista de todas as funções.

**Executar uma Função**:
- **Método**: POST
- **URL**: `http://localhost:8080/api/db-control/functions/execute`
- **Corpo da Requisição** (raw, JSON):
  ```json
  {
    "functionName": "example_function",
    "parameters": {
      "param1": "value1",
      "param2": "value2"
    }
  }
  ```
- **Resposta Esperada**: Resultado da execução da função.

##### 3.4. Índices

**Listar Todos os Índices**:
- **Método**: GET
- **URL**: `http://localhost:8080/api/db-control/indices`
- **Resposta Esperada**: Lista de todos os índices.

**Adicionar um Índice**:
- **Método**: POST
- **URL**: `http://localhost:8080/api/db-control/indices/add`
- **Corpo da Requisição** (raw, JSON):
  ```json
  {
    "indexName": "example_index",
    "tableName": "example_table",
    "columns": ["column1", "column2"]
  }
  ```
- **Resposta Esperada**: Mensagem de sucesso.

**Excluir um Índice**:
- **Método**: POST
- **URL**: `http://localhost:8080/api/db-control/indices/delete`
- **Corpo da Requisição** (raw, JSON):
  ```json
  {
    "indexName": "example_index"
  }
  ```
- **Resposta Esperada**: Mensagem de sucesso.

##### 3.5. Triggers

**Listar Todos os Triggers**:
- **Método**: GET
- **URL**: `http://localhost:8080/api/db-control/triggers`
- **Resposta Esperada**: Lista de todos os triggers.

**Adicionar um Trigger**:
- **Método**: POST
- **URL**: `http://localhost:8080/api/db-control/triggers/add`
- **Corpo da Requisição** (raw, JSON):
  ```json
  {
    "triggerName": "example_trigger",
    "tableName": "example_table",
    "triggerFunction": "example_trigger_function",
    "triggerEvent": "BEFORE INSERT"
  }
  ```
- **Resposta Esperada**: Mensagem de sucesso.

**Excluir um Trigger**:
- **Método**: POST
- **URL**: `http://localhost:8080/api/db-control/triggers/delete`
- **Corpo da Requisição** (raw, JSON):
  ```json
  {
    "triggerName": "example_trigger"
  }
  ```
- **Resposta Esperada**: Mensagem de sucesso.

### Considerações Finais

- **Logs**: Verifique os logs do seu aplicativo para mensagens de erro detalhadas em caso de falha.
- **Documentação**: Mantenha a documentação da API atualizada para facilitar o desenvolvimento e testes futuros.
- **Segurança**: Certifique-se de que as rotas estão protegidas de acordo com as necessidades do seu aplicativo.

### Configurando a autenticação básica

#### Insomia
1. **Configurar a autenticação básica**:
   - Clique na aba "Autorização" na sua solicitação.
   - Selecione "Autenticação básica" no menu suspenso.
   - Insira seu nome de usuário e senha nos respectivos campos.

#### Postman
1. **Configurar a autenticação básica**:
   - Clique na aba "Autorização" na sua solicitação.
   - Selecione "Autenticação básica" no menu suspenso.
   - Insira seu nome de usuário e senha nos respectivos campos.

### Códigos e mensagens de erro comuns

- **400 Solicitação inválida**: a solicitação é inválida ou não pode ser atendida.
  - Exemplo: Parâmetros obrigatórios ausentes, formato de dados inválido.
- **401 Não autorizado**: a autenticação é obrigatória e falhou ou não foi fornecida.
  - Exemplo: token inválido, token expirado.
- **403 Proibido**: o servidor entendeu a solicitação, mas se recusa a autorizá-la.
  - Exemplo: Permissões insuficientes para acessar o recurso.
- **404 Não encontrado**: O recurso solicitado não pôde ser encontrado.
  - Exemplo: Ponto de extremidade inexistente, ID do recurso não encontrado.
- **500 Erro interno do servidor**: O servidor encontrou uma condição inesperada que o impediu de atender à solicitação.
  - Exemplo: Erro do lado do servidor, problema de conexão com o banco de dados.

Com este manual, você deve ser capaz de testar todas as rotas da API REST do seu aplicativo com eficiência usando Postman ou Insomnia.
