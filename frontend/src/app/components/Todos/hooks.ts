import { ApiDefault, Todo } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

export const useTodosQuery = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
};

const getTodos = async () => {
  const res = await fetch("/api/todo/all", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = (await res.json()) as ApiDefault<Todo[]>;

  if (!data.success) {
    return { todos: null };
  }

  return { todos: data.data };
};
