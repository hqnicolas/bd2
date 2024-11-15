// utils/database.js
const { Pool } = require('pg');
const logger = require('./logger');

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
  logger.error(`Erro inesperado em cliente ocioso: ${err.stack}`);
  process.exit(-1);
});

module.exports = pool;