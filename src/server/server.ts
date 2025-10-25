import cors from "cors";
import express from "express";

const server = express();

server.use(cors());
server.use(express.json());

export default server;
