// app.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const dbControlRoutes = require('./routes/db-control');
const logger = require('./utils/logger');
const initDatabase = require('./src/utils/initDatabase');

const app = express();

app.use(bodyParser.json());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
}));

app.use('/api/db-control', dbControlRoutes);

const PORT = process.env.PORT || 8080;

// Check if the database has been initialized
if (process.env.DB_INITIALIZED !== 'true') {
  initDatabase().then(() => {
    app.listen(PORT, () => {
      logger.info(`O servidor está sendo executado na porta ${PORT}`);
      console.log(`O servidor está sendo executado na porta ${PORT}`);
    });
  }).catch((err) => {
    logger.error(`Erro ao inicializar o banco de dados: ${err.stack}`);
    process.exit(-1);
  });
} else {
  app.listen(PORT, () => {
    logger.info(`O servidor está sendo executado na porta ${PORT}`);
    console.log(`O servidor está sendo executado na porta ${PORT}`);
  });
}

// Adicionar tratamento de erros
app.use((err, req, res, next) => {
  logger.error(`Erro: ${err.stack}`);
  res.status(500).json({ error: 'Erro do Servidor Interno' });
});