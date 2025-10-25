import cors from "cors";
import express from "express";
import { productRouter } from "../routes/product/product.routes.js";

const server = express();

server.use(cors());
server.use(express.json());

server.use("/api/products", productRouter);

export default server;
