// src/controllers/db-control.js
const { Pool } = require('pg');
const logger = require('../utils/logger');
const fs = require('fs');
const path = require('path');
const executeSql = require('../utils/executeSql');

const functionsFilePath = path.join(__dirname, '..', 'scripts', 'functions.sql');
const indicesFilePath = path.join(__dirname, '..', 'scripts', 'indices.sql');
const triggersFilePath = path.join(__dirname, '..', 'scripts', 'triggers.sql');
const storedProceduresFilePath = path.join(__dirname, '..', 'scripts', 'stored_procedures.sql');
const ddlFilePath = path.join(__dirname, '..', 'scripts', 'ddl.sql');
const dmlFilePath = path.join(__dirname, '..', 'scripts', 'dml.sql');

const readSqlFile = (filePath) => {
    return fs.readFileSync(filePath, 'utf8');
};

const executeSqlFile = async (filePath) => {
    const sql = readSqlFile(filePath);
    const lines = sql.split('\n').filter(line => line.trim() !== '' && !line.trim().startsWith('--'));
    const results = [];
    for (const line of lines) {
        const result = await executeSql(line);
        results.push(result);
    }
    return results;
};

const getFunctions = async (req, res) => {
    try {
        const functions = await executeSql('SELECT * FROM pg_proc WHERE proname LIKE \'fn_%\'');
        res.json(functions);
    } catch (err) {
        logger.error(`Erro ao buscar funções: ${err.stack}`);
        res.status(500).json({ error: 'Erro do Servidor Interno' });
    }
};

const executeFunction = async (req, res) => {
    const { functionName, parameters } = req.body;
    const query = `SELECT ${functionName}(${parameters.join(',')})`;
    try {
        const result = await executeSql(query);
        res.json(result);
    } catch (err) {
        logger.error(`Erro ao executar a função ${functionName}: ${err.stack}`);
        res.status(500).json({ error: 'Erro do Servidor Interno' });
    }
};

const getIndices = async (req, res) => {
    try {
        const indices = await executeSql('SELECT * FROM pg_indexes WHERE schemaname = \'public\'');
        res.json(indices);
    } catch (err) {
        logger.error(`Erro ao buscar índices: ${err.stack}`);
        res.status(500).json({ error: 'Erro do Servidor Interno' });
    }
};

const addIndex = async (req, res) => {
    const { indexName, tableName, columns } = req.body;
    const query = `CREATE INDEX ${indexName} ON ${tableName} (${columns.join(',')})`;
    try {
        await executeSql(query);
        res.json({ message: 'Índice criado com sucesso' });
    } catch (err) {
        logger.error(`Erro ao criar índice ${indexName}: ${err.stack}`);
        res.status(500).json({ error: 'Erro do Servidor Interno' });
    }
};

const deleteIndex = async (req, res) => {
    const { indexName } = req.body;
    const query = `DROP INDEX ${indexName}`;
    try {
        await executeSql(query);
        res.json({ message: 'Índice excluído com sucesso' });
    } catch (err) {
        logger.error(`Erro ao excluir índice ${indexName}: ${err.stack}`);
        res.status(500).json({ error: 'Erro do Servidor Interno' });
    }
};

const getTriggers = async (req, res) => {
    try {
        const triggers = await executeSql('SELECT * FROM information_schema.triggers WHERE trigger_schema = \'public\'');
        res.json(triggers);
    } catch (err) {
        logger.error(`Erro ao buscar gatilhos: ${err.stack}`);
        res.status(500).json({ error: 'Erro do Servidor Interno' });
    }
};

const addTrigger = async (req, res) => {
    const { triggerName, tableName, operation, action } = req.body;
    const query = `CREATE TRIGGER ${triggerName} AFTER ${operation} ON ${tableName} ${action}`;
    try {
        await executeSql(query);
        res.json({ message: 'Trigger criado com sucesso' });
    } catch (err) {
        logger.error(`Erro ao criar trigger ${triggerName}: ${err.stack}`);
        res.status(500).json({ error: 'Erro do Servidor Interno' });
    }
};

const deleteTrigger = async (req, res) => {
    const { triggerName } = req.body;
    const query = `DROP TRIGGER ${triggerName}`;
    try {
        await executeSql(query);
        res.json({ message: 'Trigger excluído com sucesso' });
    } catch (err) {
        logger.error(`Erro ao excluir trigger ${triggerName}: ${err.stack}`);
        res.status(500).json({ error: 'Erro do Servidor Interno' });
    }
};

const getStoredProcedures = async (req, res) => {
    try {
        const procedures = await executeSql('SELECT * FROM pg_proc WHERE proname LIKE \'pr_%\'');
        res.json(procedures);
    } catch (err) {
        logger.error(`Erro ao buscar stored procedures: ${err.stack}`);
        res.status(500).json({ error: 'Erro do Servidor Interno' });
    }
};

const executeStoredProcedure = async (req, res) => {
    const { procedureName, parameters } = req.body;
    const query = `CALL ${procedureName}(${parameters.join(',')})`;
    try {
        const result = await executeSql(query);
        res.json(result);
    } catch (err) {
        logger.error(`Erro ao executar stored procedure ${procedureName}: ${err.stack}`);
        res.status(500).json({ error: 'Erro do Servidor Interno' });
    }
};

const getDmlStatements = async (req, res) => {
    try {
        const dmlStatements = readSqlFile(dmlFilePath).split(';').filter(line => line.trim() !== '');
        res.json(dmlStatements);
    } catch (err) {
        logger.error(`Erro ao buscar declarações DML: ${err.stack}`);
        res.status(500).json({ error: 'Erro do Servidor Interno' });
    }
};

const executeDmlStatement = async (req, res) => {
    const { statement } = req.body;
    try {
        const result = await executeSql(statement);
        res.json(result);
    } catch (err) {
        logger.error(`Erro ao executar DML statement: ${err.stack}`);
        res.status(500).json({ error: 'Erro do Servidor Interno' });
    }
};

module.exports = {
    getFunctions,
    executeFunction,
    getIndices,
    addIndex,
    deleteIndex,
    getTriggers,
    addTrigger,
    deleteTrigger,
    getStoredProcedures,
    executeStoredProcedure,
    getDmlStatements,
    executeDmlStatement,
};