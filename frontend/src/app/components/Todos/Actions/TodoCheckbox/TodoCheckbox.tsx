import { useUpdateTodoMutation } from "@/app/components/Todos/Actions/TodoCheckbox/hooks";
import { Todo } from "@/app/types";
import { toast } from "sonner";

export default function TodoCheckbox({ todo }: { todo: Todo }) {
  const { mutate, status } = useUpdateTodoMutation();

  const onSubmit = () => {
    mutate(
      {
        todo: {
          ...todo,
          completed: !todo.completed,
        },
      },
      {
        onSuccess: (data) => {
          if (!data.success) {
            toast.error(data.message ?? "Sorry, something went wrong.");
          }
        },
      }
    );
  };

  return (
    <input
      type="checkbox"
      checked={todo.completed}
      onClick={onSubmit}
      disabled={status === "pending"}
    />
  );
}
