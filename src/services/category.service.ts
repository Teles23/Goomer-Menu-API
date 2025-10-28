import { pool } from "../database/db.js";

interface Category {
  id: number;
  nome: string;
  descricao: string;
}

async function create(category: Omit<Category, "id">) {
  const { nome, descricao } = category;
  const result = await pool.query(
    'INSERT INTO "Categoria" (nome, descricao) VALUES ($1, $2) RETURNING *',
    [nome, descricao]
  );
  return result.rows[0];
}

export const CategoryService = {
  create,
};
