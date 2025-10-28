import type { Response, Request } from "express";
import { CategoryService } from "../../services/category.service.js";

async function createCategory(req: Request, res: Response) {
  try {
    const newCategory = await CategoryService.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).send({ error: "Error ao criar categoria" });
  }
}

export const CategoryController = {
  createCategory,
};
