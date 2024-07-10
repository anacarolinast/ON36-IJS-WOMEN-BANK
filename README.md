# WOM?N BANK - Banco Comunitário para Mulheres Empreendedoras

## Visão Geral

O projeto WOM?N BANK tem como objetivo criar um banco comunitário focado em empoderar mulheres empreendedoras de baixa renda. Este banco oferecerá serviços financeiros tradicionais juntamente com incentivos adicionais através de uma moeda social circulante local.

## Principais Recursos

### Classes e Interfaces

1. **Cliente**
   - **Atributos**: ID, Nome, CPF, Endereço, Telefone
   - **Métodos**: Alterar Endereço, Adicionar Telefone

2. **Conta Corrente**
   - **Atributos**: Número da Conta, Saldo
   - **Métodos**: Consultar Saldo

3. **Cartão de Crédito**
   - **Atributos**: Número do Cartão, Limite de Crédito, Código de Segurança, Senha, Data de Validade
   - **Métodos**: Realizar Pagamento, Consultar Fatura, Solicitar Aumento de Limite

4. **Moeda Social**
   - **Atributos**: Valor da Moeda Social, Equivalência em Reais
   - **Métodos**: Converter Moeda Social para Reais, Converter Reais para Moeda Social

5. **Transação**
   - **Atributos**: ID, Valor, Tipo de Transação, Data da Transação
   - **Métodos**: Obter Valor, Obter Tipo de Transação

6. **Banco**
   - **Atributos**: Nome, Endereço, Lista de Gerentes
   - **Métodos**: Adicionar Gerente, Remover Gerente, Listar Gerentes

7. **Serviços Bancários**
   - **Interfaces**: Depósito, Saque, Empréstimo, Pagamento de Contas (Energia, etc.)

### Relacionamentos

- **Cliente** possui uma **Conta Corrente** e pode solicitar um **Cartão de Crédito**.
- **Cartão de Crédito** está associado a um **Cliente**.
- **Conta Corrente** realiza **Transações** (depósitos, saques, pagamentos).
- **Banco** gerencia **Clientes** e **Gerentes**.
- **Moeda Social** é utilizada para incentivar transações locais, convertendo para moeda real conforme necessário.

## Objetivo

Promover o desenvolvimento econômico sustentável em comunidades locais, especialmente entre mulheres empreendedoras, através de serviços financeiros acessíveis e o uso de moeda social para fortalecer a economia local.