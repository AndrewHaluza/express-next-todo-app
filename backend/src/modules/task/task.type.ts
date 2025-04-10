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

export type crateTaskData = Pick<Task, "title" | "description">;

export type updateTaskData = Pick<Task, "title" | "description" | "status">;
