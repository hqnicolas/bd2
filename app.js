// app.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const logger = require('./src/utils/logger');
const dbControlRoutes = require('./src/routes/db-control');
const initDatabase = require('./src/utils/initDatabase');

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

const port = process.env.PORT || 8080;

const startServer = async () => {
  if (process.env.DB_INITIALIZED !== 'true') {
    logger.info('Inicializando o banco de dados...');
    try {
      await initDatabase();
      logger.info('Banco de dados inicializado com sucesso');
    } catch (err) {
      logger.error(`Erro ao inicializar o banco de dados: ${err.stack}`);
      // Registre o erro, mas continue executando o servidor
      logger.error('Tentando iniciar o servidor com problemas de inicialização do banco de dados');
    }
  } else {
    logger.info('Banco de dados já inicializado');
  }

  app.listen(port, () => {
    logger.info(`Servidor em execução na porta ${port}`);
  });
};

startServer().catch((err) => {
  logger.error(`Erro ao iniciar o servidor: ${err.stack}`);
  // Registre o erro, mas continue executando o servidor
  logger.error('Tentando iniciar o servidor com problemas de inicialização');
});

// Adicionar tratamento de erros
app.use((err, req, res, next) => {
  logger.error(`Erro: ${err.stack}`);
  res.status(500).json({ error: 'Erro do Servidor Interno' });
  next(); // Continue para o próximo middleware
});
