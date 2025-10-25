import { pool } from "../database/db.js";

interface Product {
  nome: string;
  preco: number;
  categoriaId: number;
  disponivel: boolean;
}

// Criar um novo produto
async function create(product: Omit<Product, "id" | "criadoEm">) {
  const { nome, preco, categoriaId, disponivel } = product;
  const result = await pool.query(
    'INSERT INTO "Produto" (nome, preco, "categoriaId", disponivel) VALUES ($1, $2, $3, $4) RETURNING *',
    [nome, preco, categoriaId, disponivel]
  );
  return result.rows[0];
}

// Listar todos os produtos
async function list() {
  const result = await pool.query('SELECT * FROM "Produto"');
  return result.rows;
}

// Buscar um produto pelo ID
async function findById(id: number) {
  const result = await pool.query('SELECT * FROM "Produto" WHERE id = $1', [
    id,
  ]);
  return result.rows[0];
}

// Atualizar um produto
async function update(id: number, product: Partial<Product>) {
  const { nome, preco, categoriaId, disponivel } = product;
  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (nome !== undefined) {
    fields.push(`nome = $${paramIndex++}`);
    values.push(nome);
  }
  if (preco !== undefined) {
    fields.push(`preco = $${paramIndex++}`);
    values.push(preco);
  }
  if (categoriaId !== undefined) {
    fields.push(`"categoriaId" = $${paramIndex++}`);
    values.push(categoriaId);
  }
  if (disponivel !== undefined) {
    fields.push(`disponivel = $${paramIndex++}`);
    values.push(disponivel);
  }

  if (fields.length === 0) {
    throw new Error("Nenhum campo para atualizar.");
  }

  const query = `UPDATE "Produto" SET ${fields.join(
    ", "
  )} WHERE id = $${paramIndex} RETURNING *`;
  values.push(id);

  const result = await pool.query(query, values);
  return result.rows[0];
}

// Excluir um produto
async function remove(id: number) {
  await pool.query('DELETE FROM "Produto" WHERE id = $1', [id]);
}

export const ProductService = {
  create,
  list,
  findById,
  update,
  remove,
};
