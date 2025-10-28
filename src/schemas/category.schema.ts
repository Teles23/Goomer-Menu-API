import Joi from "joi";

// Schema para criar produto
export const createCategorySchema = Joi.object({
  nome: Joi.string().min(1).max(255).required().messages({
    "string.base": "O nome deve ser um texto.",
    "string.empty": "O nome é obrigatório.",
    "string.min": "O nome deve ter no mínimo {#limit} caracteres.",
    "string.max": "O nome deve ter no máximo {#limit} caracteres.",
    "any.required": "O nome é obrigatório.",
  }),
  descricao: Joi.string().messages({
    "string.base": "A descrição deve ser um texto.",
  }),
});
