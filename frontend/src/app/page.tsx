import TodoAddForm from "@/app/components/TodoAddForm/TodoAddForm";
import Todos from "@/app/components/Todos/Todos";

export default function RootPage() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <span>Todo App with Spring & React</span>
      <TodoAddForm />
      <Todos />
    </div>
  );
}
