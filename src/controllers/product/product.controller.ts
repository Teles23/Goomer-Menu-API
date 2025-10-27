import { type Request, type Response } from "express";
import { ProductService } from "../../services/product.service.js";

// Criar um novo produto
async function createProduct(req: Request, res: Response) {
  try {
    const newProduct = await ProductService.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar o produto." });
  }
}

// Listar todos os produtos
async function listProducts(_: Request, res: Response) {
  try {
    const products = await ProductService.list();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar os produtos." });
  }
}

// Buscar um produto por ID
async function getProductById(req: Request, res: Response) {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: "ID do produto é obrigatório." });
    }
    const id = parseInt(req.params.id);
    const product = await ProductService.findById(id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Produto não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o produto." });
  }
}

// Atualizar um produto
async function updateProduct(req: Request, res: Response) {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: "ID do produto é obrigatório." });
    }
    const id = parseInt(req.params.id);
    const updatedProduct = await ProductService.update(id, req.body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o produto." });
  }
}

// Excluir um produto
async function deleteProduct(req: Request, res: Response) {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: "ID do produto é obrigatório." });
    }
    const id = parseInt(req.params.id);
    await ProductService.remove(id);
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao excluir o produto." });
  }
}

export const ProductController = {
  createProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
