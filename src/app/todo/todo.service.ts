import type { Request, Response } from "express";
import {
  createTodoPayloadModel,
  deleteIdSchema,
  updateTodoPaylodSchema,
} from "./todo.schema.js";
import { db } from "../../db/db.js";
import { todoTables } from "../../db/schema.js";
import { eq, isNotNull } from "drizzle-orm";
import ApiError from "../../utils/apiError.js";

class TodoService {
  // create TODO
  public async createTodo(body: unknown) {
    const validationResult = await createTodoPayloadModel.safeParseAsync(body);
    // if validation fails, return error response
    if (validationResult.error) {
      throw ApiError.BAD_REQUEST(
        "Body Validation Failed",
        validationResult.error?.issues,
      );
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

    // return the result
    return result;
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

  // update TODO by id
  public async updateTodoByID(req: Request, res: Response) {
    // validation for id and body
    const idValidate = await deleteIdSchema.safeParseAsync(req.params);
    // validate the partial body
    const bodyValidation = await updateTodoPaylodSchema.safeParseAsync(
      req.body,
    );

    if (!idValidate.success || !bodyValidation.success) {
      return res.status(400).json({
        message: "Update Validation Failed",
        errors: {
          params: idValidate.error?.issues,
          body: bodyValidation.error?.issues,
        },
      });
    }

    const { id } = idValidate.data;
    // Drizzle handles the partial object automatically
    const updateData = bodyValidation.data;
    const [updateItem] = await db
      .update(todoTables)
      .set(updateData)
      .where(eq(todoTables.id, id))
      .returning();

    if (!updateItem) {
      return res.status(404).json({
        message: `Todo with ID ${id} not found`,
      });
    }
    return res.status(200).json({
      message: "Successfully Updated.",
      updateItem,
    });
  }
}

export default TodoService;
