-- Quantas apólices foram excluídas no último semestre e quais os detalhes registrados no log de exclusões?
SELECT 
    COUNT(*) AS total_excluidas, 
    cliente_id, 
    cobertura, 
    premio, 
    deleted_date, 
    deleted_by
FROM 
    ApoliceLog
WHERE 
    deleted_date >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '6 months'
GROUP BY 
    cliente_id, 
    cobertura, 
    premio, 
    deleted_date, 
    deleted_by
ORDER BY 
    deleted_date DESC;


-- Qual é o impacto financeiro acumulado de apólices deletadas, considerando as coberturas e prêmios associados? 
-- Consulta para calcular o impacto financeiro acumulado das apólices excluídas
SELECT 
    SUM(premio) AS impacto_financeiro, 
    cobertura, 
    COUNT(*) AS total_apolices
FROM 
    ApoliceLog
GROUP BY 
    cobertura
ORDER BY 
    impacto_financeiro DESC;

-- O cliente teve algum sinistro registrado no ano anterior e qual foi o impacto financeiro associado? 
SELECT 
    c.nome AS cliente_nome, 
    COUNT(s.id) AS total_sinistros, 
    SUM(s.valor_indenizacao) AS impacto_financeiro
FROM 
    clients c
LEFT JOIN 
    apolices a ON c.id = a.cliente_id
LEFT JOIN 
    sinistros s ON a.id = s.apolice_id 
    AND EXTRACT(YEAR FROM s.data_registro) = EXTRACT(YEAR FROM CURRENT_DATE) - 1
WHERE 
    c.id = 20 -- Substitua pelo ID do cliente desejado
GROUP BY 
    c.nome;

-- Quais clientes possuem apólices expiradas ou que irão expirar no mês vigente?
SELECT 
    c.nome AS cliente, 
    c.email, 
    c.telefone, 
    a.numero AS apolice_numero, 
    a.data_validade
FROM 
    clients c
JOIN 
    apolices a ON c.id = a.cliente_id
WHERE 
    a.data_validade < CURRENT_DATE -- Apólices já expiradas
    OR (
        EXTRACT(YEAR FROM a.data_validade) = EXTRACT(YEAR FROM CURRENT_DATE)
        AND EXTRACT(MONTH FROM a.data_validade) = EXTRACT(MONTH FROM CURRENT_DATE)
    ); -- Expiram no mês vigente
    
    
    
    
    --Qual o período médio (em dias) de vigência das apólices excluídas no último ano?
SELECT
AVG((data_validade - data_emissao)) AS periodo_medio_vigencia
FROM
ApoliceLog
WHERE
deleted_date BETWEEN CURRENT_DATE - INTERVAL '1 year' AND CURRENT_DATE;



--Consulta: Quais são os 10 clientes com maior número de apólices ativas?
select c.nome AS cliente, COUNT(a.id) AS total_apolices
from 
clients c join apolices a ON c.id = a.cliente_id
where 
a.data_validade >= CURRENT_DATE GROUP by c.nome 
ORDER by total_apolices DESC
LIMIT 10;
