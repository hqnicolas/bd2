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

  if (initialized) {
    logger.info('Database already initialized. Skipping initialization.');
    return;
  }else{
    try {
      for (const file of scriptFiles) {
        const filePath = path.join(__dirname, '..', 'scripts', file);
        logger.info(`Executing SQL script: ${filePath}`);
        await executeSqlFile(filePath);
        logger.info(`Script SQL executado com sucesso: ${filePath}`);
      }
      await markDatabaseInitialized();
      logger.info('Database initialized successfully');
    } catch (err) {
      logger.error(`Erro ao inicializar o banco de dados: ${err.stack}`);
      process.exit(1);
    }
  }
};

const checkDatabaseInitialized = async () => {
    try {
  const query = 'SELECT initialized FROM metadata';
  const result = await executeSql(query);
  return result.rows[0] && result.rows[0].initialized === true;
    } catch (err) {
       return false;
    }
};

const markDatabaseInitialized = async () => {
  const query = 'UPDATE metadata SET initialized = TRUE';
  await executeSql(query);
};

module.exports = initDatabase;