const executeSql = require('../utils/executeSql');
const logger = require('../utils/logger');

const getInventory = async (req, res) => {
  try {
    const query = 'SELECT id, nome_peca, quantidade, level_critico, valor_unitario FROM estoque_pecas';
    const result = await executeSql(query);
    logger.info('Dados de inventário obtidos com sucesso');
    res.json(result);
  } catch (err) {
    logger.error(`Erro ao buscar dados de inventário: ${err.stack}`);
    res.status(500).json({ error: 'Erro interno do backend' });
  }
};

const getEntries = async (req, res) => {
  try {
    const query = 'SELECT id, data_entrada, quantidade, estoque_peca_id FROM entradas_pecas';
    const result = await executeSql(query);
    logger.info('Dados de entradas obtidos com sucesso');
    res.json(result);
  } catch (err) {
    logger.error(`Erro ao buscar dados de entradas: ${err.stack}`);
    res.status(500).json({ error: 'Erro interno do backend' });
  }
};

const getExits = async (req, res) => {
  try {
    const query = 'SELECT id, data_saida, quantidade, estoque_peca_id FROM saidas_pecas';
    const result = await executeSql(query);
    logger.info('Dados de saída obtidos com sucesso');
    res.json(result);
  } catch (err) {
    logger.error(`Erro ao buscar dados de saídas: ${err.stack}`);
    res.status(500).json({ error: 'Erro interno do backend' });
  }
};

const addInventoryItem = async (req, res) => {
  const { phoneModel, imeiNumber, phoneStatus, observations } = req.body;
  const query = 'INSERT INTO estoque_pecas (nome_peca, imei_number, phone_status, observations) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [phoneModel, imeiNumber, phoneStatus, observations];
  try {
    const result = await executeSql(query, values);
    logger.info('Item adicionado ao inventário com sucesso');
    res.json(result[0]);
  } catch (err) {
    logger.error(`Erro ao adicionar item ao inventário: ${err.stack}`);
    res.status(500).json({ error: 'Erro interno do backend' });
  }
};

module.exports = {
  getInventory,
  getEntries,
  getExits,
  addInventoryItem,
};