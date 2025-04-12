import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { useContext } from "react";

import { TaskContext } from "../contexts/TaskContext";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../services/api/task";
import {
  getTasksResponse,
  NewTask,
  Task,
  UpdateTask,
  useCreateTaskMutationResponse,
  UseUpdateTaskMutationResponse,
} from "../type/task";
import { PAGINATION } from "../constants/pagination";
import { Page } from "../type";
import { useRouter } from "next/router";

const TaskKeys = {
  list: (page: number, limit: number) => ["task", page, limit] as const,
  detail: (id: string) => ["task", id] as const,
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { page, limit } = useTaskContext();

  return useMutation({
    mutationFn: createTask,
    onMutate: async (
      newTask: NewTask
    ): Promise<useCreateTaskMutationResponse> => {
      await queryClient.cancelQueries({
        queryKey: TaskKeys.list(page, limit),
      });

      const previousTasks = queryClient.getQueryData<getTasksResponse>(
        TaskKeys.list(page, limit)
      ) ?? {
        data: [],
        meta: {
          pagination: { page, limit, totalPages: 0, totalItems: 0 },
        },
      };

      queryClient.setQueryData<getTasksResponse>(
        TaskKeys.list(page, limit),
        (old: getTasksResponse | undefined): getTasksResponse => {
          return {
            data: [
              ...(old?.data || []),
              {
                ...newTask,
                id: Date.now(),
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString(),
                status: "todo",
              },
            ],
            meta: old?.meta || {
              pagination: {
                page,
                limit,
                totalPages: 1,
                totalItems: 1,
              },
            },
          };
        }
      );

      return { previousTasks };
    },
    onError: (
      error: unknown,
      _: unknown, // Placeholder for unused parameter
      context: useCreateTaskMutationResponse | undefined
    ) => {
      console.error("Error creating task:", error);

      if (context?.previousTasks) {
        const currentPage = PAGINATION.DEFAULT_PAGE; // Replace with dynamic value if available
        const currentLimit = PAGINATION.DEFAULT_PAGE_SIZE; // Replace with dynamic value if available

        queryClient.setQueryData(
          TaskKeys.list(currentPage, currentLimit),
          context.previousTasks
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: TaskKeys.list(page, limit),
      });
    },
  });
};

export const useTask = (id: string): UseQueryResult<Task> => {
  return useQuery<Task>({
    queryKey: TaskKeys.detail(id),
    queryFn: () => getTask(id),
  });
};

export const useTasks = (): UseQueryResult<getTasksResponse> => {
  const { page, limit } = useTaskContext();
  return useQuery<getTasksResponse>({
    queryKey: TaskKeys.list(page, limit),
    queryFn: () => getTasks(page, limit),
  });
};

export const useDeleteTask = <T extends { id: number; page: Page }>() => {
  const queryClient = useQueryClient();
  const { page, limit } = useTaskContext();

  return useMutation({
    mutationFn: (props: T) => deleteTask(props.id),
    onMutate: async (props: T) => {
      await queryClient.cancelQueries({
        queryKey: TaskKeys.list(page, limit),
      });

      const previousTasks =
        queryClient.getQueryData<Task[]>(TaskKeys.list(page, limit)) || [];

      queryClient.setQueryData<getTasksResponse>(
        TaskKeys.list(page, limit),
        (old: getTasksResponse | undefined) => {
          return old
            ? {
                ...old,
                data: old.data.filter((task) => task.id !== props.id),
              }
            : undefined;
        }
      );

      if (props.page === "task-detail") {
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
        queryClient.setQueryData(
          TaskKeys.list(page, limit),
          context.previousTasks
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: TaskKeys.list(page, limit),
      });
    },
  });
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }

  return context;
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { closeModal, page, limit } = useTaskContext();
  const router = useRouter();
  const slug = (router?.query?.slug as string) ?? "";

  const isDetailPage = !!slug;
  const detailQueryKey = TaskKeys.detail(slug.toString());
  const listQueryKey = TaskKeys.list(page, limit);

  return useMutation({
    mutationFn: updateTask,
    onMutate: async (
      updatedTask: UpdateTask
    ): Promise<UseUpdateTaskMutationResponse> => {
      if (isDetailPage) {
        await queryClient.cancelQueries({
          queryKey: detailQueryKey,
        });

        const previousTask = queryClient.getQueryData<Task>(detailQueryKey);

        queryClient.setQueryData<Task>(
          detailQueryKey,
          (old: Task | undefined): Task => {
            return old
              ? {
                  ...old,
                  ...updatedTask,
                }
              : {
                  id: updatedTask.id,
                  title: updatedTask.title,
                  description: updatedTask.description,
                  status: updatedTask.status,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                };
          }
        );

        return { previousTask };
      } else {
        await queryClient.cancelQueries({
          queryKey: listQueryKey,
        });

        const previousTasks =
          queryClient.getQueryData<getTasksResponse>(listQueryKey);

        queryClient.setQueryData<getTasksResponse>(
          listQueryKey,
          (old: getTasksResponse | undefined): getTasksResponse => {
            return old
              ? {
                  ...old,
                  data: old.data.map((task) =>
                    task.id === updatedTask.id
                      ? { ...task, ...updatedTask }
                      : task
                  ),
                }
              : {
                  data: [],
                  meta: {
                    pagination: { page, limit, totalPages: 0, totalItems: 0 },
                  },
                };
          }
        );

        return { previousTasks };
      }
    },
    onSuccess: () => {
      if (isDetailPage) {
        queryClient.invalidateQueries({
          queryKey: detailQueryKey,
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: listQueryKey,
        });
      }

      closeModal();
    },
    onError: (
      error: unknown,
      _: Task,
      context: UseUpdateTaskMutationResponse | undefined
    ) => {
      console.error("Error updating task:", error);

      if (context?.previousTasks) {
        queryClient.setQueryData(
          TaskKeys.list(page, limit),
          context.previousTasks
        );
      } else if (context?.previousTask) {
        queryClient.setQueryData<Task>(detailQueryKey, context.previousTask);
      }
    },
    onSettled: () => {
      if (isDetailPage) {
        queryClient.invalidateQueries({
          queryKey: detailQueryKey,
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: listQueryKey,
        });
      }
    },
  });
};
