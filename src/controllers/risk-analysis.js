const executeSql = require('../utils/executeSql');
const logger = require('../utils/logger');

const fetchRiskAnalysis = async (req, res) => {
  try {
    const query = 'SELECT * FROM risk_analysis';
    const result = await executeSql(query);
    logger.info('Dados de análise de risco obtidos com sucesso');
    res.json(result);
  } catch (err) {
    logger.error(`Erro ao buscar dados de análise de risco: ${err.stack}`);
    res.status(500).json({ error: 'Erro interno do backend' });
  }
};

const saveRiskAnalysis = async (req, res) => {
  const { policyNumber, insuredName, phoneModel, damageReported, riskLevel, premiumAdjustment, riskNotes } = req.body;
  const query = 'INSERT INTO risk_analysis (policy_number, insured_name, phone_model, damage_reported, risk_level, premium_adjustment, risk_notes) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const values = [policyNumber, insuredName, phoneModel, damageReported, riskLevel, premiumAdjustment, riskNotes];
  try {
    const result = await executeSql(query, values);
    logger.info('Análise de risco salva com sucesso');
    res.json(result[0]);
  } catch (err) {
    logger.error(`Erro ao salvar análise de risco: ${err.stack}`);
    res.status(500).json({ error: 'Erro interno do backend' });
  }
};

module.exports = {
  fetchRiskAnalysis,
  saveRiskAnalysis,
};