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
Arquivo fonte: [Modelo Fisico](/docs/fisico.png).<br>

  
### Dicionário de Dados
As informações sobre as tabelas e índices foram documentados na [Tabela](docs/dicionario%20de%20dados%20bd2.xlsx).

### Scripts SQL
Para este projeto foi utilizado o banco de dados [Postgress](docker-compose.yml) <br>
O CRUD backend chama as [funções](src/scripts/functions.sql), [DML's](src/scripts/dml.sql) [Indices](src/scripts/indices.sql), [Store Procedures](src/scripts/stored_procedures.sql) e [Triggers](src/scripts/triggers.sql)

Abaixo, segue os scripts SQL separados por tipo:
+ DDL [ddl.sql](/src/scripts/ddl.sql)
+ Índices [indices.sql](/src/scripts/indices.sql)
+ DML [dml.sql](/src/scripts/dml.sql)
+ Triggers [triggers.sql](/src/scripts/triggers.sql)
+ Stored Procedures [stored_procedures.sql](/src/scripts/stored_procedures.sql)
+ Functions [functions.sql](/src/scripts/functions.sql)

### Código Fonte do CRUD
- Linguagem de Programação <br>
- Framework
- Projeto 
- Biblioteca (nativo)

[Codigo Fonte](/app.js)

### Modelo de negócio
O modelo de negócio está disponível no arquivo [Sobre](docs/BUSINESS.md).

### Relatório Final
O relatório final está disponível no arquivo [descrição do projeto](/docs/ABOUT_PROJECT.md).
