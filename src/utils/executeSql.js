// utils/executeSql.js
const pool = require('./database');
const logger = require('./logger');

async function executeSql(query, values = []) {
  try {
    logger.info(`Rodando SQL: ${query} com os valores: ${JSON.stringify(values)}`);
    const res = await pool.query(query, values);
    logger.info(`SQL executado com sucesso: ${query}`);
    return res.rows;
  } catch (err) {
    logger.error(`Erro ao executar SQL: ${err.stack}`);
    throw err;
  }
}

module.exports = executeSql;