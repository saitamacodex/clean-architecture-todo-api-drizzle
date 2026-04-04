import TodoService from "./todo.service.js";
import type { Request, Response } from "express";
import ApiResponse from "../../utils/apiResponse.js";

const todoService = new TodoService();

export const createItem = async (req: Request, res: Response) => {
  const item = await todoService.createTodo(req.body);
  return ApiResponse.CREATED(res, item, "Todo Created");
};
