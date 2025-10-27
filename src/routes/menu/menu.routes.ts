import express from "express";
import { MenuController } from "../../controllers/menu/menu.controller.js";

const menuRouter = express();

menuRouter.get("/", MenuController.getMenu);

export { menuRouter };
