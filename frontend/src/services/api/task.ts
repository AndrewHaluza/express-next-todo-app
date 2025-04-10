import {
  createTaskBody,
  deleteTaskResponse,
  getTaskResponse,
  getTasksResponse,
  updateTaskBody,
  updateTaskPayload,
} from "../../type/task";
import { api } from "./core";

const taskApiUrl = "/api/v1/task";

export const getTasks = async () => {
  const { data } = await api.get<getTasksResponse>(`${taskApiUrl}`);

  return data;
};

export const getTask = async (id: string) => {
  const { data } = await api.get<getTaskResponse>(`${taskApiUrl}/${id}`);

  return data;
};

export const createTask = async (task: createTaskBody) => {
  const { data } = await api.post<createTaskBody, getTaskResponse>(
    taskApiUrl,
    task
  );
  return data;
};

export const updateTask = async (task: updateTaskPayload) => {
  const { data } = await api.put<updateTaskBody, getTaskResponse>(
    `${taskApiUrl}/${task.id}`,
    {
      title: task.title,
      description: task.description,
      status: task.status,
    }
  );

  return data;
};

export const deleteTask = async (id: number) => {
  const { data } = await api.delete<deleteTaskResponse>(`${taskApiUrl}/${id}`);

  return data;
};
