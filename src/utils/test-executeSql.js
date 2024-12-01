// src/utils/test-executeSql.js
const executeSql = require('./executeSql');

async function runTests() {
  try {
    // Teste: Selecionar todos os clientes
    const selectClientsQuery = 'SELECT * FROM clients';
    const clients = await executeSql(selectClientsQuery);
    console.log('All Clients:', clients);

  } catch (err) {
    console.error('Test Error:', err);
  }
}

runTests();