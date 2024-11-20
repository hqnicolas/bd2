// src/utils/test-executeSql.js
const executeSql = require('./executeSql');

async function runTests() {
  try {
    // // Test 1: Insert a client
    // const insertClientQuery = 'INSERT INTO clients (nome, cpf, email, telefone, endereco) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    // const insertClientValues = ['Test Client', '12345678901', 'test@example.com', '(11) 1234-5678', 'Test Address'];
    // const insertedClient = await executeSql(insertClientQuery, insertClientValues);
    // console.log('Inserted Client:', insertedClient);

    // Test 2: Select all clients
    const selectClientsQuery = 'SELECT * FROM clients';
    const clients = await executeSql(selectClientsQuery);
    console.log('All Clients:', clients);

    // // Test 3: Update a client
    // const updateClientQuery = 'UPDATE clients SET nome = $1 WHERE id = $2 RETURNING *';
    // const updateClientValues = ['Updated Client', insertedClient[0].id];
    // const updatedClient = await executeSql(updateClientQuery, updateClientValues);
    // console.log('Updated Client:', updatedClient);

    // // Test 4: Delete a client
    // const deleteClientQuery = 'DELETE FROM clients WHERE id = $1 RETURNING *';
    // const deleteClientValues = [insertedClient[0].id];
    // const deletedClient = await executeSql(deleteClientQuery, deleteClientValues);
    // console.log('Deleted Client:', deletedClient);
  } catch (err) {
    console.error('Test Error:', err);
  }
}

runTests();