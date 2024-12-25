import { useCreateTodoMutation } from "@/app/components/TodoAddForm/hooks";
import { createTodoSchema } from "@/app/components/TodoAddForm/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function TodoAddForm() {
  const { mutate, status } = useCreateTodoMutation();
  const form = useForm({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = (data: z.infer<typeof createTodoSchema>) => {
    const toastId = toast.loading("Please wait, adding todo...");
    mutate(
      { description: data.description },
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
          form.reset();
        },
      }
    );
  };

  return (
    <>
      <form
        className="w-3/4 m-4 flex flex-row space-x-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Controller
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <input
              {...field}
              className="w-full border border-black h-12 rounded-md focus:ring focus:ring-black p-4 disabled:opacity-50"
              placeholder="Enter the todo here..."
              disabled={status === "pending"}
            />
          )}
        />
        <button
          className="bg-black rounded-lg text-white px-6 disabled:opacity-50"
          disabled={status === "pending"}
        >
          +
        </button>
      </form>
      <span className="text-red-500">
        {form.formState.errors.description?.message}
      </span>
    </>
  );
}
