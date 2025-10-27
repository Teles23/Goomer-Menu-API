import express from "express";
import { ProductController } from "../../controllers/product/product.controller.js";
import { validate } from "../../middlewares/validateRequest.js";
import {
  createProductSchema,
  idParamSchema,
  updateProductSchema,
} from "../../schemas/product.schema.js";
const productRouter = express();

productRouter.post(
  "/",
  validate(createProductSchema, "body"),
  ProductController.createProduct
);
productRouter.get("/", ProductController.listProducts);
productRouter.get(
  "/:id",
  validate(idParamSchema, "params"),
  ProductController.getProductById
);
productRouter.put(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updateProductSchema, "body"),
  ProductController.updateProduct
);
productRouter.delete(
  "/:id",
  validate(idParamSchema, "params"),
  ProductController.deleteProduct
);

export { productRouter };
