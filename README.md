# 🍽️ Goomer Menu API

API REST desenvolvida em **Node.js + TypeScript** para gerenciamento de **produtos**, **promoções** e **cardápio** de um restaurante.  
Projeto desenvolvido como parte do **Desafio Técnico - Pessoa Desenvolvedora Back-end** da Goomer.

---

## 🧩 Objetivo

Criar uma API capaz de:
- ✅ Gerenciar produtos e suas promoções
- 🍔 Retornar o cardápio consolidado com promoções ativas
- 🕒 Aplicar promoções apenas nos dias e horários definidos
- 👁️ Controlar a visibilidade dos produtos no cardápio

---

## ⚙️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|-------------|------------|
| **Node.js** | Runtime JavaScript utilizado no servidor |
| **TypeScript** | Tipagem estática para maior segurança e manutenção |
| **Express** | Framework leve para criação da API REST |
| **PostgreSQL** | Banco de dados relacional utilizado |
| **Prisma ORM** | Gerenciamento de migrations e schema do banco |
| **SQL Puro** | Todas as consultas de leitura são implementadas diretamente em SQL |
| **Cors / Dotenv** | Configuração de ambiente e segurança de requisições |

---

## 📁 Estrutura de Pastas

```
src/
├── controllers/        # Camada de controle (requisições HTTP)
├── database/           # Conexão com o banco de dados
├── errors/             # Tratamento de erros personalizados
├── middlewares/        # Middlewares de validação e autenticação
├── routes/             # Definição das rotas da API
│   ├── menu/
│   ├── product/
│   └── promotion/
├── schemas/            # Schemas de validação (ex.: Zod)
├── server/             # Configuração e inicialização do servidor Express
├── services/           # Camada de regra de negócio
├── types/              # Definições de interfaces e tipagens
└── utils/              # Funções utilitárias (datas, formatação, cálculo)
```

---

## 🚀 Instalação e Execução

### 1. Clonar o repositório
```bash
git clone [Projeto](https://github.com/Teles23/Goomer-Menu-API.git)
cd goomer-menu-api
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
Crie um arquivo `.env` baseado em `.env.example` e ajuste conforme seu ambiente local.

Exemplo:
```
DATABASE_URL="postgresql://user:password@localhost:5432/goomer"
PORT=3000
```

### 4. Executar migrations
```bash
npx prisma migrate dev
```

### 5. Rodar o servidor
```bash
npm run dev
```

A API estará disponível em:
```
http://localhost:3000
```

---

## 🧠 Endpoints Principais

### 🛒 Produtos (`/api/products`)
- `POST /api/products` — Cria um novo produto  
- `GET /api/products` — Lista todos os produtos  
- `PUT /api/products/:id` — Atualiza informações de um produto  
- `DELETE /api/products/:id` — Remove um produto  

---

### 🎟️ Promoções (`/api/promotions`)
- `POST /api/promotions` — Cria uma nova promoção  
- `GET /api/promotions` — Lista promoções existentes  
- `PUT /api/promotions/:id` — Atualiza promoção existente  
- `DELETE /api/promotions/:id` — Remove uma promoção  

---

### 📋 Cardápio (`/api/menu`)
- `GET /api/menu` — Retorna o cardápio completo, consolidando:
  - Categorias  
  - Produtos disponíveis  
  - Promoções ativas com base no dia e horário atual  
  - Preço original e promocional quando aplicável  

Exemplo de resposta:
```json
[
  {
    "id": 1,
    "nome": "Lanches",
    "descricao": "Sanduíches e combos",
    "produtos": [
      {
        "id": 12,
        "nome": "X-Burger",
        "preco": 18.90,
        "disponivel": true,
        "promocaoAtiva": {
          "descricao": "Happy Hour 10%",
          "desconto": 10,
          "precoPromocional": 17.01,
          "horario": {
            "diaSemana": "sexta-feira",
            "horaInicio": "18:00",
            "horaFim": "22:00"
          }
        }
      }
    ]
  }
]
```

---

## 🧪 Testes e Validação

- Todas as entradas são validadas por **schemas** (Joi)
- Erros de validação retornam status **400 Bad Request**
- Erros de servidor retornam status **500 Internal Server Error**
- O middleware `validated.ts` garante a integridade dos dados recebidos

---

## 🧰 Scripts NPM

| Comando | Descrição |
|----------|------------|
| `npm run dev` | Executa o servidor em modo desenvolvimento |
| `npm run build` | Compila o código TypeScript para JavaScript |
| `npx prisma studio` | Abre o painel gráfico do Prisma |

---

## 📚 Funcionalidades Técnicas Implementadas

- Estrutura modular e escalável (controllers, services, utils)
- Consultas SQL otimizadas e parametrizadas
- Aplicação de promoções condicionais por horário/dia
- Retorno de cardápio consolidado e formatado
- Tratamento de erros padronizado
- Código tipado e validado com TypeScript
- Separação clara de camadas (Controller → Service → Database)

---

## 📖 Exemplo de Arquitetura

```
[Client]
   ↓
[Controller] → recebe e valida requisições
   ↓
[Service] → executa regra de negócio e consultas SQL
   ↓
[Database] → retorna dados do PostgreSQL
   ↓
[Controller] → responde com JSON formatado
```

---

## 🪶 Licença

Este projeto é distribuído sob a licença **MIT**.  
Sinta-se livre para usar, estudar e contribuir.
