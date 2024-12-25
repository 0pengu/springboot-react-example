import { ApiDefault } from "@/app/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

const deleteTodo = async ({ id }: { id: string }) => {
  const res = await fetch("/api/todo/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const json = (await res.json()) as ApiDefault;

  if (!json.success) {
    return { success: false, message: json.message };
  }

  return { success: true, message: json.message };
};
