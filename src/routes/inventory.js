// src/routes/inventory.js
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory');

// Route to get inventory data
router.get('/inventory', inventoryController.getInventory);

// Route to get entries data
router.get('/inventory/entries', inventoryController.getEntries);

// Route to get exits data
router.get('/inventory/exits', inventoryController.getExits);

module.exports = router;
