"use client";

import {
  createTodoAction,
  deleteTodoAction,
  updateTodoAction,
} from "@/actions/todos-actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { SelectTodo } from "@/db/schema";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface TodoListProps {
  userId: string;
  initialTodos: SelectTodo[];
}

export function TodoList({ userId, initialTodos }: TodoListProps) {
  const router = useRouter();

  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState(initialTodos);

  const handleAddTodo = async () => {
    if (newTodo.trim() !== "") {
      const optimisticId = uuidv4();
      const optimisticTodo = {
        id: optimisticId,
        userId,
        content: newTodo,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Optimistic update
      setTodos((prevTodos) => [...prevTodos, optimisticTodo]);
      setNewTodo("");

      // Server action
      const result = await createTodoAction({
        userId: userId,
        content: newTodo,
        completed: false,
      });

      if (result.status === "success" && result.data) {
        // Replace optimistic todo with server response
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === optimisticId ? result.data : todo
          )
        );
        router.refresh(); // Refresh the page to ensure server-side data is up to date
      } else {
        // Remove optimistic todo if server request failed
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo.id !== optimisticId)
        );
        console.error("Failed to create todo:", result.message);
      }
    }
  };

  const handleToggleTodo = async (id: string, completed: boolean) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !completed } : todo
      )
    );

    await updateTodoAction(id, { completed: !completed });
    router.refresh();
  };

  const handleRemoveTodo = async (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

    await deleteTodoAction(id);
    router.refresh();
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-card rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>
      <div className="flex mb-4">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="mr-2"
          onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
        />
        <Button onClick={handleAddTodo}>Add</Button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-muted p-2 rounded"
          >
            <div className="flex items-center">
              <Checkbox
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onCheckedChange={() =>
                  handleToggleTodo(todo.id, todo.completed)
                }
                className="mr-2"
              />
              <label
                htmlFor={`todo-${todo.id}`}
                className={`${
                  todo.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {todo.content}
              </label>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveTodo(todo.id)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete todo</span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
