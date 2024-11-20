// src/utils/database.js
const { Pool } = require('pg');
const logger = require('../utils/logger');

const pool = new Pool({
  user: process.env.DATASOURCE_USERNAME,
  host: 'postgres',
  database: process.env.DATASOURCE_URL.split('//')[1].split(':')[0], // Extrair nome do banco de dados da URL
  password: process.env.DATASOURCE_PASSWORD,
  port: 5432,
});

pool.on('connect', () => {
  logger.info('Conectado ao banco de dados');
});

pool.on('error', (err) => {
  logger.error(`Erro de conexão com o banco: ${err.stack}`);
  logger.error('Tentando Reconectar ao Banco de dados...');
});

module.exports = pool;