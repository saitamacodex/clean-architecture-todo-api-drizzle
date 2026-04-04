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
  public async getAllTodo() {
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
      throw ApiError.NOT_FOUND("Items Not Found");
    }
    return getTodo;
  }

  // delete todo by id
  public async deleteById(idParam: unknown) {
    const idValidate = await deleteIdSchema.safeParseAsync(idParam);

    if (idValidate.error) {
      throw ApiError.BAD_REQUEST(
        "id Validation Failed",
        idValidate.error.issues,
      );
    }
    const { id } = idValidate.data;
    const [deleteItem] = await db
      .delete(todoTables)
      .where(eq(todoTables.id, id))
      .returning();

    if (!deleteItem) {
      throw ApiError.NOT_FOUND(`Todo with ID ${id} not found`);
    }

    return deleteItem;
  }

  // update TODO by id
  public async updateTodoByID(idParam: unknown, reqBody: unknown) {
    // validation for id and body
    const idValidate = await deleteIdSchema.safeParseAsync(idParam);
    // validate the partial body
    const bodyValidation = await updateTodoPaylodSchema.safeParseAsync(reqBody);

    if (!idValidate.success || !bodyValidation.success) {
      throw ApiError.BAD_REQUEST("Update Validation Failed", {
        params: idValidate.error?.issues,
        body: bodyValidation.error?.issues,
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
      throw ApiError.NOT_FOUND(`Todo with ID ${id} not found`);
    }
    return updateItem;
  }
}

export default TodoService;
