import type { Request, Response } from "express";
import { createTodoPayloadModel } from "./model.js";
import { db } from "../../db/db.js";
import { todoTables } from "../../db/schema.js";
import { Result } from "pg";

class TodoController {
  // create TODO
  public async createTodo(req: Request, res: Response) {
    const validationResult = await createTodoPayloadModel.safeParseAsync(
      req.body,
    );
    // if validation fails, return error response
    if (validationResult.error) {
      return res.status(400).json({
        message: "Body Validation Failed",
        error: validationResult.error.issues,
      });
    }
    // if validation succeeds insert into DB
    const { title, description, isCompleted } = validationResult.data;
    const [result] = await db
      .insert(todoTables)
      .values({
        title,
        description,
        isCompleted,
      })
      .returning({ id: todoTables.id });

    return res.status(201).json({
      message: "todo created.",
      id: result?.id,
    });
  }
}

export default TodoController;
