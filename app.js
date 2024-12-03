const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const logger = require('./src/utils/logger');
const dbControlRoutes = require('./src/routes/db-control');
const inventoryRoutes = require('./src/routes/inventory');
const riskAnalysisRoutes = require('./src/routes/risk-analysis');
const initDatabase = require('./src/utils/initDatabase');
const executeSql = require('./src/utils/executeSql');
const checkDatabaseInitialized = require('./src/utils/initDatabase');

const app = express();

// Meio de campo para servir arquivos estáticos do diretório público
app.use(express.static('public'));

// Meio de campo para analisar corpos JSON
app.use(bodyParser.json());

// Meio de campo para pegar o formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Meio de campo para gerenciamento de sessão
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Meio de campo customizado
const middleware1 = (req, res, next) => {
  logger.info('Middleware 1 executed');
  next();
};

const middleware2 = (req, res, next) => {
  logger.info('Middleware 2 executed');
  next();
};

// Use Meio de campo
app.use(middleware1);
app.use(middleware2);

// Rotas da API
app.use('/api/db-control', dbControlRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/risk-analysis', riskAnalysisRoutes);

// Rotas para servir arquivos HTML
app.get('/register', (req, res) => {
  res.sendFile('register.html', { root: 'public' });
});

app.get('/login', (req, res) => {
  res.sendFile('login.html', { root: 'public' });
});

app.get('/profile', (req, res) => {
  res.sendFile('profile.html', { root: 'public' });
});

app.get('/register-phone', (req, res) => {
  res.sendFile('register-phone.html', { root: 'public' });
});

app.get('/purchase-policy', (req, res) => {
  res.sendFile('purchase-policy.html', { root: 'public' });
});

app.get('/manage-policies', (req, res) => {
  res.sendFile('manage-policies.html', { root: 'public' });
});

app.get('/register-claim', (req, res) => {
  res.sendFile('register-claim.html', { root: 'public' });
});

app.get('/evaluate-claim', (req, res) => {
  res.sendFile('evaluate-claim.html', { root: 'public' });
});

app.get('/manage-inventory', (req, res) => {
  res.sendFile('manage-inventory.html', { root: 'public' });
});

app.get('/risk-analysis', (req, res) => {
  res.sendFile('risk-analysis.html', { root: 'public' });
});

// Add the new routes
app.get('/risk-profile', (req, res) => {
  res.sendFile('risk-profile.html', { root: 'public' });
});

app.get('/manage-inventory', (req, res) => {
  res.sendFile('manage-inventory.html', { root: 'public' });
});

// Rota para excluir uma apólice
app.delete('/manage-policies/delete', async (req, res) => {
  const { numero } = req.body;
  try {
      const result = await deletePolicy(numero);
      if (result.success) {
          res.json({ success: true });
      } else {
          res.json({ success: false, error: result.error });
      }
  } catch (err) {
      logger.error(`Erro ao excluir a apólice: ${err.stack}`);
      res.status(500).json({ error: 'Erro interno do backend' });
  }
});

// Rota para buscar apólices por ID do Cliente
app.get('/manage-policies/fetch', async (req, res) => {
  const { idCliente } = req.query;
  try {
      const policies = await fetchPolicies(idCliente);
      res.json(policies);
  } catch (err) {
      logger.error(`Erro ao buscar apólices: ${err.stack}`);
      res.status(500).json({ error: 'Erro interno do backend' });
  }
});

// Rota para buscar o log das políticas excluídas
app.get('/manage-policies/log', async (req, res) => {
  try {
      const policiesLogData = await fetchPoliciesLogFromDB();
      res.json(policiesLogData);
  } catch (err) {
      logger.error(`Erro ao buscar log de apólices: ${err.stack}`);
      res.status(500).json({ error: 'Erro interno do backend' });
  }
});

// Rota para excluir sinistros baseado no ID do cliente
app.delete('/delete-claims/:clientId', async (req, res) => {
  const clientId = req.params.clientId;
  try {
    const result = await deleteClaims(clientId);
    if (result.success) {
      res.json({ success: true });
    } else {
      res.json({ success: false, error: result.error });
    }
  } catch (err) {
    logger.error(`Erro ao excluir sinistros: ${err.stack}`);
    res.status(500).json({ error: 'Erro interno do backend' });
  }
});

// Rota de registro de novo perfil
app.post('/register', async (req, res) => {
  const { nome, cpf, email, telefone, endereco } = req.body;
  const query = 'INSERT INTO clients (nome, cpf, email, telefone, endereco) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [nome, cpf, email, telefone, endereco];
  try {
    const result = await executeSql(query, values);
    res.redirect('/login');
  } catch (err) {
    logger.error(`Erro ao registrar o seu perfil: ${err.stack}`);
    res.status(500).json({ error: 'Erro interno do backend' });
  }
});

// Rota para servir a página do menu principal
app.get('/main-menu', (req, res) => {
  res.sendFile('menu.html', { root: 'public' });
});

// Rota para manipular login bem-sucedido e redirecionar para a página do menu principal
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM clients WHERE email = $1';
  const values = [email];
  try {
    const result = await executeSql(query, values);
    if (result.length > 0) {
      req.session.user = result[0];
      res.redirect('/main-menu'); // Redirecionar para a página do menu principal após login bem-sucedido
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    logger.error(`Error logging in: ${err.stack}`);
    res.status(500).json({ error: 'Erro interno do backend' });
  }
});

  // Rota para a página do administrador
  app.get('/admin', (req, res) => {
  res.sendFile('admin.html', { root: 'public' });
});

// Rota de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM clients WHERE email = $1';
  const values = [email];
  try {
    const result = await executeSql(query, values);
    if (result.length > 0) {
      req.session.user = result[0];
      res.redirect('/profile');
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    logger.error(`Error logging in: ${err.stack}`);
    res.status(500).json({ error: 'Erro interno do backend'});
  }
});

// Rota de atualização de perfil
app.post('/profile', async (req, res) => {
  const { id, nome, cpf, email, telefone, endereco } = req.body;
  const query = 'UPDATE clients SET nome = $1, cpf = $2, email = $3, telefone = $4, endereco = $5 WHERE cpf = $2 RETURNING *';
  const values = [nome, cpf, email, telefone, endereco];
  try {
    const result = await executeSql(query, values);
    res.json(result[0]); 
  } catch (err) {
    logger.error(`Error updating profile: ${err.stack}`);
    res.status(500).json({ error: 'Erro interno do backend'});
  }
});

// Rota para Registrar telefône
app.post('/register-phone', async (req, res) => {
  const { modelo, imei, valor, clientId } = req.body;
  const query = 'INSERT INTO celulares (modelo, imei, valor, cliente_id) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [modelo, imei, valor, clientId];
  try {
    const result = await executeSql(query, values);
    res.json(result[0]);
  } catch (err) {
    logger.error('Erro ao registrar telefone: ${err.stack}');
    res.status(500).json({ error: 'Erro interno do backend'});
  }
});

// Rota de compra de apólices
app.post('/purchase-policy', async (req, res) => {
  const {cobertura, premio, clientId, celularId, numero, data_validade} = req.body;
  const data_emissao = new Date();
  const query = 'INSERT INTO apolices (cobertura, premio, cliente_id, celular_id, numero, data_emissao, data_validade) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const values = [cobertura, premio, clientId, celularId, numero, data_emissao, data_validade];
  try {
    const result = await executeSql(query, values);
    res.json(result[0]);
  } catch (err) {
    logger.error(`Erro na compra da Apólice: ${err.stack}`);
    res.status(500).json({ error: 'Erro de backend' });
  }
});

// Registrar rota de reivindicação
app.post('/register-claim', async (req, res) => {
  const {descricao, apolice_id} = req.body;
  const data_registro = new Date();
  const status = 'Aberto'; 
  const query = 'INSERT INTO sinistros (descricao, apolice_id, data_registro, status) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [descricao, apolice_id, data_registro, status];
  try {
    const result = await executeSql(query, values);
    res.json(result[0]);
  } catch (err) {
    logger.error(`Error registering claim: ${err.stack}`);
    res.status(500).json({ error: 'Erro interno do backend' });
  }
});

// Rota para Avaliar reivindicação
app.post('/evaluate-claim', async (req, res) => {
  const { id, status, valor_indenizacao } = req.body;
  const query = 'UPDATE sinistros SET status = $1, valor_indenizacao = $2 WHERE id = $3 RETURNING *';
  const values = [status, valor_indenizacao, id];
  try {
    const result = await executeSql(query, values);
    res.json(result[0]);
  } catch (err) {
    logger.error(`Erro ao avaliar a reivindicação: ${err.stack}`);
    res.status(500).json({ error: 'Erro interno do backend' });
  }
});

// Rota para sincronizar sinistros
app.get('/sinistros', async (req, res) => {
  const query = 'SELECT * FROM sinistros WHERE status = $1';
  const values = ['Aberto'];
  try {
    const result = await executeSql(query, values);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


// Rota para executar stored procedures e criar uma análise de risco
app.post('/api/risk-analysis', async (req, res) => {
  const { procedureName, parameters } = req.body;
  const query = `SELECT ${procedureName}(${parameters.join(',')})`;
  try {
    logger.info(`Executando stored procedure: ${procedureName} Com os parametros: ${JSON.stringify(parameters)}`);
    const result = await executeSql(query);
    logger.info(`Stored procedure ${procedureName} Executado com sucesso`);
    if (result.length > 0 && result[0].pr_count_sinistros_cliente !== undefined) {
      logger.info(`Resultado: ${result[0].pr_count_sinistros_cliente}`);
    } else {
      logger.info('Resultado: Nenhum resultado encontrado');
    }
    if (result.length > 0 && result[0].pr_count_apolices !== undefined) {
      logger.info(`Resultado: ${result[0].pr_count_apolices}`);
    } else {
      logger.info('Resultado: Nenhum resultado encontrado');
    }
    res.json(result);
  } catch (err) {
    logger.error(`Erro ao executar stored procedure: ${err.stack}`);
    res.status(500).json({ error: 'Erro interno do backend' });
  }
});


// Rota para obter o ID do usuário pelo CPF
app.get('/api/db-control/get-user-id-by-cpf', async (req, res) => {
  const { cpf } = req.query;
  const query = 'SELECT id FROM clients WHERE cpf = $1';
  const values = [cpf];
  try {
    const result = await executeSql(query, values);
    if (result.length > 0) {
      res.json(result[0].id);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (err) {
    logger.error(`Erro ao pegar ID pelo CPF: ${err.stack}`);
    res.status(500).json({ error: 'Erro interno do backend' });
  }
});

const port = process.env.PORT || 8080;

const startServer = async () => {
  try {
    const isDatabaseInitialized = await checkDatabaseInitialized();

    if (isDatabaseInitialized === false) {
      logger.info('Inicializando o banco de dados...');
      await initDatabase();
    } else {
      logger.info('Banco de dados já inicializado');
    }
  } catch (err) {
    logger.error(`Erro durante a inicialização do banco de dados: ${err.stack}`);
  }

  app.listen(port, () => {
    logger.info(`O servidor está sendo executado na porta ${port}`);
  });
};

// Meio de campo: de tratamento de erros
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.stack}`);
  res.status(500).json({ error: 'Erro interno do backend' });
  next(); // Continue para o próximo meio de campo
});

// Função para excluir sinistros baseado no ID da Apólice
const deleteClaims = async (clientId) => {
  const query = 'DELETE FROM sinistros WHERE apolice_id = $1';
  const values = [clientId];
  try {
    const result = await executeSql(query, values);
    logger.info(`Sinistros excluídos com sucesso para a Apólice ${clientId}`);
    return { success: true };
  } catch (err) {
    logger.error(`Erro ao excluir sinistros para o Apólice ${clientId}: ${err.stack}`);
    return { success: false, error: err.message };
  }
};

// Função para excluir uma apólice
const deletePolicy = async (numero) => {
  const query = 'DELETE FROM apolices WHERE cliente_id = $1';
  const values = [numero];
  try {
      const result = await executeSql(query, values);
      logger.info(`Apólice ${numero} excluída com sucesso.`);
      return { success: true };
  } catch (err) {
      logger.error(`Erro ao excluir apólice ${numero}: ${err.stack}`);
      return { success: false, error: err.message };
  }
};

// Função para buscar log das Apolices excluidas
const fetchPoliciesLogFromDB = async () => {
  const query = 'SELECT * FROM ApoliceLog ORDER BY deleted_date DESC';
  try {
      const result = await executeSql(query);
      logger.info('Políticas logadas obtidas com sucesso.');
      return result;
  } catch (err) {
      logger.error(`Erro ao buscar log de apólices: ${err.stack}`);
      throw new Error('Erro ao buscar log de apólices.');
  }
};

// Função para buscar apólices por ID do Cliente
const fetchPolicies = async (idCliente) => {
  const query = 'SELECT numero, celular_id, cobertura FROM apolices WHERE cliente_id = $1';
  const values = [idCliente];
  try {
      const policies = await executeSql(query, values);
      logger.info(`Apólices buscadas para o ID Cliente ${idCliente}.`);
      return policies;
  } catch (err) {
      logger.error(`Erro ao buscar apólices para ID Cliente ${idCliente}: ${err.stack}`);
      throw new Error('Erro ao buscar apólices.');
  }
};

startServer();
