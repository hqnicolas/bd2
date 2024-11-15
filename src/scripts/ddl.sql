-- Tabela: clients
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(255),
    endereco VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

-- Tabela: celulares
CREATE TABLE celulares (
    id SERIAL PRIMARY KEY,
    modelo VARCHAR(255) NOT NULL,
    imei VARCHAR(255) UNIQUE NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    cliente_id INTEGER REFERENCES clients(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

-- Tabela: apolices
CREATE TABLE apolices (
    id SERIAL PRIMARY KEY,
    numero VARCHAR(100) UNIQUE NOT NULL,
    data_emissao TIMESTAMP NOT NULL,
    data_validade TIMESTAMP NOT NULL,
    cobertura VARCHAR(255) NOT NULL,
    premio DECIMAL(10, 2) NOT NULL,
    cliente_id INTEGER REFERENCES clients(id),
    celular_id INTEGER REFERENCES celulares(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

-- Tabela: sinistros
CREATE TABLE sinistros (
    id SERIAL PRIMARY KEY,
    data_registro TIMESTAMP NOT NULL,
    descricao TEXT NOT NULL,
    status VARCHAR(50) NOT NULL,
    valor_indenizacao DECIMAL(10, 2),
    apolice_id INTEGER REFERENCES apolices(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

-- Tabela: estoque_peças
CREATE TABLE estoque_peças (
    id SERIAL PRIMARY KEY,
    nome_peca VARCHAR(255) NOT NULL,
    quantidade INTEGER NOT NULL,
    level_critico INTEGER NOT NULL,
    valor_unitario DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

-- Tabela: entradas_peças
CREATE TABLE entradas_peças (
    id SERIAL PRIMARY KEY,
    data_entrada TIMESTAMP NOT NULL,
    quantidade INTEGER NOT NULL,
    estoque_peca_id INTEGER REFERENCES estoque_peças(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

-- Tabela: saidas_peças
CREATE TABLE saidas_peças (
    id SERIAL PRIMARY KEY,
    data_saida TIMESTAMP NOT NULL,
    quantidade INTEGER NOT NULL,
    estoque_peca_id INTEGER REFERENCES estoque_peças(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

-- Tabela: riscos
CREATE TABLE riscos (
    id SERIAL PRIMARY KEY,
    tipo_risco VARCHAR(255) NOT NULL,
    taxa_sinistro DECIMAL(10, 2) NOT NULL,
    cobertura_recomendada VARCHAR(255) NOT NULL,
    premio_recomendado DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

-- Index on clients.email
CREATE INDEX idx_clients_email ON clients(email)

-- Index on celulares.imei
CREATE INDEX idx_celulares_imei ON celulares(imei)

-- Index on celulares.cliente_id
CREATE INDEX idx_celulares_cliente_id ON celulares(cliente_id)

-- Index on apolices.numero
CREATE INDEX idx_apolices_numero ON apolices(numero)

-- Index on apolices.cliente_id
CREATE INDEX idx_apolices_cliente_id ON apolices(cliente_id)

-- Index on apolices.celular_id
CREATE INDEX idx_apolices_celular_id ON apolices(celular_id)

-- Index on sinistros.apolice_id
CREATE INDEX idx_sinistros_apolice_id ON sinistros(apolice_id)

-- Index on entradas_peças.estoque_peca_id
CREATE INDEX idx_entradas_peças_estoque_peca_id ON entradas_peças(estoque_peca_id)

-- Index on saidas_peças.estoque_peca_id
CREATE INDEX idx_saidas_peças_estoque_peca_id ON saidas_peças(estoque_peca_id)

-- Trigger to log deleted policies
CREATE TRIGGER td_apolice
AFTER DELETE ON apolices
FOR EACH ROW
EXECUTE FUNCTION log_deleted_policy()

-- Add any other DDL statements here