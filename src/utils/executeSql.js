// src/utils/executeSql.js
const pool = require('../utils/database');
const logger = require('../utils/logger');

async function executeSql(query, values = []) {
  try {
    logger.info(`Rodando SQL: ${query} com os valores: ${JSON.stringify(values)}`);
    const client = await pool.connect();
    try {
      const res = await client.query(query, values);
      logger.info(`SQL executado com sucesso: ${query}`);
      return res.rows;
    } finally {
      client.release();
    }
  } catch (err) {
    logger.error(`Erro ao executar SQL: ${query}`);
    logger.error(`Erro: ${err.stack}`);
    throw new Error(err.message);  // Retorna Nulo para indicar uma falha
  }
}

module.exports = executeSql;