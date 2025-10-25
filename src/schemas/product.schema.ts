import Joi from "joi";

// Schema para criar produto
export const createProductSchema = Joi.object({
  nome: Joi.string().min(1).max(255).required().messages({
    "string.base": "O nome deve ser um texto.",
    "string.empty": "O nome é obrigatório.",
    "string.min": "O nome deve ter no mínimo {#limit} caracteres.",
    "string.max": "O nome deve ter no máximo {#limit} caracteres.",
    "any.required": "O nome é obrigatório.",
  }),
  preco: Joi.number().precision(2).required().messages({
    "number.base": "O preço deve ser um número.",
    "number.empty": "O preço é obrigatório.",
    "any.required": "O preço é obrigatório.",
  }),
  categoriaId: Joi.number().integer().required().messages({
    "number.base": "O ID da categoria deve ser um número inteiro.",
    "any.required": "O ID da categoria é obrigatório.",
  }),
  disponivel: Joi.boolean().optional().messages({
    "boolean.base": "O campo disponível deve ser verdadeiro ou falso.",
  }),
});

// Schema para atualizar produto
export const updateProductSchema = Joi.object({
  nome: Joi.string().min(1).max(255).optional().messages({
    "string.base": "O nome deve ser um texto.",
    "string.min": "O nome deve ter no mínimo {#limit} caracteres.",
    "string.max": "O nome deve ter no máximo {#limit} caracteres.",
  }),
  preco: Joi.number().precision(2).optional().messages({
    "number.base": "O preço deve ser um número.",
  }),
  categoriaId: Joi.number().integer().optional().messages({
    "number.base": "O ID da categoria deve ser um número inteiro.",
  }),
  disponivel: Joi.boolean().optional().messages({
    "boolean.base": "O campo disponível deve ser verdadeiro ou falso.",
  }),
});

// Schema para validar ID na rota
export const idParamSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "number.base": "O ID deve ser um número inteiro.",
    "any.required": "O ID é obrigatório.",
  }),
});
