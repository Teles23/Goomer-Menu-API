import type { PromotionDB } from "../types/promotion.interface.js";
import { formatarMoeda } from "./currency.util.js";

export function mapPromotionRows(rows: any[]): PromotionDB | null {
  if (rows.length === 0) return null;

  const row0 = rows[0];
  const promotion: PromotionDB = {
    id: row0.id,
    descricao: row0.descricao,
    desconto: row0.desconto,
    produtoId: row0.produtoId,
    criadoEm: row0.criadoem,
    horarios: [],
    precoOriginal: formatarMoeda(parseFloat(row0.preco_produto || 0)),
    precoPromocional: formatarMoeda(
      parseFloat(row0.preco_produto || 0) * (1 - row0.desconto / 100)
    ),
  };

  for (const row of rows) {
    if (row.horario_id) {
      promotion.horarios.push({
        diaSemana: row.diaSemana,
        horaInicio: row.horaInicio,
        horaFim: row.horaFim,
      });
    }
  }

  return promotion;
}