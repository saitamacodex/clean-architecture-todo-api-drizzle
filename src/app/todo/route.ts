import express from "express";
import type { Router } from "express";
import TodoController from "./controller.js";

const router: Router = express.Router();
const todoController = new TodoController();

router.post("/add-todo", todoController.createTodo.bind(todoController));
router.get("/all-todo", todoController.getAllTodo.bind(todoController));
router.delete(
  "/delete-item/:id",
  todoController.deleteById.bind(todoController),
);
router.put("/update-item", todoController.updateTodoByID.bind(todoController));

export default router;
