import { pool } from "../database/db.js";
import { ValidationError } from "../errors/ValidationError.js";
import type {
  ProductWithPromotion,
  PromotionDB,
} from "../types/promotion.interface.js";
import { formatarMoeda } from "../utils/currency.util.js";
import { getCurrentDayAndTime } from "../utils/date.util.js";
import { mapPromotionRows } from "../utils/promotion.util.js";
import { validateTimeInterval } from "../utils/time.util.js";

async function create(promotion: Omit<PromotionDB, "id" | "criadoEm">) {
  for (const horario of promotion.horarios) {
    if (!validateTimeInterval(horario.horaInicio, horario.horaFim)) {
      throw new ValidationError(
        "Os horários devem ter intervalo mínimo de 15 minutos"
      );
    }
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
      'INSERT INTO "Promocao" (descricao, desconto, "produtoId") VALUES ($1, $2, $3) RETURNING *',
      [promotion.descricao || null, promotion.desconto, promotion.produtoId]
    );
    const promocao = result.rows[0];
    const insertHorarioText =
      'INSERT INTO "HorarioPromocao" ("diaSemana", "horaInicio", "horaFim", "promocaoId") VALUES ';
    const values: any[] = [];
    const placeholders: string[] = [];

    promotion.horarios.forEach((h, i) => {
      const base = i * 4;
      placeholders.push(
        `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4})`
      );
      values.push(h.diaSemana, h.horaInicio, h.horaFim, promocao.id);
    });

    if (placeholders.length > 0) {
      await client.query(insertHorarioText + placeholders.join(", "), values);
    }

    await client.query("COMMIT");

    return await findById(promocao.id);
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

// Listar todas as promoções
async function list() {
  const result = await pool.query(
    `SELECT 
      p.*,
      hp.id AS horario_id,
      hp."diaSemana",
      hp."horaInicio",
      hp."horaFim",
      prod.preco as preco_produto
    FROM "Promocao" p 
    LEFT JOIN "HorarioPromocao" hp ON hp."promocaoId" = p.id 
    LEFT JOIN "Produto" prod ON prod.id = p."produtoId"
    ORDER BY p.id`
  );

  const map = new Map<number, PromotionDB>();

  for (const row of result.rows) {
    const id: number = row.id;
    if (!map.has(id)) {
      const precoOriginal = parseFloat(row.preco_produto || 0);
      const precoPromocional = precoOriginal * (row.desconto / 100);

      map.set(id, {
        id,
        descricao: row.descricao,
        desconto: row.desconto,
        produtoId: row.produtoId,
        criadoEm: row.criadoem,
        horarios: [],
        precoOriginal: formatarMoeda(precoOriginal),
        precoPromocional: formatarMoeda(precoPromocional),
      });
    }
    if (row.horario_id) {
      map.get(id)!.horarios.push({
        diaSemana: row.diaSemana,
        horaInicio: row.horaInicio,
        horaFim: row.horaFim,
      });
    }
  }

  return Array.from(map.values());
}

// Buscar por ID com valores formatados
async function findById(id: number) {
  const result = await pool.query(
    `SELECT 
      p.*,
      hp.id AS horario_id,
      hp."diaSemana",
      hp."horaInicio",
      hp."horaFim",
      prod.preco as preco_produto
    FROM "Promocao" p 
    LEFT JOIN "HorarioPromocao" hp ON hp."promocaoId" = p.id 
    LEFT JOIN "Produto" prod ON prod.id = p."produtoId"
    WHERE p.id = $1`,
    [id]
  );

  return mapPromotionRows(result.rows);
}

// Atualizar promoção (opcionalmente substitui horários)
async function update(
  id: number,
  payload: Partial<Omit<PromotionDB, "id" | "criadoEm">>
) {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;
  if (payload.descricao !== undefined) {
    fields.push(`descricao = $${idx++}`);
    values.push(payload.descricao);
  }
  if (payload.desconto !== undefined) {
    fields.push(`desconto = $${idx++}`);
    values.push(payload.desconto);
  }
  if (payload.produtoId !== undefined) {
    fields.push(`"produtoId" = $${idx++}`);
    values.push(payload.produtoId);
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    if (fields.length > 0) {
      const q = `UPDATE "Promocao" SET ${fields.join(
        ", "
      )} WHERE id = $${idx} RETURNING *`;
      values.push(id);
      await client.query(q, values);
    }

    if (payload.horarios !== undefined) {
      // substituir horários
      await client.query(
        'DELETE FROM "HorarioPromocao" WHERE "promocaoId" = $1',
        [id]
      );

      const insertHorarioText =
        'INSERT INTO "HorarioPromocao" ("diaSemana", "horaInicio", "horaFim", "promocaoId") VALUES ';
      const hValues: any[] = [];
      const placeholders: string[] = [];

      payload.horarios.forEach((h, i) => {
        const base = i * 4;
        placeholders.push(
          `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4})`
        );
        hValues.push(h.diaSemana, h.horaInicio, h.horaFim, id);
      });

      if (placeholders.length > 0) {
        await client.query(
          insertHorarioText + placeholders.join(", "),
          hValues
        );
      }
    }

    await client.query("COMMIT");
    return await findById(id);
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

// Excluir promoção (remove horários primeiro)
async function remove(id: number) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      'DELETE FROM "HorarioPromocao" WHERE "promocaoId" = $1',
      [id]
    );
    await client.query('DELETE FROM "Promocao" WHERE id = $1', [id]);
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

// Retorna todas as promoções ativas no momento atual
async function listActivePromotions() {
  const all = await pool.query(
    `SELECT 
      p.*,
      hp."diaSemana", 
      hp."horaInicio", 
      hp."horaFim",
      prod.preco as preco_produto,
      prod.nome as nome_produto,
      prod.disponivel,
      prod."categoriaId",
      c.nome as categoria_nome
     FROM "Promocao" p 
     LEFT JOIN "HorarioPromocao" hp ON hp."promocaoId" = p.id 
     JOIN "Produto" prod ON prod.id = p."produtoId"
     JOIN "Categoria" c ON c.id = prod."categoriaId"
     WHERE prod.disponivel = true
     ORDER BY c.id, prod.nome, p.desconto DESC`
  );

  const { today, time } = getCurrentDayAndTime();
  console.log(all);
  const productMap = new Map<number, ProductWithPromotion>();

  for (const row of all.rows) {
    const produtoId = row.produtoid;
    if (!productMap.has(produtoId)) {
      const precoOriginal = parseFloat(row.preco_produto);
      const precoPromocional =
        precoOriginal - precoOriginal * (row.desconto / 100);

      productMap.set(produtoId, {
        id: produtoId,
        nome: row.nome_produto,
        preco: formatarMoeda(precoOriginal),
        precoPromocional: formatarMoeda(precoPromocional),
        desconto: row.desconto,
        disponivel: row.disponivel,
        categoriaId: row.categoriaId,
        promocao: row.id
          ? {
              id: row.id,
              descricao: row.descricao,
              horarios: [],
            }
          : undefined,
      });
    }

    if (row.diaSemana) {
      const product = productMap.get(produtoId)!;
      if (product.promocao) {
        product.promocao.horarios.push({
          diaSemana: row.diaSemana,
          horaInicio: row.horaInicio,
          horaFim: row.horaFim,
        });
      }
    }
  }

  // Filtra apenas produtos com promoções ativas no momento
  const activeProducts = Array.from(productMap.values()).filter((product) => {
    if (!product.promocao?.horarios.length) return false;

    return product.promocao.horarios.some(
      (h) => h.diaSemana === today && h.horaInicio <= time && time <= h.horaFim
    );
  });

  return activeProducts;
}

export const PromotionService = {
  create,
  list,
  findById,
  update,
  remove,
  listActivePromotions,
};
