// src/routes/db-control.js
const express = require('express');
const router = express.Router();
const dbControlController = require('../controllers/db-control');
const logger = require('../utils/logger');

// Listar todos os functions
router.get('/functions', dbControlController.getFunctions);

// Executar a function
router.post('/functions/execute', async (req, res) => {
  try {
    const { functionName, parameters } = req.body;
    const query = `SELECT ${functionName}(${parameters.join(',')})`;
    logger.info(`Executing function: ${functionName} com parametros: ${JSON.stringify(parameters)}`);
    const result = await dbControlController.executeFunction(query);
    logger.info(`Function ${functionName} executado com sucesso`);
    res.json(result);
  } catch (err) {
    logger.error(`Erro ao executar a função: ${err.stack}`);
    res.status(500).json({ error: 'Erro do Servidor Interno' });
  }
});

// Listar todos os índices
router.get('/indices', async (req, res) => {
  try {
    const indices = await dbControlController.getIndices();
    logger.info('Indices retrieved successfully');
    res.json(indices);
  } catch (err) {
    logger.error(`Erro ao buscar índices: ${err.stack}`);
    res.status(500).json({ error: 'Erro do Servidor Interno' });
  }
});

// Adicionar um índice
router.post('/indices/add', async (req, res) => {
  try {
    const { indexName, tableName, columns } = req.body;
    const query = `CREATE INDEX ${indexName} ON ${tableName} (${columns.join(',')})`;
    logger.info(`Adding index: ${indexName} na tabela: ${tableName} com as colunas: ${columns.join(',')}`);
    await dbControlController.addIndex(query);
    logger.info(`Index ${indexName} added successfully`);
    res.json({ message: 'Índice criado com sucesso' });
  } catch (err) {
    logger.error(`Error adding index: ${err.stack}`);
    res.status(500).json({ error: 'Erro do Servidor Interno' });
  }
});

// Excluir um índice
router.post('/indices/delete', async (req, res) => {
  try {
    const { indexName } = req.body;
    const query = `DROP INDEX ${indexName}`;
    logger.info(`Deleting index: ${indexName}`);
    await dbControlController.deleteIndex(query);
    logger.info(`Index ${indexName} excluído com sucesso`);
    res.json({ message: 'Índice excluído com sucesso' });
  } catch (err) {
    logger.error(`Erro ao excluir índice: ${err.stack}`);
    res.status(500).json({ error: 'Erro do Servidor Interno' });
  }
});

// Listar todos os triggers
router.get('/triggers', async (req, res) => {
  try {
    const triggers = await dbControlController.getTriggers();
    logger.info('Triggers retrieved successfully');
    res.json(triggers);
  } catch (err) {
    logger.error(`Erro ao buscar gatilhos: ${err.stack}`);
    res.status(500).json({ error: 'Erro do Servidor Interno' });
  }
});

// Adicionar uma trigger
router.post('/triggers/add', async (req, res) => {
  try {
    const { triggerName, tableName, operation, action } = req.body;
    const query = `CREATE TRIGGER ${triggerName} AFTER ${operation} ON ${tableName} ${action}`;
    logger.info(`Adding trigger: ${triggerName} na tabela: ${tableName} para a operação: ${operation} with action: ${action}`);
    await dbControlController.addTrigger(query);
    logger.info(`Trigger ${triggerName} added successfully`);
    res.json({ message: 'Trigger criado com sucesso' });
  } catch (err) {
    logger.error(`Error adding trigger: ${err.stack}`);
    res.status(500).json({ error: 'Erro do Servidor Interno' });
  }
});

// Excluir uma trigger
router.post('/triggers/delete', async (req, res) => {
  try {
    const { triggerName } = req.body;
    const query = `DROP TRIGGER ${triggerName}`;
    logger.info(`Deleting trigger: ${triggerName}`);
    await dbControlController.deleteTrigger(query);
    logger.info(`Trigger ${triggerName} excluído com sucesso`);
    res.json({ message: 'Trigger excluído com sucesso' });
  } catch (err) {
    logger.error(`Error deleting trigger: ${err.stack}`);
    res.status(500).json({ error: 'Erro do Servidor Interno' });
  }
});

// Listar todos os stored procedures
router.get('/stored-procedures', async (req, res) => {
  try {
    const procedures = await dbControlController.getStoredProcedures();
    logger.info('Stored procedures retrieved successfully');
    res.json(procedures);
  } catch (err) {
    logger.error(`Erro ao buscar stored procedures: ${err.stack}`);
    res.status(500).json({ error: 'Erro do Servidor Interno' });
  }
});

// Executar um stored procedure
router.post('/stored-procedures/execute', async (req, res) => {
  try {
    const { procedureName, parameters } = req.body;
    const query = `CALL ${procedureName}(${parameters.join(',')})`;
    logger.info(`Executing stored procedure: ${procedureName} com parametros: ${JSON.stringify(parameters)}`);
    const result = await dbControlController.executeStoredProcedure(query);
    logger.info(`Stored procedure ${procedureName} executado com sucesso`);
    res.json(result);
  } catch (err) {
    logger.error(`Erro ao executar stored procedure: ${err.stack}`);
    res.status(500).json({ error: 'Erro do Servidor Interno' });
  }
});

// Listar todos os DML statements
router.get('/dml-statements', async (req, res) => {
  try {
    const dmlStatements = await dbControlController.getDmlStatements();
    logger.info('DML statements retrieved successfully');
    res.json(dmlStatements);
  } catch (err) {
    logger.error(`Erro ao buscar declarações DML: ${err.stack}`);
    res.status(500).json({ error: 'Erro do Servidor Interno' });
  }
});

// Executar um DML statement
router.post('/dml-statements/execute', async (req, res) => {
  try {
    const { statement } = req.body;
    logger.info(`Executing DML statement: ${statement}`);
    const result = await dbControlController.executeDmlStatement(statement);
    logger.info(`DML statement executado com sucesso`);
    res.json(result);
  } catch (err) {
    logger.error(`Erro ao executar DML statement: ${err.stack}`);
    res.status(500).json({ error: 'Erro do Servidor Interno' });
  }
});

module.exports = router;