import type { Request, Response } from "express";
import getMenuWithPromotions from "../../services/menu.service.js";
import formatarCardapio from "../../utils/cardapio.util.js";

async function getMenu(_: Request, res: Response) {
  try {
    const menu = await getMenuWithPromotions();
    const menuFormatado = formatarCardapio(menu);
    res.status(200).json(menuFormatado);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar cardápio." });
  }
}

export const MenuController = {
  getMenu,
};
