// utils/database.js
const { Pool } = require('pg');
const logger = require('./logger');

const pool = new Pool({
  user: process.env.DATASOURCE_USERNAME,
  host: 'postgres',
  database: process.env.DATASOURCE_URL.split('//')[1].split(':')[0], // Extrair o cliente da URL do banco
  password: process.env.DATASOURCE_PASSWORD,
  port: 5432,
});

pool.on('connect', () => {
  logger.info('COnectado á database');
});

pool.on('erro', (err) => {
  logger.error(`Erro inesperado no cliente tanso: ${err.stack}`);
  process.exit(-1);
});

module.exports = pool;