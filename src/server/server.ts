import cors from "cors";
import express from "express";
import { menuRouter } from "../routes/menu/menu.routes.js";
import { productRouter } from "../routes/product/product.routes.js";
import { promotionRouter } from "../routes/promotion/promotion.routes.js";
import { categoryRouter } from "../routes/category/category.routes.js";

const server = express();

server.use(cors());
server.use(express.json());

server.use("/api/products", productRouter);
server.use("/api/promotions", promotionRouter);
server.use("/api/menu", menuRouter);
server.use("/api/categories", categoryRouter);

server.use((req, res) => {
  res.status(404).json({
    error: `A rota ${req.originalUrl} não existe`,
  });
});

export default server;
