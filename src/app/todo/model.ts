// zod vaidation
import { z } from "zod";

export const createTodoPayloadModel = z
  .object({
    title: z.string().min(10).describe("Enter title of the Todo"),
    description: z
      .string()
      .nullable()
      .optional()
      .describe("Description of the TODO"),
    isCompleted: z
      .boolean()
      .default(false)
      .describe("if the todo item is completed or not"),
  })
  .strict();

// export const deleteIdSchema = z.string().uuid(); (another way)
// Expects { id: "..." }
export const deleteIdSchema = z.object({
  id: z.uuid().describe("enter id"),
});

// this takes existing schema and make all fields optional.
export const updateTodoPaylodSchema = createTodoPayloadModel.partial();
