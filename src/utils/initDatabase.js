// src/utils/initDatabase.js
const fs = require('fs');
const path = require('path');
const executeSql = require('./executeSql');
const logger = require('./logger');

const scriptsDirectory = path.join(__dirname, '..', 'scripts');

const readSqlFile = (filePath) => {
  return fs.readFileSync(filePath, 'utf8');
};

const executeSqlFile = async (filePath) => {
  const sql = readSqlFile(filePath);
  const lines = sql.split(';').filter(line => line.trim() !== '' && !line.trim().startsWith('--'));
  for (const line of lines) {
    try {
      await executeSql(line);
      logger.info(`Executed SQL statement: ${line.trim()}`);
    } catch (err) {
      logger.error(`Error executing SQL statement: ${err.stack}`);
      throw err;
    }
  }
};

const initDatabase = async () => {
  const files = [
    'ddl.sql',
    'functions.sql',
    'indices.sql',
    'stored_procedures.sql',
    'triggers.sql',
  ];

  for (const file of files) {
    const filePath = path.join(scriptsDirectory, file);
    logger.info(`Executing SQL file: ${filePath}`);
    await executeSqlFile(filePath);
  }

  // Set the flag to true after initialization
  process.env.DB_INITIALIZED = 'true';
  logger.info('Database initialization completed successfully');
};

module.exports = initDatabase;