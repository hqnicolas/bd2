// src/routes/inventory.js
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory');

// Rota para obter dados de inventário
router.get('/inventory', inventoryController.getInventory);

// Rota para obter dados de entradas
router.get('/inventory/entries', inventoryController.getEntries);

// Rota para obter dados de saídas
router.get('/inventory/exits', inventoryController.getExits);

module.exports = router;
