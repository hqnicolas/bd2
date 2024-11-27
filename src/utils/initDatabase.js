// src/utils/initDatabase.js
const fs = require('fs');
const path = require('path');
const executeSql = require('../utils/executeSql');
const logger = require('../utils/logger');

const scriptFiles = [
  'ddl.sql',
  'indices.sql',
  'stored_procedures.sql',
  'dml.sql',
  'functions.sql',
  'triggers.sql'
];

const readSqlFile = (filePath) => {
  return fs.readFileSync(filePath, 'utf8');
};

const executeSqlFile = async (filePath) => {
  const sql = readSqlFile(filePath);
  const lines = sql.split('\n').filter(line => line.trim() !== '' && !line.trim().startsWith('--'));
  for (const line of lines) {
    try {
      logger.info(`Executando instrução SQL: ${line}`); // Adicione esta declaração de log
      await executeSql(line);
      logger.info(`Instrução SQL executada com sucesso: ${line}`);
    } catch (err) {
      logger.error(`Erro ao executar instrução SQL: ${line}`);
      logger.error(`Erro: ${err.stack}`);
      throw err;
    }
  }
};

const initDatabase = async () => {
  const initialized = await checkDatabaseInitialized();

  if (initialized === false) {
    try {
      for (const file of scriptFiles) {
        const filePath = path.join(__dirname, '..', 'scripts', file);
        logger.info(`Executing SQL script: ${filePath}`);
        await executeSqlFile(filePath);
        logger.info(`Script SQL executado com sucesso: ${filePath}`);
      }
      await markDatabaseInitialized();
      logger.info('Banco de dados Inicializado com Sucesso!');
    } catch (err) {
      logger.error(`Erro ao inicializar o banco de dados: ${err.stack}`);
      process.exit(1);
    }
  } else {
    logger.info('Banco de dados já está carregado! Pulando scripts.');
  }
};

const checkDatabaseInitialized = async () => {
  try {
    const checkTableQuery = `SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'metadata')`;
    const tableExistsResult = await executeSql(checkTableQuery);

    if (!tableExistsResult[0].exists) {
      logger.error('Erro ao verificar se o banco está populado: tabela metadata não existe');
      return false;
    }else {
      return true;
    }
  } catch (err) {
    logger.error(`Erro ao verificar se o banco está populado: ${err.stack}`);
    return false;
  }
};

const markDatabaseInitialized = async () => {
  const query = 'UPDATE metadata SET initialized = TRUE';
  try {
    await executeSql(query);
  } catch (err) {
    logger.error(`Erro ao definir o banco de dados como inicializado: ${err.stack}`);
  }
};

module.exports = initDatabase;