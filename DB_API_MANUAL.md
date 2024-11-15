# Manual da API bd2

Este manual fornece um guia abrangente sobre como interagir com o aplicativo `bd2` usando o cliente Insomnia ou Postman REST API. 
Ele inclui instruções de instalação e configuração, documentação detalhada de todos os endpoints da API, 
exemplos concretos de solicitações e respostas da API e instruções sobre como configurar e usar autenticação básica. 
Além disso, ele explica códigos e mensagens de erro comuns.

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
## API Endpoints

### Manual para Testar Conexões REST API com Postman ou Insomnia

Este manual fornece instruções detalhadas para testar as rotas da API REST do seu aplicativo usando Postman ou Insomnia. As rotas estão relacionadas a procedimentos armazenados, DML statements, funções, índices e triggers.

#### 1. Configuração Inicial

1. **Instale o Postman ou Insomnia**:
   - Baixe e instale o Postman ou Insomnia em seu computador.
   - Abra o aplicativo de sua escolha.

2. **Crie uma nova coleção**:
   - No Postman ou Insomnia, crie uma nova coleção para organizar suas requisições.
   - Nomeie a coleção de acordo com o seu projeto, por exemplo, "DB Control API".

#### 2. Configuração do Ambiente

1. **Defina o Ambiente**:
   - Configure um ambiente no Postman ou Insomnia com as seguintes variáveis:
     - `base_url`: URL base da sua API, por exemplo, `http://localhost:8080/api`.
   - No Postman, vá para `File > Manage Environments > Add` e adicione as variáveis.
   - No Insomnia, vá para `Manage Environments` e adicione as variáveis.

#### 3. Testando as Rotas

##### 3.1. Procedimentos Armazenados

**Listar Todos os Procedimentos Armazenados**:
- **Método**: GET
- **URL**: `http://localhost:8080/stored-procedures`
- **Resposta Esperada**: Lista de todos os procedimentos armazenados.

**Executar um Procedimento Armazenado**:
- **Método**: POST
- **URL**: `http://localhost:8080/stored-procedures/execute`
- **Corpo da Requisição** (raw, JSON):
  ```json
  {
    "procedureName": "seu_procedimento",
    "parameters": ["param1", "param2"]
  }
  ```
- **Resposta Esperada**: Resultado da execução do procedimento armazenado.

##### 3.2. DML Statements

**Listar Todos os DML Statements**:
- **Método**: GET
- **URL**: `http://localhost:8080/dml-statements`
- **Resposta Esperada**: Lista de todos os DML statements.

**Executar um DML Statement**:
- **Método**: POST
- **URL**: `http://localhost:8080/dml-statements/execute`
- **Corpo da Requisição** (raw, JSON):
  ```json
  {
    "statement": "INSERT INTO tabela (coluna1, coluna2) VALUES ('valor1', 'valor2')"
  }
  ```
- **Resposta Esperada**: Resultado da execução do DML statement.

##### 3.3. Funções

**Listar Todas as Funções**:
- **Método**: GET
- **URL**: `http://localhost:8080/functions`
- **Resposta Esperada**: Lista de todas as funções.

**Executar uma Função**:
- **Método**: POST
- **URL**: `http://localhost:8080/functions/execute`
- **Corpo da Requisição** (raw, JSON):
  ```json
  {
    "functionName": "sua_funcao",
    "parameters": ["param1", "param2"]
  }
  ```
- **Resposta Esperada**: Resultado da execução da função.

##### 3.4. Índices

**Listar Todos os Índices**:
- **Método**: GET
- **URL**: `http://localhost:8080/indices`
- **Resposta Esperada**: Lista de todos os índices.

**Adicionar um Índice**:
- **Método**: POST
- **URL**: `http://localhost:8080/indices/add`
- **Corpo da Requisição** (raw, JSON):
  ```json
  {
    "indexName": "seu_indice",
    "tableName": "sua_tabela",
    "columns": ["coluna1", "coluna2"]
  }
  ```
- **Resposta Esperada**: Mensagem de sucesso.

**Excluir um Índice**:
- **Método**: POST
- **URL**: `http://localhost:8080/indices/delete`
- **Corpo da Requisição** (raw, JSON):
  ```json
  {
    "indexName": "seu_indice"
  }
  ```
- **Resposta Esperada**: Mensagem de sucesso.

##### 3.5. Triggers

**Listar Todos os Triggers**:
- **Método**: GET
- **URL**: `http://localhost:8080/triggers`
- **Resposta Esperada**: Lista de todos os triggers.

**Adicionar um Trigger**:
- **Método**: POST
- **URL**: `http://localhost:8080/triggers/add`
- **Corpo da Requisição** (raw, JSON):
  ```json
  {
    "triggerName": "seu_trigger",
    "tableName": "sua_tabela",
    "operation": "INSERT",
    "action": "FOR EACH ROW BEGIN ... END"
  }
  ```
- **Resposta Esperada**: Mensagem de sucesso.

**Excluir um Trigger**:
- **Método**: POST
- **URL**: `http://localhost:8080/triggers/delete`
- **Corpo da Requisição** (raw, JSON):
  ```json
  {
    "triggerName": "seu_trigger"
  }
  ```
- **Resposta Esperada**: Mensagem de sucesso.

#### 4. Considerações Finais

- **Logs**: Verifique os logs do seu aplicativo para mensagens de erro detalhadas em caso de falha.
- **Documentação**: Mantenha a documentação da API atualizada para facilitar o desenvolvimento e testes futuros.
- **Segurança**: Certifique-se de que as rotas estão protegidas de acordo com as necessidades do seu aplicativo.

Com este manual, você deve ser capaz de testar todas as rotas da API REST do seu aplicativo com eficiência usando Postman ou Insomnia.

## Configurando a autenticação básica

### Insônia
1. **Configurar a autenticação básica**:
- Clique na aba "Autorização" na sua solicitação.
- Selecione "Autenticação básica" no menu suspenso.
- Insira seu nome de usuário e senha nos respectivos campos.

### Postman
1. **Configurar a autenticação básica**:
- Clique na aba "Autorização" na sua solicitação.
- Selecione "Autenticação básica" no menu suspenso.
- Insira seu nome de usuário e senha nos respectivos campos.

## Códigos e mensagens de erro comuns

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
