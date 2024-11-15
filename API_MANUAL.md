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

### Gerenciamento de usuários
- **POST /api/register**: Registre um novo usuário.
- **Solicitação**:
```json
{
"nome": "John Doe",
"email": "john.doe@example.com",
"senha": "senha123",
"telefone": "1234567890",
"endereço": "123 Main St"
}
```
- **Resposta**:
```json
{
"mensagem": "Usuário registrado com sucesso"
}
```

- **POST /api/login**: Efetue login de um usuário.
- **Solicitação**:
```json
{
"email": "john.doe@example.com",
"password": "password123"
}
```
- **Resposta**:
```json
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

- **GET /api/profile**: Obter perfil do usuário.
- **Autenticação**: Token do portador
- **Resposta**:
```json
{
"name": "John Doe",
"email": "john.doe@example.com",
"phone": "1234567890",
"address": "123 Main St"
}
```

- **PUT /api/profile**: Atualizar perfil do usuário.
- **Autenticação**: Token do portador
- **Solicitação**:
```json
{
"nome": "John Doe Jr."
}
```
- **Resposta**:
```json
{
"mensagem": "Perfil atualizado com sucesso"
}
```

### Gerenciamento de telefone
- **POST /api/register-phone**: Registre um novo telefone.
- **Autenticação**: Token do portador
- **Solicitação**:
```json
{
"model": "iPhone 12",
"imei": "123456789012345",
"value": 1000.00
}
```
- **Resposta**:
```json
{
"message": "Telefone registrado com sucesso"
}
```

- **GET /api/phones**: Obtenha uma lista de telefones registrados.
- **Autenticação**: Token do portador
- **Resposta**:
```json
[
{
"id": 1,
"model": "iPhone 12",
"imei": "123456789012345",
"value": 1000.00,
"client_id": 1
}
]
```

### Gerenciamento de apolices
- **POST /api/purchase-policy**: Compre uma nova apólice de seguro.
- **Autenticação**: Token do portador
- **Solicitação**:
```json
{
"coverage": "Abrangente",
"premium": 200,00,
"phone_id": 1
}
```
- **Resposta**:
```json
{
"message": "Apólice adquirida com sucesso"
}
```

- **GET /api/policies**: Obtenha uma lista de apolices ativas.
- **Autenticação**: Token do portador
- **Resposta**:
```json
[
{
"id": 1,
"number": "A123456",
"start_date": "2023-01-01",
"end_date": "2024-01-01",
"coverage": "Abrangente",
"premium": 200,00,
"client_id": 1,
"phone_id": 1
}
]
```

- **PUT /api/policies/:id**: Atualiza uma Apólice.
- **Autenticação**: Token do portador
- **Solicitação**:
```json
{
"coverage": "Básico",
"premium": 150,00
}
```
- **Resposta**:
```json
{
"message": "Apólice atualizada com sucesso"
}
```

### Gerenciamento de reivindicações
- **POST /api/register-claim**: Registre uma nova reivindicação.
- **Autenticação**: Token do portador
- **Solicitação**:
```json
{
"description": "Telefone caiu na água",
"policy_id": 1
}
```
- **Resposta**:
```json
{
"message": "Reivindicação registrada com sucesso"
}
```

- **GET /api/claims**: Obtenha uma lista de reivindicações.
- **Autenticação**: Token do portador
- **Resposta**:
```json
[
{
"id": 1,
"date_registered": "2023-02-01",
"description": "Telefone caiu na água",
"status": "Pendente",
"policy_id": 1
}
]
```

- **PUT /api/claims/:id**: Atualiza uma reivindicação.
- **Autenticação**: Token do portador
- **Solicitação**:
```json
{
"status": "Aprovado"
}
```
- **Resposta**:
```json
{
"message": "Reivindicação atualizada com sucesso"
}
```

### Gerenciamento de inventário
- **POST /api/manage-inventory**: Gerenciar inventário.
- **Autenticação**: Token do portador
- **Solicitação**:
```json
{
"nome": "Tela",
"quantidade": 50,
"nível_crítico": 10,
"valor_da_unidade": 50,00
}
```
- **Resposta**:
```json
{
"mensagem": "Inventário atualizado com sucesso"
}
```

- **OBTER /api/inventory**: Obter uma lista de itens de inventário.
- **Autenticação**: Token do portador
- **Resposta**:
```json
[
{
"id": 1,
"name": "Tela",
"quantity": 50,
"critical_level": 10,
"unit_value": 50,00
}
]
```

### Análise de risco
- **GET /api/risk-analysis**: Obter dados de análise de risco.
- **Autenticação**: Token do portador
- **Resposta**:
```json
{
"risk_types": [
{
"type": "Roubo",
"claim_rate": 0,05,
"recommended_coverage": "Abrangente",
"recommended_premium": 250,00
}
]
}
```
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