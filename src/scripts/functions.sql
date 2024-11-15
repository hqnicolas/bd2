-- Função para contar o número de apólices para um cliente
CREATE OR REPLACE FUNCTION fn_count_apolices(cod_cliente INT)
RETURNS INT AS $$
BEGIN
    RETURN (SELECT COUNT(id) FROM apolices WHERE cliente_id = cod_cliente)
END


-- Função para calcular a indenização total de um sinistro
CREATE OR REPLACE FUNCTION fn_calcular_indenizacao(sinistro_id INT)
RETURNS DECIMAL(10, 2) AS $$
DO $$
DECLARE
    premio DECIMAL(10,2)
    valor_indenizacao DECIMAL(10,2)
    sinistro_id INT := 1  -- Substitua pelo ID do sinistro desejado
BEGIN
    SELECT a.premio INTO premio 
    FROM apolices a
    JOIN sinistros s ON a.id = s.apolice_id
    WHERE s.id = sinistro_id

    valorindenizacao := premio * 0.7

    RAISE NOTICE 'Valor da indenização: %', valor_indenizacao
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE NOTICE 'Nenhum dado encontrado.'
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error calculating indemnity: %', SQLERRM
END $$


-- Função para contar o número de clientes de um tipo específico
CREATE OR REPLACE FUNCTION fn_count_clientes_tipo(tipo_cliente VARCHAR(50))
RETURNS INT AS $$
BEGIN
    RETURN (SELECT COUNT(id) FROM Clientes WHERE tipo = tipo_cliente)
END


-- Função para contar o número de apólices de um tipo específico
CREATE OR REPLACE FUNCTION fn_count_apolices_tipo(tipo_apolice VARCHAR(50))
RETURNS INT AS $$
BEGIN
    RETURN (SELECT COUNT(id) FROM apolices WHERE tipo = tipo_apolice)
END


-- Função para contar o número de sinistros de uma categoria específica
CREATE OR REPLACE FUNCTION fn_count_sinistros_categoria(categoria VARCHAR(50))
RETURNS INT AS $$
BEGIN
    RETURN (SELECT COUNT(id) FROM Sinistros WHERE categoria = categoria)
END


-- Função para contar o número de pagamentos de um tipo específico
CREATE OR REPLACE FUNCTION fn_count_pagamentos_tipo(tipo_pagamento VARCHAR(50))
RETURNS INT AS $$
BEGIN
    RETURN (SELECT COUNT(id) FROM Pagamentos WHERE tipo = tipo_pagamento)
END


-- Função para contar o número de coberturas de um tipo específico
CREATE OR REPLACE FUNCTION fn_count_coberturas_tipo(tipo_cobertura VARCHAR(50))
RETURNS INT AS $$
BEGIN
    RETURN (SELECT COUNT(id) FROM Coberturas WHERE tipo = tipo_cobertura)
END
