import Joi from "joi";

const diaSemanaEnum = [
  "DOMINGO",
  "SEGUNDA",
  "TERCA",
  "QUARTA",
  "QUINTA",
  "SEXTA",
  "SABADO",
] as const;

export const horarioSchema = Joi.object({
  diaSemana: Joi.string()
    .valid(...diaSemanaEnum)
    .required()
    .messages({
      "any.only":
        "Dia da semana inválido. Valores válidos: DOMINGO, SEGUNDA, TERCA, QUARTA, QUINTA, SEXTA, SABADO.",
      "any.required": "Dia da semana é obrigatório.",
      "string.base": "Dia da semana deve ser texto.",
    }),
  horaInicio: Joi.string()
    .pattern(/^\d{2}:\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": "Hora deve ter o formato HH:MM.",
      "any.required": "Hora de início é obrigatória.",
      "string.empty": "Hora de início não pode ser vazia.",
      "string.base": "Hora de início deve ser texto.",
    }),
  horaFim: Joi.string()
    .pattern(/^\d{2}:\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": "Hora deve ter o formato HH:MM.",
      "any.required": "Hora de fim é obrigatória.",
      "string.empty": "Hora de fim não pode ser vazia.",
      "string.base": "Hora de fim deve ser texto.",
    }),
});

export const createPromotionSchema = Joi.object({
  descricao: Joi.string().min(1).max(255).required().messages({
    "string.min": "Descrição deve ter ao menos 1 caractere.",
    "string.max": "Descrição deve ter no máximo 255 caracteres.",
    "any.required": "Descrição é obrigatória.",
    "string.empty": "Descrição não pode ser vazia.",
    "string.base": "Descrição deve ser texto.",
  }),
  desconto: Joi.number().positive().max(100).required().messages({
    "number.base": "Desconto deve ser um número.",
    "number.positive": "Desconto deve ser um número positivo.",
    "number.max": "Desconto não pode ser maior que 100.",
    "any.required": "Desconto é obrigatório.",
  }), // percentual de 0 a 100
  produtoId: Joi.number().integer().required().messages({
    "number.base": "produtoId deve ser um número.",
    "number.integer": "produtoId deve ser um número inteiro.",
    "any.required": "produtoId é obrigatório.",
  }),
  horarios: Joi.array().items(horarioSchema).min(1).required().messages({
    "array.base": "Horários deve ser um array.",
    "array.min": "É necessário informar ao menos 1 horário.",
    "any.required": "Horários é obrigatório.",
  }),
});

export const updatePromotionSchema = Joi.object({
  descricao: Joi.string().min(1).max(255).optional().messages({
    "string.min": "Descrição deve ter ao menos 1 caractere.",
    "string.max": "Descrição deve ter no máximo 255 caracteres.",
    "string.empty": "Descrição não pode ser vazia.",
    "string.base": "Descrição deve ser texto.",
  }),
  desconto: Joi.number().positive().max(100).optional().messages({
    "number.base": "Desconto deve ser um número.",
    "number.positive": "Desconto deve ser um número positivo.",
    "number.max": "Desconto não pode ser maior que 100.",
  }),
  produtoId: Joi.number().integer().optional().messages({
    "number.base": "produtoId deve ser um número.",
    "number.integer": "produtoId deve ser um número inteiro.",
  }),
  horarios: Joi.array().items(horarioSchema).min(1).optional().messages({
    "array.base": "Horários deve ser um array.",
    "array.min": "Se informar horários, deve haver ao menos 1.",
  }),
});
