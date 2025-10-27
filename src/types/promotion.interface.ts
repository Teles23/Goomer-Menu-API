import type { Horario } from "./horario.inteface.js";

export interface PromotionDB {
  id: number;
  descricao: string;
  desconto: number;
  produtoId: number;
  criadoEm: Date;
  horarios: Horario[];
  precoOriginal: string;
  precoPromocional: string;
}

export interface ProductWithPromotion {
  id: number;
  nome: string;
  preco: string;
  precoPromocional: string;
  desconto: number;
  promocao?:
    | {
        id: number;
        descricao: string | null;
        horarios: Horario[];
      }
    | undefined;
  disponivel: boolean;
  categoriaId: number;
}
