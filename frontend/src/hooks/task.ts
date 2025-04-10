import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { useContext } from "react";

import { TaskModalContext } from "../contexts/TaskModalContext";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../services/api/task";
import { Task } from "../type/task";

const TaskKeys = {
  list: ["task", "list"] as const,
  detail: (id: string) => ["task", id] as const,
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TaskKeys.list });
    },
    onError: (error: unknown) => {
      console.error("Error creating task:", error);
    },
  });
};

export const useTask = (id: string): UseQueryResult<Task> => {
  return useQuery<Task>({
    queryKey: TaskKeys.detail(id),
    queryFn: () => getTask(id),
  });
};

export const useTasks = (): UseQueryResult<Task[]> => {
  return useQuery<Task[]>({
    queryKey: TaskKeys.list,
    queryFn: () => getTasks(),
  });
};

export const useDeleteTask = <
  T extends { id: number; redirect: boolean }
>() => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props: T) => deleteTask(props.id),
    onMutate: async (props: T) => {
      await queryClient.cancelQueries({ queryKey: TaskKeys.list });

      const previousTasks =
        queryClient.getQueryData<Task[]>(TaskKeys.list) || [];

      queryClient.setQueryData<Task[]>(
        TaskKeys.list,
        (old: Task[] | undefined) =>
          old ? old.filter((task) => task.id !== props.id) : []
      );

      if (props.redirect) {
        window.location.href = "/";
      }

      return {
        previousTasks,
      };
    },
    onError: (
      err: unknown,
      props: T,
      context: { previousTasks: Task[] } | undefined
    ) => {
      console.error("Error deleting task:", err);

      if (context?.previousTasks) {
        queryClient.setQueryData(TaskKeys.list, context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TaskKeys.list });
    },
  });
};

export const useTaskUpdateModal = () => {
  const context = useContext(TaskModalContext);

  if (!context) {
    throw new Error("useTaskModal must be used within a TaskModalProvider");
  }

  return context;
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useTaskUpdateModal();

  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TaskKeys.list });
      closeModal();
    },
    onError: (error: unknown) => {
      console.error("Error updating task:", error);
    },
  });
};
