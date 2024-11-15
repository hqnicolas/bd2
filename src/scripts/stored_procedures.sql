-- Procedimento armazenado para calcular indenização
CREATE OR REPLACE FUNCTION pr_calcular_indenizacao(sinistro_id INT) RETURNS DECIMAL(10, 2) AS 
DECLARE
    premio DECIMAL(10, 2)
    valor_indenizacao DECIMAL(10, 2)
BEGIN
    -- Tentativa de cálculo da indenização
    BEGIN
        SELECT premio INTO premio
        FROM apolices
        WHERE id IN (SELECT apolice_id FROM Sinistros WHERE id = sinistro_id)
        
        valor_indenizacao := premio * 0.7 -- Exemplo: 70% do prêmio
        -- Log de cálculo bem-sucedido
        RAISE NOTICE 'Indenização calculada com sucesso para sinistro %', sinistro_id
    EXCEPTION
        WHEN OTHERS THEN
            -- Erro de log
            RAISE NOTICE 'Erro ao calcular indenização para sinistro: %', sinistro_id
            RAISE NOTICE '%', SQLERRM
            RAISE NOTICE '%', SQLSTATE
            -- Defina o resultado como 0 em caso de erro
            valor_indenizacao := 0
    END
    RETURN valor_indenizacao
END


-- Procedimento armazenado para contar o número de clientes ativos
CREATE OR REPLACE FUNCTION pr_count_clientes_ativos() RETURNS INT AS 
DECLARE
    resultado INT
BEGIN
    -- Tentativa de contar clientes ativos
    BEGIN
        SELECT COUNT(id) INTO resultado
        FROM Clientes
        WHERE status = 'Ativo'
        -- Log de contabilização bem-sucedida
        RAISE NOTICE 'Clientes ativos contabilizados com sucesso'
    EXCEPTION
        WHEN OTHERS THEN
            -- Erro de log
            RAISE NOTICE 'Erro ao contar clientes ativos'
            RAISE NOTICE '%', SQLERRM
            resultado := 0
    END
    RETURN resultado
END


-- Procedimento armazenado para contar pagamentos em um período
CREATE OR REPLACE FUNCTION pr_count_pagamentos_periodo(data_inicio DATE, data_fim DATE) RETURNS INT AS 
DECLARE
    resultado INT
BEGIN
    -- Tentativa de contar pagamentos no período
    BEGIN
        SELECT COUNT(id) INTO resultado
        FROM Pagamentos
        WHERE data_pagamento BETWEEN data_inicio AND data_fim
        -- Log de contabilização bem-sucedida
        RAISE NOTICE 'Pagamentos no período contabilizados com sucesso'
    EXCEPTION
        WHEN OTHERS THEN
            -- Erro de log
            RAISE NOTICE 'Erro ao contar pagamentos no período'
            RAISE NOTICE '%', SQLERRM
            resultado := 0
    END
    RETURN resultado
END


-- Procedimento armazenado para contar coberturas disponíveis para uma apólice
CREATE OR REPLACE FUNCTION pr_count_coberturas_apolice(apolice_id INT) RETURNS INT AS 
DECLARE
    resultado INT
BEGIN
    -- Tentativa de contar coberturas para a apólice
    BEGIN
        SELECT COUNT(id) INTO resultado
        FROM Coberturas
        WHERE apolice_id = apolice_id
        -- Log de contabilização bem-sucedida
        RAISE NOTICE 'Coberturas para a apólice contabilizadas com sucesso'
    EXCEPTION
        WHEN OTHERS THEN
            -- Erro de log
            RAISE NOTICE 'Erro ao contar coberturas para a apólice'
            RAISE NOTICE '%', SQLERRM
            resultado := 0
    END
    RETURN resultado
END


-- Procedimento armazenado para contar o número de apólices ativas
CREATE OR REPLACE FUNCTION pr_count_apolices_ativas() RETURNS INT AS 
DECLARE
    resultado INT
BEGIN
    -- Tentativa de contar apólices ativas
    BEGIN
        SELECT COUNT(id) INTO resultado
        FROM apolices
        WHERE status = 'Ativa'
        -- Log de contabilização bem-sucedida
        RAISE NOTICE 'Apolices ativas contabilizadas com sucesso'
    EXCEPTION
        WHEN OTHERS THEN
            -- Erro de log
            RAISE NOTICE 'Erro ao contar apólices ativas'
            RAISE NOTICE '%', SQLERRM
            resultado := 0
    END
    RETURN resultado
END


-- Procedimento armazenado para contar o número de sinistros em um período
CREATE OR REPLACE FUNCTION pr_count_sinistros_periodo(data_inicio DATE, data_fim DATE) RETURNS INT AS 
DECLARE
    resultado INT
BEGIN
    -- Tentativa de contar sinistros no período
    BEGIN
        SELECT COUNT(id) INTO resultado
        FROM Sinistros
        WHERE data_ocorrencia BETWEEN data_inicio AND data_fim
        -- Log de contabilização bem-sucedida
        RAISE NOTICE 'Sinistros no período contabilizados com sucesso'
    EXCEPTION
        WHEN OTHERS THEN
            -- Erro de log
            RAISE NOTICE 'Erro ao contar sinistros no período'
            RAISE NOTICE '%', SQLERRM
            resultado := 0
    END
    RETURN resultado
END


-- Procedimento armazenado para contar o número de apólices para um cliente
CREATE OR REPLACE FUNCTION pr_count_apolices(cod_cliente INT) RETURNS INT AS 
DECLARE
    resultado INT
BEGIN
    -- Tentativa de contar apólices para o cliente
    BEGIN
        SELECT COUNT(id) INTO resultado
        FROM apolices
        WHERE cliente_id = cod_cliente
        -- Log de contabilização bem-sucedida
        RAISE NOTICE 'Apolices contabilizadas com sucesso para o cliente %', cod_cliente
    EXCEPTION
        WHEN OTHERS THEN
            -- Erro de log
            RAISE NOTICE 'Erro ao contar apólices para cliente: %', cod_cliente
            RAISE NOTICE '%', SQLERRM
            RAISE NOTICE '%', SQLSTATE
            resultado := 0
    END
    RETURN resultado
END
