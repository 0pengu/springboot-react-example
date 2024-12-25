import { ApiDefault } from "@/app/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNewTodo,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

const createNewTodo = async ({ description }: { description: string }) => {
  const res = await fetch("/api/todo/create", {
    method: "POST",
    body: JSON.stringify({
      description,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = (await res.json()) as ApiDefault;

  if (!json.success) {
    return { success: false, message: json.message };
  }
  return { success: true, message: json.message };
};
