import express from "express";
import { PromotionController } from "../../controllers/promotion/promotion.controller.js";
import validateId from "../../middlewares/validateId.js";
import { validate } from "../../middlewares/validateRequest.js";
import {
  createPromotionSchema,
  updatePromotionSchema,
} from "../../schemas/promotion.schema.js";

const promotionRouter = express();

promotionRouter.post(
  "/",
  validate(createPromotionSchema, "body"),
  PromotionController.createPromotion
);
promotionRouter.get("/", PromotionController.listPromotions);
promotionRouter.get("/active", PromotionController.listActivePromotions);
promotionRouter.get("/:id", validateId, PromotionController.getPromotionById);
promotionRouter.put(
  "/:id",
  validateId,
  validate(updatePromotionSchema, "body"),
  PromotionController.updatePromotion
);
promotionRouter.delete("/:id", validateId, PromotionController.deletePromotion);

export { promotionRouter };
