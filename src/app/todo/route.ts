import express from "express";
import type { Router } from "express";
import TodoController from "./controller.js";

const router: Router = express.Router();
const todoController = new TodoController();

router.post("/add-todo", todoController.createTodo.bind(todoController));

export default router;
