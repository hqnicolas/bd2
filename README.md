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
Arquivo fonte: [Modelo Fisico]([/DB_DIAGRAM.md](https://private-user-images.githubusercontent.com/11825574/389292181-029ee14f-ad71-4f57-ac3b-22e2ec3c1abb.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzMyNzAxNDQsIm5iZiI6MTczMzI2OTg0NCwicGF0aCI6Ii8xMTgyNTU3NC8zODkyOTIxODEtMDI5ZWUxNGYtYWQ3MS00ZjU3LWFjM2ItMjJlMmVjM2MxYWJiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMDMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjAzVDIzNTA0NFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTI4ZmIzZjBjYTliODY4NWE2MTg4ZTA1NWQ0ZTA4MjU5MDRmZGYyNDA2YmNlZjU5ZDBlMjkyMTRmNGEyMDEwMGQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.ed6LfvpZUfMHUYpaw2-FMuimZ2wzk56EOvLP6Rn-wgk)).<br>

  
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

[Codigo Fonte](fonte/)

### Modelo de negócio
O modelo de negócio está disponível no arquivo [Sobre](docs/BUSINESS.md).

### Relatório Final
O relatório final está disponível no arquivo [descrição do projeto](/docs/ABOUT_PROJECT.md).
