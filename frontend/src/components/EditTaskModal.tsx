import { useEffect, useState } from "react";

import { useTaskUpdateModal, useUpdateTask } from "../hooks/task";
import { TaskStatus } from "../type/task";

export function EditTaskModal() {
  const { updateTask, closeModal } = useTaskUpdateModal();
  const updateTaskMutation = useUpdateTask();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<TaskStatus>("todo");

  useEffect(() => {
    setStatus(updateTask?.status ?? "todo");
    setTitle(updateTask?.title ?? "");
    setDescription(updateTask?.description ?? "");
  }, [updateTask]);

  if (!updateTask) return null;

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateTaskMutation.mutate(
      { id: updateTask.id, title, description, status },
      {
        onSuccess: () => {
          closeModal();

          setTitle("");
          setDescription("");
          setStatus("todo");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/75 dark:bg-gray-800/85">
      <div className="shadow-lg w-96 p-6 bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Edit Task
        </h2>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
              rows={4}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
              required
            >
              <option value="todo">TODO</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
              <option value="postponed">Postponed</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
