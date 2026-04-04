import express from "express";
import type { Router } from "express";
import {
  createItem,
  getAllItems,
  deleteItem,
  updateItem,
} from "./todo.controller.js";
const router: Router = express.Router();

router.post("/add-todo", createItem);
router.get("/all-todo", getAllItems);
router.delete("/delete-item/:id", deleteItem);
router.patch("/update-item/:id", updateItem);

export default router;
