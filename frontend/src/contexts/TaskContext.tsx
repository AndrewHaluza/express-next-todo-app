import React, { createContext, useState } from "react";

import { Task } from "../type/task";
import { PAGINATION } from "../constants/pagination";

interface TaskContextType {
  updateTask: Task | null;
  openModal: (task: Task) => void;
  closeModal: () => void;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState<number>(PAGINATION.DEFAULT_PAGE);
  const [limit, setLimit] = useState<number>(PAGINATION.DEFAULT_PAGE_SIZE);
  const [updateTask, setUpdateTask] = useState<Task | null>(null);

  const openModal = (task: Task) => {
    setUpdateTask({ ...task });
  };
  const closeModal = () => {
    setUpdateTask(null);
  };

  return (
    <TaskContext.Provider
      value={{
        updateTask,
        openModal,
        closeModal,
        page,
        setPage,
        limit,
        setLimit,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
