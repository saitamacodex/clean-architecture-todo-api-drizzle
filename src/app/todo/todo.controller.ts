import TodoService from "./todo.service.js";
import type { Request, Response } from "express";
import ApiResponse from "../../utils/apiResponse.js";

const todoService = new TodoService();

export const createItem = async (req: Request, res: Response) => {
  const item = await todoService.createTodo(req.body);
  return ApiResponse.CREATED(res, item, "Todo Created");
};

export const getAllItems = async (req: Request, res: Response) => {
  const fetchedItem = await todoService.getAllTodo();
  return ApiResponse.OK(res, fetchedItem, "Items Fetched Successfully");
};

export const deleteItem = async (req: Request, res: Response) => {
  const deletedItem = await todoService.deleteById(req.params);
  return ApiResponse.OK(res, deletedItem, "Item deleted Successfully");
};

export const updateItem = async (req: Request, res: Response) => {
  const updatedItem = await todoService.updateTodoByID(req.params, req.body);
  return ApiResponse.OK(res, updatedItem, "Item updated successfully");
};
