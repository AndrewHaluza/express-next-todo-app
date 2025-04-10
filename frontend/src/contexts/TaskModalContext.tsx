import React, { createContext, useState } from "react";

import { Task } from "../type/task";

interface TaskModalContextType {
  updateTask: Task | null;
  openModal: (task: Task) => void;
  closeModal: () => void;
}

export const TaskModalContext = createContext<TaskModalContextType | undefined>(
  undefined
);

export const TaskModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [updateTask, setUpdateTask] = useState<Task | null>(null);

  const openModal = (task: Task) => {
    setUpdateTask({ ...task });
  };
  const closeModal = () => {
    setUpdateTask(null);
  };

  return (
    <TaskModalContext.Provider value={{ updateTask, openModal, closeModal }}>
      {children}
    </TaskModalContext.Provider>
  );
};
