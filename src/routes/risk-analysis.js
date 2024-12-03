const express = require('express');
const router = express.Router();
const riskAnalysisController = require('../controllers/risk-analysis');

// Rota para obter dados de análise de risco
router.get('/risk-analysis', riskAnalysisController.fetchRiskAnalysis);

// Rota para salvar análise de risco
router.post('/risk-analysis/save', riskAnalysisController.saveRiskAnalysis);

module.exports = router;