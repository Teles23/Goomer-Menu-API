import { pool } from "../database/db.js";
import { isPromotionActive } from "../utils/date.util.js";

export default async function getMenuWithPromotions() {
  const query = `
    SELECT 
      c.id as categoria_id,
      c.nome as categoria_nome,
      c.descricao as categoria_descricao,
      p.id as produto_id,
      p.nome as produto_nome,
      p.preco as produto_preco,
      p.disponivel,
      pr.id as promocao_id,
      pr.descricao as promocao_descricao,
      pr.desconto,
      hp."diaSemana",
      hp."horaInicio",
      hp."horaFim"
    FROM "Categoria" c
    LEFT JOIN "Produto" p ON p."categoriaId" = c.id
    LEFT JOIN "Promocao" pr ON pr."produtoId" = p.id
    LEFT JOIN "HorarioPromocao" hp ON hp."promocaoId" = pr.id
    WHERE p.disponivel = true
    ORDER BY c.id, p.nome`;

  const result = await pool.query(query);

  const menu: Record<string, any> = {};

  for (const row of result.rows) {
    const categoriaId = row.categoria_id;
    const produtoId = row.produto_id;

    // Inicializa categoria se não existir
    if (!menu[categoriaId]) {
      menu[categoriaId] = {
        id: categoriaId,
        nome: row.categoria_nome,
        descricao: row.categoria_descricao,
        produtos: {},
      };
    }

    // Inicializa produto se não existir
    if (!menu[categoriaId].produtos[produtoId]) {
      menu[categoriaId].produtos[produtoId] = {
        id: produtoId,
        nome: row.produto_nome,
        preco: parseFloat(row.produto_preco),
        disponivel: row.disponivel,
        promocaoAtiva: null,
      };
    }

    // Se existe promoção, verifica se está ativa
    if (row.promocao_id) {
      const isActive = isPromotionActive(
        row.diaSemana,
        row.horaInicio,
        row.horaFim
      );

      if (isActive) {
        const precoOriginal = parseFloat(row.produto_preco);
        const precoPromocional =
          precoOriginal - precoOriginal * (row.desconto / 100);

        menu[categoriaId].produtos[produtoId].promocaoAtiva = {
          id: row.promocao_id,
          descricao: row.promocao_descricao,
          desconto: row.desconto,
          precoPromocional: Number(precoPromocional.toFixed(2)),
          horario: {
            diaSemana: row.diaSemana,
            horaInicio: row.horaInicio,
            horaFim: row.horaFim,
          },
        };
      }
    }
  }

  return Object.values(menu).map((categoria) => ({
    ...categoria,
    produtos: Object.values(categoria.produtos),
  }));
}
