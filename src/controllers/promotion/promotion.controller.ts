import type { Request, Response } from "express";
import { PromotionService } from "../../services/promotion.service.js";
import { ValidationError } from "../../errors/ValidationError.js";

// Criar promoção
async function createPromotion(req: Request, res: Response) {
  try {
    const created = await PromotionService.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Erro interno ao criar promoção." });
  }
}

// Listar todas as promoções
async function listPromotions(_: Request, res: Response) {
  try {
    const promos = await PromotionService.list();
    res.status(200).json(promos);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar promoções." });
  }
}

// Buscar promoção por id
async function getPromotionById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const promo = await PromotionService.findById(id);
    if (!promo)
      return res.status(404).json({ error: "Promoção não encontrada." });
    res.status(200).json(promo);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar promoção." });
  }
}

// Atualizar promoção
async function updatePromotion(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updated = await PromotionService.update(id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar promoção." });
  }
}

// Excluir promoção
async function deletePromotion(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    await PromotionService.remove(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Erro ao excluir promoção." });
  }
}

async function listActivePromotions(_: Request, res: Response) {
  try {
    const active = await PromotionService.listActivePromotions();
    res.status(200).json(active);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar promoções ativas." });
  }
}

export const PromotionController = {
  createPromotion,
  listPromotions,
  getPromotionById,
  updatePromotion,
  deletePromotion,
  listActivePromotions,
};
