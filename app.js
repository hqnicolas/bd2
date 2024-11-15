// app.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const dbControlRoutes = require('./routes/db-control');
const logger = require('./utils/logger');

const app = express();

app.use(bodyParser.json());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
}));

app.use('/api/db-control', dbControlRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  logger.info(`O servidor está sendo executado na porta ${PORT}`);
  console.log(`O servidor está sendo executado na porta ${PORT}`);
});

// Adicionar tratamento de erros
app.use((err, req, res, next) => {
  logger.error(`Erro: ${err.stack}`);
  res.status(500).json({ error: 'Erro do Servidor Interno' });
});