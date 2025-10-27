import cors from "cors";
import express from "express";
import { menuRouter } from "../routes/menu/menu.routes.js";
import { productRouter } from "../routes/product/product.routes.js";
import { promotionRouter } from "../routes/promotion/promotion.routes.js";

const server = express();

server.use(cors());
server.use(express.json());

server.use("/api/products", productRouter);
server.use("/api/promotions", promotionRouter);
server.use("/api/menu", menuRouter);

export default server;
