-- Funções: Crie funções para blocos de código reutilizáveis

-- Função para contar o número de apólices para um cliente
DROP FUNCTION IF EXISTS fn_count_apolices;
GO

CREATE FUNCTION fn_count_apolices (@cod_cliente INT)
RETURNS INT
AS
BEGIN
    DECLARE @resultado INT;
    SELECT @resultado = COUNT(id)
    FROM Apólices
    WHERE cliente_id = @cod_cliente;
    RETURN @resultado;
END;
GO

-- Função para calcular a indenização total de um sinistro
DROP FUNCTION IF EXISTS fn_calcular_indenizacao;
GO

CREATE FUNCTION fn_calcular_indenizacao (@sinistro_id INT)
RETURNS DECIMAL(10, 2)
AS
BEGIN
    DECLARE @premio DECIMAL(10, 2);
    DECLARE @valor_indenizacao DECIMAL(10, 2);

    BEGIN TRY
        SELECT @premio = premio FROM Apólices WHERE id IN (SELECT apolice_id FROM Sinistros WHERE id = @sinistro_id);
        SET @valor_indenizacao = @premio * 0.7; -- Exemplo: 70% do prêmio
    END TRY
    BEGIN CATCH
        -- Registre toda a mensagem de erro e rastreie
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;

        SELECT 
            @ErrorMessage = ERROR_MESSAGE(),
            @ErrorSeverity = ERROR_SEVERITY(),
            @ErrorState = ERROR_STATE();

        -- Registre o erro
        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
        RETURN NULL;
    END CATCH

    RETURN @valor_indenizacao;
END;
GO

-- Função para contar o número de clientes de um tipo específico
DROP FUNCTION IF EXISTS fn_count_clientes_tipo;
GO

CREATE FUNCTION fn_count_clientes_tipo (@tipo_cliente NVARCHAR(50))
RETURNS INT
AS
BEGIN
    DECLARE @resultado INT;
    SELECT @resultado = COUNT(id)
    FROM Clientes
    WHERE tipo = @tipo_cliente;
    RETURN @resultado;
END;
GO

-- Função para contar o número de apólices de um tipo específico
DROP FUNCTION IF EXISTS fn_count_apolices_tipo;
GO

CREATE FUNCTION fn_count_apolices_tipo (@tipo_apolice NVARCHAR(50))
RETURNS INT
AS
BEGIN
    DECLARE @resultado INT;
    SELECT @resultado = COUNT(id)
    FROM Apólices
    WHERE tipo = @tipo_apolice;
    RETURN @resultado;
END;
GO

-- Função para contar o número de sinistros de uma categoria específica
DROP FUNCTION IF EXISTS fn_count_sinistros_categoria;
GO

CREATE FUNCTION fn_count_sinistros_categoria (@categoria NVARCHAR(50))
RETURNS INT
AS
BEGIN
    DECLARE @resultado INT;
    SELECT @resultado = COUNT(id)
    FROM Sinistros
    WHERE categoria = @categoria;
    RETURN @resultado;
END;
GO

-- Função para contar o número de pagamentos de um tipo específico
DROP FUNCTION IF EXISTS fn_count_pagamentos_tipo;
GO

CREATE FUNCTION fn_count_pagamentos_tipo (@tipo_pagamento NVARCHAR(50))
RETURNS INT
AS
BEGIN
    DECLARE @resultado INT;
    SELECT @resultado = COUNT(id)
    FROM Pagamentos
    WHERE tipo = @tipo_pagamento;
    RETURN @resultado;
END;
GO

-- Função para contar o número de coberturas de um tipo específico
DROP FUNCTION IF EXISTS fn_count_coberturas_tipo;
GO

CREATE FUNCTION fn_count_coberturas_tipo (@tipo_cobertura NVARCHAR(50))
RETURNS INT
AS
BEGIN
    DECLARE @resultado INT;
    SELECT @resultado = COUNT(id)
    FROM Coberturas
    WHERE tipo = @tipo_cobertura;
    RETURN @resultado;
END;
GO