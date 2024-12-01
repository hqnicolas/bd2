-- Índices: Crie índices para otimização de desempenho

-- Crie índice na coluna imei para pesquisas mais rápidas na tabela Celulares
CREATE INDEX IF NOT EXISTS idx_imei ON Celulares (imei);

-- Crie um índice na coluna cliente_id para pesquisas mais rápidas na tabela Celulares
CREATE INDEX IF NOT EXISTS idx_cliente_id ON Celulares (cliente_id);

-- Crie um índice na coluna apolice_id para pesquisas mais rápidas na tabela Sinistros
CREATE INDEX IF NOT EXISTS idx_apolice_id ON Sinistros (apolice_id);

-- Criar índice na coluna estoque_peca_id para consultas mais rápidas na tabela entradas_pecas
CREATE INDEX IF NOT EXISTS idx_entradas_peças_estoque_peca_id ON entradas_pecas (estoque_peca_id);

-- Criar índice na coluna estoque_peca_id para consultas mais rápidas na tabela saidas_pecas
CREATE INDEX IF NOT EXISTS idx_saidas_pecas_estoque_peca_id ON saidas_pecas (estoque_peca_id);

-- Index aplicado em clients.email
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);

-- Index aplicado em apolices.numero
CREATE INDEX IF NOT EXISTS idx_apolices_numero ON apolices(numero);

-- Index aplicado em apolices.cliente_id
CREATE INDEX IF NOT EXISTS idx_apolices_cliente_id ON apolices(cliente_id);

-- Index aplicado em apolices.celular_id
CREATE INDEX IF NOT EXISTS idx_apolices_celular_id ON apolices(celular_id);

-- Index aplicado em sinistros.apolice_id
CREATE INDEX IF NOT EXISTS idx_sinistros_apolice_id ON sinistros(apolice_id);

-- Index aplicado em entradas_pecas.estoque_peca_id
CREATE INDEX IF NOT EXISTS idx_entradas_pecas_estoque_peca_id ON entradas_pecas(estoque_peca_id);
