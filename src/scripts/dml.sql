
-- Instruções DML para gerenciar registros de banco de dados

-- Inserindo dados iniciais
INSERT INTO clients (id, name, email, registration_date, last_login, status)
VALUES (1, 'John Doe', 'john@example.com', '2023-09-01', '2023-09-01', 'active'),
       (2, 'Jane Smith', 'jane@example.com', '2023-09-02', '2023-09-02', 'inactive');

-- Atualizando registros
UPDATE clients
SET status = 'pending'
WHERE last_login < '2023-08-01';

-- Excluindo registros
DELETE FROM clients
WHERE registration_date < '2023-08-01';

-- Selecionando registros
SELECT * FROM clients
WHERE status = 'active';

-- Atualizando registro específico
UPDATE clients
SET email = 'john.new@example.com'
WHERE id = 1;

-- Excluindo registro específico
DELETE FROM clients
WHERE id = 2;

