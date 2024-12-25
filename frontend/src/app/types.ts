export type Todo = {
  id: string;
  description: string;
  completed: boolean;
};

type FailType = {
  success: false | undefined;
  message: string | undefined;
};

type SuccessType<T> = {
  success: true;
  message: string;
  data: T;
};

export type ApiDefault<T = never> = FailType | SuccessType<T>;
