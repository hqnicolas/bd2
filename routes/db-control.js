// routes/db-control.js
const express = require('express');
const router = express.Router();
const dbControlController = require('../controllers/db-control');
const logger = require('../utils/logger');

// Listar todos os functions
router.get('/functions', dbControlController.getFunctions, (req, res, next) => {
  logger.info(`Listando funções`);
  next();
});

// Executar a function
router.post('/functions/execute', dbControlController.executeFunction, (req, res, next) => {
  logger.info(`Function executado: ${req.body.functionName} com parametros: ${JSON.stringify(req.body.parameters)}`);
  next();
});

// Listar todos os índices
router.get('/indices', dbControlController.getIndices, (req, res, next) => {
  logger.info(`Listando índices`);
  next();
});

// Adicionar um índice
router.post('/indices/add', dbControlController.addIndex, (req, res, next) => {
  logger.info(`Index criado: ${req.body.indexName} na tabela: ${req.body.tableName} com as colunas: ${req.body.columns.join(',')}`);
  next();
});

// Excluir um índice
router.post('/indices/delete', dbControlController.deleteIndex, (req, res, next) => {
  logger.info(`Index deletado: ${req.body.indexName}`);
  next();
});

// Listar todos os triggers
router.get('/triggers', dbControlController.getTriggers, (req, res, next) => {
  logger.info(`Listando triggers`);
  next();
});

// Adicionar uma trigger
router.post('/triggers/add', dbControlController.addTrigger, (req, res, next) => {
  logger.info(`Trigger criado: ${req.body.triggerName} na tabela: ${req.body.tableName} para a operação: ${req.body.operation}`);
  next();
});

// Excluir uma trigger
router.post('/triggers/delete', dbControlController.deleteTrigger, (req, res, next) => {
  logger.info(`Trigger deletado: ${req.body.triggerName}`);
  next();
});

// Listar todos os stored procedures
router.get('/stored-procedures', dbControlController.getStoredProcedures, (req, res, next) => {
  logger.info(`Listando stored procedures`);
  next();
});

// Executar um stored procedure
router.post('/stored-procedures/execute', dbControlController.executeStoredProcedure, (req, res, next) => {
  logger.info(`Stored procedure executado: ${req.body.procedureName} com parametros: ${JSON.stringify(req.body.parameters)}`);
  next();
});

// Listar todos os DML statements
router.get('/dml-statements', dbControlController.getDmlStatements, (req, res, next) => {
  logger.info(`Listando DML statements`);
  next();
});

// Executar um DML statement
router.post('/dml-statements/execute', dbControlController.executeDmlStatement, (req, res, next) => {
  logger.info(`DML statement executado: ${req.body.statement}`);
  next();
});

module.exports = router;