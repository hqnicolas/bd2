-- Procedimentos armazenados: Crie procedimentos armazenados para encapsular lógica

-- Procedimento armazenado para contar o número de apólices para um cliente
DROP PROCEDURE IF EXISTS pr_count_apolices;
GO

CREATE PROCEDURE pr_count_apolices (@cod_cliente INT, @resultado INT OUTPUT)
AS
BEGIN
    BEGIN TRY
        SELECT @resultado = COUNT(id)
        FROM Apólices
        WHERE cliente_id = @cod_cliente;
        -- Registrar execução bem-sucedida
        PRINT 'Apólices contabilizadas com sucesso para o cliente ' + CAST(@cod_cliente AS VARCHAR(10));
    END TRY
    BEGIN CATCH
        -- Erro de log
        PRINT 'Erro ao contar apólices para cliente: ' + CAST(@cod_cliente AS VARCHAR(10));
        PRINT ERROR_MESSAGE();
        PRINT ERROR_LINE();
        PRINT ERROR_NUMBER();
        -- Defina o resultado como 0 em caso de erro
        SET @resultado = 0;
    END CATCH
END;
GO

-- Procedimento armazenado para calcular a indenização total para um sinistro
DROP PROCEDURE IF EXISTS pr_calcular_indenizacao;
GO

CREATE PROCEDURE pr_calcular_indenizacao (@sinistro_id INT, @valor_indenizacao DECIMAL(10, 2) OUTPUT)
AS
BEGIN
    BEGIN TRY
        DECLARE @premio DECIMAL(10, 2);
        SELECT @premio = premio
        FROM Apólices
        WHERE id IN (SELECT apolice_id FROM Sinistros WHERE id = @sinistro_id);
        
        SET @valor_indenizacao = @premio * 0.7; -- Exemplo: 70% do prêmio
        -- Log de cálculo bem-sucedido
        PRINT 'Indenização calculada com sucesso para sinistro ' + CAST(@sinistro_id AS VARCHAR(10));
    END TRY
    BEGIN CATCH
        -- Erro de log
        PRINT 'Erro ao calcular indenização para sinistro: ' + CAST(@sinistro_id AS VARCHAR(10));
        PRINT ERROR_MESSAGE();
        PRINT ERROR_LINE();
        PRINT ERROR_NUMBER();
        -- Defina o resultado como 0 em caso de erro
        SET @valor_indenizacao = 0;
    END CATCH
END;
GO

-- Procedimento armazenado para contar o número de clientes ativos
DROP PROCEDURE IF EXISTS pr_count_clientes_ativos;
GO

CREATE PROCEDURE pr_count_clientes_ativos (@resultado INT OUTPUT)
AS
BEGIN
    BEGIN TRY
        SELECT @resultado = COUNT(id)
        FROM Clientes
        WHERE status = 'Ativo';
        PRINT 'Clientes ativos contabilizados com sucesso';
    END TRY
    BEGIN CATCH
        PRINT 'Erro ao contar clientes ativos';
        PRINT ERROR_MESSAGE();
        SET @resultado = 0;
    END CATCH
END;
GO

-- Procedimento armazenado para contar o número de apólices ativas
DROP PROCEDURE IF EXISTS pr_count_apolices_ativas;
GO

CREATE PROCEDURE pr_count_apolices_ativas (@resultado INT OUTPUT)
AS
BEGIN
    BEGIN TRY
        SELECT @resultado = COUNT(id)
        FROM Apólices
        WHERE status = 'Ativa';
        PRINT 'Apólices ativas contabilizadas com sucesso';
    END TRY
    BEGIN CATCH
        PRINT 'Erro ao contar apólices ativas';
        PRINT ERROR_MESSAGE();
        SET @resultado = 0;
    END CATCH
END;
GO

-- Procedimento armazenado para contar o número de sinistros em um período
DROP PROCEDURE IF EXISTS pr_count_sinistros_periodo;
GO

CREATE PROCEDURE pr_count_sinistros_periodo (@data_inicio DATE, @data_fim DATE, @resultado INT OUTPUT)
AS
BEGIN
    BEGIN TRY
        SELECT @resultado = COUNT(id)
        FROM Sinistros
        WHERE data_ocorrencia BETWEEN @data_inicio AND @data_fim;
        PRINT 'Sinistros no período contabilizados com sucesso';
    END TRY
    BEGIN CATCH
        PRINT 'Erro ao contar sinistros no período';
        PRINT ERROR_MESSAGE();
        SET @resultado = 0;
    END CATCH
END;
GO

-- Procedimento armazenado para contar o número de pagamentos efetuados em um período
DROP PROCEDURE IF EXISTS pr_count_pagamentos_periodo;
GO

CREATE PROCEDURE pr_count_pagamentos_periodo (@data_inicio DATE, @data_fim DATE, @resultado INT OUTPUT)
AS
BEGIN
    BEGIN TRY
        SELECT @resultado = COUNT(id)
        FROM Pagamentos
        WHERE data_pagamento BETWEEN @data_inicio AND @data_fim;
        PRINT 'Pagamentos no período contabilizados com sucesso';
    END TRY
    BEGIN CATCH
        PRINT 'Erro ao contar pagamentos no período';
        PRINT ERROR_MESSAGE();
        SET @resultado = 0;
    END CATCH
END;
GO

-- Procedimento armazenado para contar coberturas disponíveis para uma apólice
DROP PROCEDURE IF EXISTS pr_count_coberturas_apolice;
GO

CREATE PROCEDURE pr_count_coberturas_apolice (@apolice_id INT, @resultado INT OUTPUT)
AS
BEGIN
    BEGIN TRY
        SELECT @resultado = COUNT(id)
        FROM Coberturas
        WHERE apolice_id = @apolice_id;
        PRINT 'Coberturas para a apólice contabilizadas com sucesso';
    END TRY
    BEGIN CATCH
        PRINT 'Erro ao contar coberturas para a apólice';
        PRINT ERROR_MESSAGE();
        SET @resultado = 0;
    END CATCH
END;
GO