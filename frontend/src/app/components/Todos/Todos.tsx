import TodoDeleteButton from "@/app/components/Todos/Actions/DeleteTodo/DeleteTodo";
import TodoCheckbox from "@/app/components/Todos/Actions/TodoCheckbox/TodoCheckbox";
import { useTodosQuery } from "@/app/components/Todos/hooks";
import Spinner from "@/components/ui/Spinner";

export default function Todos() {
  const { data, status } = useTodosQuery();

  if (status === "pending") {
    return (
      <div className="flex flex-col w-full h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col w-full h-full items-center justify-center">
        <span>
          Sorry, something went wrong. Please refresh the page or try again
          later.
        </span>
      </div>
    );
  }

  const { todos } = data;

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      {todos?.map((todo, idx) => (
        <div
          key={idx}
          className={`${
            idx % 2 == 0 ? "bg-white text-black" : "bg-black text-white"
          } flex flex-row w-full text-center border rounded-md space-x-8 px-2`}
        >
          <div className="w-full">{todo.description}</div>
          <TodoCheckbox todo={todo} />
          <TodoDeleteButton id={todo.id} />
        </div>
      ))}
    </div>
  );
}
