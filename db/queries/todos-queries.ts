"use server";

import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { InsertTodo, SelectTodo, todosTable } from "../schema/todos-schema";

export const createTodo = async (data: InsertTodo) => {
  try {
    const [newTodo] = await db.insert(todosTable).values(data).returning();
    return newTodo;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw new Error("Failed to create todo");
  }
};

export const getTodos = async (userId: string): Promise<SelectTodo[]> => {
  try {
    return db.query.todos.findMany({
      where: eq(todosTable.userId, userId),
    });
  } catch (error) {
    console.error("Error getting todos:", error);
    throw new Error("Failed to get todos");
  }
};

export const getTodo = async (id: string) => {
  try {
    const todo = await db.query.todos.findFirst({
      where: eq(todosTable.id, id),
    });
    if (!todo) {
      throw new Error("Todo not found");
    }
    return todo;
  } catch (error) {
    console.error("Error getting todo by ID:", error);
    throw new Error("Failed to get todo");
  }
};

export const updateTodo = async (id: string, data: Partial<InsertTodo>) => {
  try {
    const [updatedTodo] = await db
      .update(todosTable)
      .set(data)
      .where(eq(todosTable.id, id))
      .returning();
    return updatedTodo;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw new Error("Failed to update todo");
  }
};

export const deleteTodo = async (id: string) => {
  try {
    await db.delete(todosTable).where(eq(todosTable.id, id));
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw new Error("Failed to delete todo");
  }
};
