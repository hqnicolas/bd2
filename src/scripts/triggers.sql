-- Triggers: Crie gatilhos para ações automatizadas

-- Gatilho para registrar apolices deletados
DROP TRIGGER IF EXISTS td_apolice;
GO

CREATE TRIGGER td_apolice ON Apólices AFTER DELETE
AS
BEGIN
    IF @@ROWCOUNT = 0
        RETURN;

    INSERT INTO ApoliceLog (numero, data_emissao, data_validade, cobertura, premio, cliente_id, celular_id, deleted_date, deleted_by)
    SELECT numero, data_emissao, data_validade, cobertura, premio, cliente_id, celular_id, GETDATE(), SUSER_NAME()
    FROM deleted;

    PRINT 'O gatilho td_apolice foi executado com sucesso: Segurança(ões) excluída(s) registrada(s).';
END;
GO
