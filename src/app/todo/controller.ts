import type { Request, Response } from "express";
import { createTodoPayloadModel, deleteIdSchema } from "./model.js";
import { db } from "../../db/db.js";
import { todoTables } from "../../db/schema.js";
import { eq, isNotNull } from "drizzle-orm";

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

  // get all TODO
  public async getAllTodo(req: Request, res: Response) {
    // query DB and get all todo's
    const getTodo = await db
      .select({
        id: todoTables.id,
        title: todoTables.title,
        description: todoTables.description,
        isCompleted: todoTables.isCompleted,
      })
      .from(todoTables);
    //   .where(isNotNull(todoTables.description));

    // validaton
    if (getTodo.length === 0) {
      return res.status(404).json({ message: "No Items" });
    }

    return res.status(200).json({
      todos: getTodo,
    });
  }

  // delete todo by id
  public async deleteById(req: Request, res: Response) {
    const idValidate = await deleteIdSchema.safeParseAsync(req.params);

    if (idValidate.error) {
      return res.status(400).json({
        message: "id Validation Failed",
        error: idValidate.error.issues,
      });
    }
    const { id } = idValidate.data;
    const [deleteItem] = await db
      .delete(todoTables)
      .where(eq(todoTables.id, id))
      .returning();

    if (!deleteItem) {
      return res.status(404).json({
        message: `Todo with ID ${id} not found`,
      });
    }

    return res.status(200).json({
      message: "Deleted successfully",
      deleteItem,
    });
  }
}

export default TodoController;
