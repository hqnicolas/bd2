-- Índices: Crie índices para otimização de desempenho

-- Crie índice na coluna imei para pesquisas mais rápidas na tabela Celulares
CREATE INDEX idx_imei ON Celulares (imei)

-- Crie um índice na coluna cliente_id para pesquisas mais rápidas na tabela Celulares
CREATE INDEX idx_cliente_id ON Celulares (cliente_id)

-- Crie um índice na coluna apolice_id para pesquisas mais rápidas na tabela Sinistros
CREATE INDEX idx_apolice_id ON Sinistros (apolice_id)

-- Criar índice na coluna estoque_peca_id para consultas mais rápidas na tabela EntradasPeças
CREATE INDEX idx_estoque_peca_id ON EntradasPeças (estoque_peca_id)

-- Criar índice na coluna estoque_peca_id para consultas mais rápidas na tabela SaídasPeças
CREATE INDEX idx_estoque_peca_id_saida ON SaídasPeças (estoque_peca_id)