import express from "express";
import type { Router } from "express";
import {
  createItem,
  getAllItems,
  deleteItem,
  updateItem,
} from "./todo.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
const router: Router = express.Router();

router.post("/add-todo", createItem);
router.get("/all-todo", getAllItems);
router.delete("/delete-item/:id", asyncHandler(deleteItem));
router.patch("/update-item/:id", asyncHandler(updateItem));

export default router;
