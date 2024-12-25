import { useDeleteTodoMutation } from "@/app/components/Todos/Actions/DeleteTodo/hooks";
import { toast } from "sonner";

export default function TodoDeleteButton({ id }: { id: string }) {
  const { mutate, status } = useDeleteTodoMutation();

  const onSubmit = () => {
    const toastId = toast.loading("Please wait, deleting todo...");
    mutate(
      { id },
      {
        onSuccess: (data) => {
          if (!data.success) {
            return toast.error(data.message ?? "Sorry, something went wrong.", {
              id: toastId,
            });
          }

          toast.success(data.message, {
            id: toastId,
          });
        },
      }
    );
  };

  return (
    <button disabled={status === "pending"} onClick={onSubmit}>
      🗑️
    </button>
  );
}
