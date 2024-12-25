import { ApiDefault, Todo } from "@/app/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * This mutation specifically handles optimistic updates.
 */
export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onMutate: async (newTodo) => {
      // Make sure that we aren't going to accidentally cancel out our optimistic update.
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData(["todos"]) as {
        todos: Todo[];
      };

      const newTodos = previousTodos.todos.map((todo) =>
        todo.id === newTodo.todo.id ? { ...todo, ...newTodo.todo } : todo
      );

      queryClient.setQueryData(["todos"], () => {
        return { todos: newTodos };
      });

      // This will be the context that we can fallback on if we error.
      return { previousTodos };
    },

    onError: (_error, _variables, context) => {
      // Reset back to the previous state because something went wrong.
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    onSettled: () => {
      // Refresh regardless of the API returning a pass or not.
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

const updateTodo = async ({ todo }: { todo: Todo }) => {
  const res = await fetch("/api/todo/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  console.log("meow");

  const json = (await res.json()) as ApiDefault;

  if (!json.success) {
    return { success: false, message: json.message };
  }

  return { success: true, message: json.message };
};
