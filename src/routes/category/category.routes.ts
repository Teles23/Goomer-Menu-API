import express from "express";
import { CategoryController } from "../../controllers/category/category.controller.js";
import { validate } from "../../middlewares/validateRequest.js";
import { createCategorySchema } from "../../schemas/category.schema.js";
const categoryRouter = express();

categoryRouter.post(
  "/",
  validate(createCategorySchema, "body"),
  CategoryController.createCategory
);

export { categoryRouter };
