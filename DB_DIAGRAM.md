```

Table Clientes {
  id integer [primary key]
  nome varchar 
  cpf varchar 
  email varchar 
  telefone varchar 
  endereco varchar 
}

Table Celulares {
  id integer [primary key]
  modelo varchar 
  imei varchar [unique]
  valor decimal 
  cliente_id integer 
}

Table apolices {
  id integer [primary key]
  numero varchar 
  data_emissao timestamp 
  data_validade timestamp 
  cobertura varchar 
  premio decimal 
  cliente_id integer 
  celular_id integer 
}

Table Sinistros {
  id integer [primary key]
  data_registro timestamp 
  descricao text 
  status varchar 
  valor_indenizacao decimal 
  apolice_id integer 
}

Table EstoquePeças {
  id integer [primary key]
  nome_peca varchar 
  quantidade integer 
  level_critico integer 
  valor_unitario decimal 
}

Table EntradasPeças {
  id integer [primary key]
  data_entrada timestamp 
  quantidade integer 
  estoque_peca_id integer 
}

Table SaídasPeças {
  id integer [primary key]
  data_saida timestamp 
  quantidade integer 
  estoque_peca_id integer 
}

Table Riscos {
  id integer [primary key]
  tipo_risco varchar 
  taxa_sinistro decimal 
  cobertura_recomendada varchar 
  premio_recomendado decimal 
}


Ref: Celulares.cliente_id > Clientes.id // many-to-one
Ref: apolices.cliente_id > Clientes.id // many-to-one
Ref: apolices.celular_id > Celulares.id // many-to-one
Ref: Sinistros.apolice_id > apolices.id // many-to-one
Ref: EntradasPeças.estoque_peca_id > EstoquePeças.id // many-to-one
Ref: SaídasPeças.estoque_peca_id > EstoquePeças.id // many-to-one

```

### Entidades e Atributos

1. **Clientes**
   - `id` (Primary Key)
   - `nome`
   - `cpf`
   - `email`
   - ` telefone`
   - `endereco`

2. **Celulares**
   - `id` (Primary Key)
   - `modelo`
   - `imei` (Unique)
   - `valor`
   - `cliente_id` (Chave estrangeira para `Clientes.id`)

3. **apolices**
   - `id` (Primary Key)
   - `numero`
   - `data_emissao`
   - `data_validade`
   - `cobertura`
   - `premio`
   - `cliente_id` (Chave estrangeira para `Clientes.id`)
   - `celular_id` (Chave estrangeira para `Celulares.id`)

4. **Sinistros**
   - `id` (Primary Key)
   - `data_registro`
   - `descricao`
   - `status` (e.g., Pendente, Aprovado, Negado)
   - `valor_indenizacao`
   - `apolice_id` (Chave estrangeira para `apolices.id`)

7. **EstoquePeças**
   - `id` (Primary Key)
   - `nome_peca`
   - `quantidade`
   - `  level_critico`
   - `valor_unitario`

8. **EntradasPeças**
   - `id` (Primary Key)
   - `data_entrada`
   - `quantidade`
   - `estoque_peca_id` (Chave estrangeira para `EstoquePeças.id`)

9. **SaídasPeças**
   - `id` (Primary Key)
   - `data_saida`
   - `quantidade`
   - `estoque_peca_id` (Chave estrangeira para `EstoquePeças.id`)

10. **Riscos**
   - `id` (Primary Key)
   - `tipo_risco`
   - `taxa_sinistro`
   - `cobertura_recomendada`
   - `premio_recomendado`

### Relacionamentos

1. **Clientes** has many **Celulares** (One-to-Many)
2. **Clientes** has many **apolices** (One-to-Many)
3. **Celulares** belongs to one **Cliente** (Many-to-One)
4. **apolices** belongs to one **Cliente** (Many-to-One)
5. **apolices** belongs to one **Celular** (Many-to-One)
6. **Sinistros** belongs to one **Apólice** (Many-to-One)
7. **EstoquePeças** has many **EntradasPeças** (One-to-Many)
8. **EstoquePeças** has many **SaídasPeças** (One-to-Many)
9. **EntradasPeças** belongs to one **EstoquePeças** (Many-to-One)
10. **SaídasPeças** belongs to one **EstoquePeças** (Many-to-One)
 