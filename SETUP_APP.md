# Manual de Implantação do Gerenciador de Donativos N3

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
Ação: reinicie os serviços do Docker Compose para aplicar as alterações.
Comando: `docker-compose down && docker-compose up --build`
Resultado esperado: os serviços devem iniciar e você deve ver logs indicando que o servidor está em execução e conectado ao banco de dados.

### Etapa 2
Ação: abra um terminal e execute o seguinte comando cURL para testar o endpoint `GET /api/db-control/functions`.
Comando: `curl -X GET http://localhost:8080/api/db-control/functions`
Resultado esperado: o comando deve retornar uma resposta JSON listando todas as funções no banco de dados. Se não houver funções, ele deve retornar uma matriz vazia `[]`.

### Etapa 3
Ação: execute o seguinte comando cURL para testar o endpoint `GET /api/db-control/indices`.
Comando: `curl -X GET http://localhost:8080/api/db-control/indices`
Resultado esperado: O comando deve retornar uma resposta JSON listando todos os índices no esquema `public`. Se não houver índices, ele deve retornar uma matriz vazia `[]`.

### Etapa 4
Ação: Execute o seguinte comando cURL para testar o ponto de extremidade `GET /api/db-control/triggers`.
Comando: `curl -X GET http://localhost:8080/api/db-control/triggers`
Resultado esperado: O comando deve retornar uma resposta JSON listando todos os gatilhos no esquema `public`. Se não houver gatilhos, ele deve retornar uma matriz vazia `[]`.

### Etapa 5
Ação: Execute o seguinte comando cURL para testar o ponto de extremidade `GET /api/db-control/stored-procedures`.
Comando: `curl -X GET http://localhost:8080/api/db-control/stored-procedures`
Resultado esperado: O comando deve retornar uma resposta JSON listando todos os procedimentos armazenados no banco de dados. Se não houver procedimentos armazenados, ele deve retornar uma matriz vazia `[]`.

### Etapa 6
Ação: Execute o seguinte comando cURL para testar o endpoint `GET /api/db-control/dml-statements`.
Comando: `curl -X GET http://localhost:8080/api/db-control/dml-statements`
Resultado esperado: O comando deve retornar uma resposta JSON listando todas as instruções DML no arquivo `dml.sql`. Se não houver instruções DML, ele deve retornar uma matriz vazia `[]`.

### Etapa 7
Ação: Se todas as etapas acima retornarem os resultados esperados, a tarefa foi concluída com sucesso.
Resultado esperado: Todos os comandos devem retornar respostas JSON apropriadas sem nenhum erro "Cannot GET".