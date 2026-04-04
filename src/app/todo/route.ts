import express from "express";
import type { Router } from "express";
import { createItem } from "./todo.controller.js";
const router: Router = express.Router();

router.post("/add-todo", createItem);
// router.get("/all-todo", todoController.getAllTodo.bind(todoController));
// router.delete(
//   "/delete-item/:id",
//   todoController.deleteById.bind(todoController),
// );
// router.patch(
//   "/update-item/:id",
//   todoController.updateTodoByID.bind(todoController),
// );

export default router;
