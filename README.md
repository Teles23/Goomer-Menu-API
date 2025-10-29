# 🍽️ Goomer Menu API

API REST desenvolvida em **Node.js + TypeScript** para gerenciamento de **categorias**, **produtos**, **promoções** e **cardápio** de restaurantes.  
Desenvolvido como parte do **Desafio Técnico - Pessoa Desenvolvedora Back-end** da Goomer.

---

## 🧩 Objetivo do Projeto

O objetivo da **Goomer Menu API** é disponibilizar endpoints para o gerenciamento completo do cardápio digital de um restaurante, permitindo:

- ✅ Criação e listagem de categorias, produtos e promoções;  
- 🍔 Consolidação automática do cardápio com promoções ativas;  
- ⏰ Aplicação de descontos condicionados por dia da semana e horário;  
- 👁️ Controle da disponibilidade dos produtos;  
- 🧾 Retorno formatado com preço original e promocional.  

---

## ⚙️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|-------------|------------|
| **Node.js** | Ambiente de execução JavaScript |
| **TypeScript** | Tipagem estática e segurança no desenvolvimento |
| **Express** | Framework web leve para criação da API |
| **PostgreSQL** | Banco de dados relacional |
| **Prisma ORM** | Gerenciamento de schema e migrations |
| **SQL Puro** | Consultas de leitura otimizadas |
| **Docker / Compose** | Containerização e automação de ambientes |
| **Joi** | Validação de dados de entrada |
| **Dotenv** | Gerenciamento de variáveis de ambiente |

---

## 🏗️ Fluxo de Uso da API

O fluxo recomendado para uso da API é:

```
1️⃣ Criar uma categoria
2️⃣ Criar um produto vinculado a uma categoria
3️⃣ Criar uma promoção associada a um produto
4️⃣ Visualizar o cardápio consolidado
```

---

## 🧠 Exemplo de Uso Completo

### 🥇 1. Criar uma categoria
```bash
curl --location 'http://localhost:3005/api/categories' --header 'Content-Type: application/json' --data '{
    "nome": "Cervejas"
}'
```

**Resposta:**
```json
{
  "id": 3,
  "nome": "Cervejas",
  "descricao": null,
  "criadoEm": "2025-10-28T23:29:21.998Z"
}
```

---

### 🥈 2. Criar um produto
```bash
curl --location 'http://localhost:3005/api/products' --header 'Content-Type: application/json' --data '{
    "nome": "Heineken",
    "preco": "18.00",
    "categoriaId": 3
}'
```

**Resposta:**
```json
{
  "id": 10,
  "nome": "Heineken",
  "preco": "18.00",
  "categoriaId": 3,
  "disponivel": true,
  "criadoEm": "2025-10-28T23:40:14.882Z"
}
```

---

### 🥉 3. Criar uma promoção
```bash
curl --location 'http://localhost:3005/api/promotions' --header 'Content-Type: application/json' --data '{
  "descricao": "Chope dobrado",
  "desconto": 50,
  "produtoId": 10,
  "horarios": [
    {
      "diaSemana": "SEXTA",
      "horaInicio": "18:00",
      "horaFim": "20:00"
    }
  ]
}'
```

**Resposta:**
```json
{
  "id": 15,
  "descricao": "Chope dobrado",
  "desconto": 50,
  "produtoId": 10,
  "horarios": [
    {
      "diaSemana": "SEXTA",
      "horaInicio": "18:00",
      "horaFim": "20:00"
    }
  ],
  "precoOriginal": "R$ 10,00",
  "precoPromocional": "R$ 5,00"
}
```

---

### 🧾 4. Visualizar o cardápio consolidado
```bash
curl --location 'http://localhost:3005/api/menu'
```

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Fast Food",
    "produtos": [
      {
        "id": 3,
        "nome": "Pizza",
        "preco": "R$ 65,99",
        "disponivel": true,
        "promocaoAtiva": {
          "id": 13,
          "descricao": "Pizza dobrada",
          "desconto": 50,
          "precoPromocional": "R$ 32,99",
          "horario": {
            "diaSemana": "TERCA",
            "horaInicio": "10:00",
            "horaFim": "23:59"
          }
        }
      },
      {
        "id": 5,
        "nome": "Chope Brahma",
        "preco": "R$ 10,00",
        "disponivel": true,
        "promocaoAtiva": null
      }
    ]
  },
  {
    "id": 2,
    "nome": "Cervejas",
    "descricao": null,
    "produtos": [
      {
        "id": 9,
        "nome": "Heineken",
        "preco": "R$ 18,00",
        "disponivel": true,
        "promocaoAtiva": null
      }
    ]
  }
]
```

---

## ⚙️ Outras Rotas Importantes

### 🧩 Atualizar um produto
```bash
curl --location --request PUT 'http://localhost:3005/api/products/10' --header 'Content-Type: application/json' --data '{
    "nome": "Heineken 600ml",
    "preco": "22.00"
}'
```

### ❌ Excluir um produto
```bash
curl --location --request DELETE 'http://localhost:3005/api/products/10'
```

### 🧾 Atualizar uma promoção
```bash
curl --location --request PUT 'http://localhost:3005/api/promotions/15' --header 'Content-Type: application/json' --data '{
    "descricao": "Chope dobrado happy hour",
    "desconto": 50
}'
```

### ❌ Excluir uma promoção
```bash
curl --location --request DELETE 'http://localhost:3005/api/promotions/15'
```

---

## 🧰 Observações

- O fluxo da API deve **sempre respeitar a hierarquia**: Categoria → Produto → Promoção → Menu.  
- As promoções só são aplicadas quando o dia e o horário atuais estão dentro do intervalo cadastrado.  
- Os endpoints retornam respostas padronizadas com `status code` apropriado.  
- Erros são tratados e retornados com mensagens descritivas.

---

## 🧠 Autor

**Thiago Teles**  
Analista de Requisitos / Desenvolvedor Back-end  
