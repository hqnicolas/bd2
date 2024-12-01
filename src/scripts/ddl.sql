-- Tabela: clients
CREATE TABLE IF NOT EXISTS  clients (id SERIAL PRIMARY KEY, nome VARCHAR(255) NOT NULL, cpf VARCHAR(255) UNIQUE NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, telefone VARCHAR(255), endereco VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

-- Tabela: celulares
CREATE TABLE IF NOT EXISTS  celulares (id SERIAL PRIMARY KEY, modelo VARCHAR(255) NOT NULL, imei VARCHAR(255) UNIQUE NOT NULL, valor DECIMAL(10, 2) NOT NULL, cliente_id INTEGER REFERENCES clients(id), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

-- Tabela: apolices
CREATE TABLE IF NOT EXISTS  apolices (id SERIAL PRIMARY KEY, numero VARCHAR(100) UNIQUE NOT NULL, data_emissao TIMESTAMP NOT NULL, data_validade TIMESTAMP NOT NULL, cobertura VARCHAR(255) NOT NULL, premio DECIMAL(10, 2) NOT NULL, cliente_id INTEGER REFERENCES clients(id), celular_id INTEGER REFERENCES celulares(id), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );

-- Tabela: sinistros
CREATE TABLE IF NOT EXISTS  sinistros (id SERIAL PRIMARY KEY, data_registro TIMESTAMP NOT NULL, descricao TEXT NOT NULL, status VARCHAR(50) NOT NULL, valor_indenizacao DECIMAL(10, 2), apolice_id INTEGER REFERENCES apolices(id), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );

-- Tabela: estoque_pecas
CREATE TABLE IF NOT EXISTS  estoque_pecas (id SERIAL PRIMARY KEY, nome_peca VARCHAR(255) NOT NULL, quantidade INTEGER NOT NULL, level_critico INTEGER NOT NULL, valor_unitario DECIMAL(10, 2) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

-- Tabela: entradas_pecas
CREATE TABLE IF NOT EXISTS  entradas_pecas (id SERIAL PRIMARY KEY, data_entrada TIMESTAMP NOT NULL, quantidade INTEGER NOT NULL, estoque_peca_id INTEGER REFERENCES estoque_pecas(id), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );

-- Tabela: saidas_pecas
CREATE TABLE IF NOT EXISTS  saidas_pecas (id SERIAL PRIMARY KEY, data_saida TIMESTAMP NOT NULL, quantidade INTEGER NOT NULL, estoque_peca_id INTEGER REFERENCES estoque_pecas(id), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

-- Tabela: riscos
CREATE TABLE IF NOT EXISTS  riscos (id SERIAL PRIMARY KEY, tipo_risco VARCHAR(255) NOT NULL, taxa_sinistro DECIMAL(10, 2) NOT NULL, cobertura_recomendada VARCHAR(255) NOT NULL, premio_recomendado DECIMAL(10, 2) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

-- Tabela: ApoliceLog
CREATE TABLE IF NOT EXISTS ApoliceLog (  id SERIAL PRIMARY KEY,  numero VARCHAR(50) NOT NULL,  data_emissao DATE NOT NULL,  data_validade DATE NOT NULL,  cobertura VARCHAR(100) NOT NULL,  premio DECIMAL(10, 2) NOT NULL,  cliente_id INTEGER NOT NULL,  celular_id INTEGER NOT NULL,  deleted_date TIMESTAMP NOT NULL,  deleted_by VARCHAR(50) NOT NULL,  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

-- Tabela: metadata
CREATE TABLE IF NOT EXISTS  metadata (initialized BOOLEAN DEFAULT FALSE);