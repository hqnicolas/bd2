## Projeto Sistema de seguro para celulares - GRUPO C

### Integrantes

- YASMIN FONTANA - @bfontanayasmin<br>
- FELIPE SATURNO - @f2004felipe<br>
- NICOLAS PEREIRA - @hqnicolas<br>
- CLEITON LINO RODRIGUES - @TonClei91<br>
- AXEL FILASTRO - @Axelfilastro<br>
- EVANDRO LUIZ RODRIGUES DAMAZIO @evandroluizrd<br>

---

### Modelo Físico
Utilizamos a ferramenta de modelagem de dados [dbdiagram.io](https://dbdiagram.io/) para criação do modelo físico do banco de dados, para posterior exportação dos scripts DDL das tabelas e relacionamentos.<br>
Arquivo fonte: [Modelo Fisico](https://github.com/hqnicolas/bd2/blob/main/DB_DIAGRAM.md).<br>

  
### Dicionário de Dados
As informações sobre as tabelas e índices foram documentados na planilha [template1.xlsx](dicionario_dados/template1.xlsx).

### Scripts SQL
Para este projeto foi utilizado o banco de dados [Postgress](https://github.com/hqnicolas/bd2/blob/main/docker-compose.yml) <br>
O CRUD backend chama as [funções](https://github.com/hqnicolas/bd2/blob/main/src/scripts/functions.sql), [DML's](https://github.com/hqnicolas/bd2/blob/main/src/scripts/dml.sql) [Indices](https://github.com/hqnicolas/bd2/blob/main/src/scripts/indices.sql), [Store Procedures](https://github.com/hqnicolas/bd2/blob/main/src/scripts/stored_procedures.sql) e [Triggers](https://github.com/hqnicolas/bd2/blob/main/src/scripts/triggers.sql)

Abaixo, segue os scripts SQL separados por tipo:
+ DDL [ddl.sql](/src/scripts/dml.sql)
+ Índices [indices.sql](/src/scripts/indices.sql)
+ DML [dml.sql](/src/scripts/dml.sql)
+ Triggers [triggers.sql](/src/scripts/triggers.sql)
+ Stored Procedures [stored_procedures.sql](/src/scripts/stored_procedures.sql)
+ Functions [functions.sql](/src/scripts_sql/functions.sql)

### Código Fonte do CRUD
- Linguagem de Programação <br>
- Framework
- Projeto 
- Biblioteca (nativo)

[Codigo Fonte](fonte/)

### Modelo de negócio
O modelo de negócio está disponível no arquivo [template1.docx](ABOUT_US.md).

### Relatório Final
O relatório final está disponível no arquivo [template1.docx](relatorio/template1.docx).
