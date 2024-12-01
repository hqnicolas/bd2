-- Função para contar o número de apólices para um cliente
CREATE OR REPLACE FUNCTION fn_count_apolices(cod_cliente INT) RETURNS INT AS $$ BEGIN     RETURN (SELECT COUNT(id) FROM apolices WHERE cliente_id = cod_cliente); END $$ LANGUAGE plpgsql;

-- Função para contar o número de clientes de um tipo específico
CREATE OR REPLACE FUNCTION fn_count_clientes_tipo(tipo_cliente VARCHAR(50)) RETURNS INT AS $$ BEGIN     RETURN (SELECT COUNT(id) FROM Clientes WHERE tipo = tipo_cliente); END $$ LANGUAGE plpgsql;

-- Função para contar o número de apólices de um tipo específico
CREATE OR REPLACE FUNCTION fn_count_apolices_tipo(tipo_apolice VARCHAR(50)) RETURNS INT AS $$ BEGIN     RETURN (SELECT COUNT(id) FROM apolices WHERE tipo = tipo_apolice); END $$ LANGUAGE plpgsql;

-- Função para contar o número de sinistros de uma categoria específica
CREATE OR REPLACE FUNCTION fn_count_sinistros_categoria(categoria VARCHAR(50)) RETURNS INT AS $$ BEGIN     RETURN (SELECT COUNT(id) FROM Sinistros WHERE categoria = categoria); END $$ LANGUAGE plpgsql;

-- Função para contar o número de pagamentos de um tipo específico
CREATE OR REPLACE FUNCTION fn_count_pagamentos_tipo(tipo_pagamento VARCHAR(50)) RETURNS INT AS $$ BEGIN     RETURN (SELECT COUNT(id) FROM Pagamentos WHERE tipo = tipo_pagamento); END $$ LANGUAGE plpgsql;

-- Função para contar o número de coberturas de um tipo específico
CREATE OR REPLACE FUNCTION fn_count_coberturas_tipo(tipo_cobertura VARCHAR(50)) RETURNS INT AS $$ BEGIN     RETURN (SELECT COUNT(id) FROM Coberturas WHERE tipo = tipo_cobertura); END $$ LANGUAGE plpgsql;

-- Função para prevenir cpf duplicado na tabela clients
CREATE OR REPLACE FUNCTION prevent_duplicate_client_cpf()  RETURNS TRIGGER AS $$ BEGIN     IF EXISTS (SELECT 1 FROM clients WHERE cpf = NEW.cpf) THEN         RETURN NULL;     ELSE         RETURN NEW;     END IF; END $$ LANGUAGE plpgsql;

-- Função para prevenir imei duplicado na tabela celulares
CREATE OR REPLACE FUNCTION prevent_duplicate_celular_imei()  RETURNS TRIGGER AS $$ BEGIN     IF EXISTS (SELECT 1 FROM celulares WHERE imei = NEW.imei) THEN         RETURN NULL;     ELSE         RETURN NEW;     END IF; END $$ LANGUAGE plpgsql;

-- Função para prevenir número duplicado na tabela apolices
CREATE OR REPLACE FUNCTION prevent_duplicate_apolice_numero()  RETURNS TRIGGER AS $$ BEGIN     IF EXISTS (SELECT 1 FROM apolices WHERE numero = NEW.numero) THEN         RETURN NULL;     ELSE         RETURN NEW;     END IF; END $$ LANGUAGE plpgsql;

-- Função para registrar apólices deletadas
CREATE OR REPLACE FUNCTION log_deleted_apolice() RETURNS TRIGGER AS $$ BEGIN     INSERT INTO ApoliceLog (         numero,          data_emissao,          data_validade,          cobertura,          premio,          cliente_id,          celular_id,          deleted_date,          deleted_by     ) VALUES (         OLD.numero,          OLD.data_emissao,          OLD.data_validade,          OLD.cobertura,          OLD.premio,          OLD.cliente_id,          OLD.celular_id,          CURRENT_TIMESTAMP,          CURRENT_USER     );     RAISE NOTICE 'O gatilho td_apolice foi executado com sucesso: Apólice(s) excluída(s) registrada(s).';          RETURN OLD; END $$ LANGUAGE plpgsql;
