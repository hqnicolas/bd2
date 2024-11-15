-- Triggers: Crie gatilhos para ações automatizadas

-- Gatilho para registrar apólices deletados
DROP TRIGGER IF EXISTS td_apolice ON apolices

CREATE TRIGGER td_apolice
AFTER DELETE ON apolices
FOR EACH ROW
EXECUTE FUNCTION log_deleted_apolice()

-- Função para registrar apólices deletados
CREATE OR REPLACE FUNCTION log_deleted_apolice()
RETURNS TRIGGER AS 
BEGIN
    IF TG_NARGS = 0 THEN
        RETURN NULL
    END IF

    INSERT INTO ApoliceLog (numero, data_emissao, data_validade, cobertura, premio, cliente_id, celular_id, deleted_date, deleted_by)
    VALUES (OLD.numero, OLD.data_emissao, OLD.data_validade, OLD.cobertura, OLD.premio, OLD.cliente_id, OLD.celular_id, CURRENT_TIMESTAMP, CURRENT_USER)

    RAISE NOTICE 'O gatilho td_apolice foi executado com sucesso: Apólice(s) excluída(s) registrada(s).'
    
    RETURN OLD
END
