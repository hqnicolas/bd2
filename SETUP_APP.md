# Manual de Implantação do Gerenciador de apolices para Seguro de Celulares

## 1. Clone o Repositório
1. Abra um terminal ou prompt de comando.
2. Navegue até o diretório onde deseja clonar o repositório.
3. Execute o seguinte comando para clonar o repositório:
```sh
git clone https://github.com/hqnicolas/bd2.git
```
## 2. Navegue até o repositório clonado:
```sh
cd bd2
```

## 3. Construa o Projeto
1. **Construa o Backend**:
- Navegue até a raiz do diretório do projeto.
- Execute o seguinte comando para construir o aplicativo:
```sh
docker compose build
```

## 4. Executando o aplicativo
1. **Execute o backend**:
- Navegue até a raiz do diretório do projeto.
- Execute o seguinte comando para iniciar o aplicativo:
```sh
docker compose up
```
---
---
---

Aqui estão as instruções sobre como testar o aplicativo:

### Etapa 1
Ação: Inicie o servidor
Resultado esperado: Você deve ver a mensagem "O servidor está sendo executado na porta 8080" no terminal.

### Etapa 2
Ação: Abra uma nova aba ou janela do terminal e execute o seguinte comando cURL para verificar se o banco de dados foi inicializado:
```bash
curl -X GET "http://localhost:8080/api/db-control/functions" -H "Content-Type: application/json"
```
Resultado esperado: A resposta deve conter uma lista de funções no banco de dados, indicando que o banco de dados foi inicializado com sucesso.

### Etapa 3
Ação: Execute o seguinte comando cURL para criar um novo cliente usando a API:
```bash
curl -X POST "http://localhost:8080/api/db-control/dml-statements/execute" -H "Content-Type: application/json" -d '{"statement": "INSERT INTO clients (nome, cpf, email, telefone, endereco) VALUES (\'John Doe\', \'12345678900\', \'john.doe@example.com\', \'1234567890\', \'123 Main St\')"}'
```
Resultado esperado: A resposta deve conter uma mensagem de sucesso, indicando que o novo cliente foi adicionado ao banco de dados.

### Etapa 4
Ação: Execute o seguinte comando cURL para recuperar a lista de clientes:
```bash
curl -X POST "http://localhost:8080/api/db-control/dml-statements/execute" -H "Content-Type: application/json" -d '{"statement": "SELECT * FROM clients"}'
```
Resultado esperado: A resposta deve conter uma lista de clientes, incluindo o cliente que você acabou de adicionar.

### Etapa 5
Ação: Execute o seguinte comando cURL para verificar se o gatilho está funcionando excluindo uma política:
```bash
curl -X POST "http://localhost:8080/api/db-control/dml-statements/execute" -H "Content-Type: application/json" -d '{"statement": "DELETE FROM apolices WHERE id = 1"}'
```
Resultado esperado: A resposta deve conter uma mensagem de sucesso, e você pode verificar o log para garantir que o gatilho foi executado e a política excluída foi registrada na tabela `ApoliceLog`.

### Etapa 6
Ação: Execute o seguinte comando cURL para verificar a tabela `ApoliceLog`:
```bash
curl -X POST "http://localhost:8080/api/db-control/dml-statements/execute" -H "Content-Type: application/json" -d '{"statement": "SELECT * FROM ApoliceLog"}'
```
Resultado esperado: A resposta deve conter uma lista de políticas excluídas, incluindo a que você acabou de excluir.

Seguindo essas etapas, você pode verificar se o banco de dados foi inicializado corretamente e se todos os objetos do banco de dados (tabelas, funções, gatilhos, etc.) estão funcionando conforme o esperado.
