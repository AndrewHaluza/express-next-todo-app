export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
};
export type TaskStatus =
  | "todo"
  | "in-progress"
  | "done"
  | "postponed"
  | "archived";

export type getTasksResponse = {
  data: Task[];
};

export type getTaskResponse = {
  data: Task;
};

export type deleteTaskResponse = {
  data: {
    message: string;
  };
};

export type createTaskBody = Pick<Task, "title" | "description">;

export type updateTaskBody = Pick<Task, "title" | "description" | "status">;

export type updateTaskPayload = Pick<
  Task,
  "id" | "title" | "description" | "status"
>;
