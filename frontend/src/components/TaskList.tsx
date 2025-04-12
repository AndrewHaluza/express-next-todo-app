import Link from "next/link";

import { useTaskContext, useTasks } from "../hooks/task";
import { Task } from "../type/task";
import { EditTaskButton } from "./common/EditTaskButton";
import { StatusTag } from "./common/StatusTag";
import { TaskDates } from "./TaskDates";
import { DeleteTaskButton } from "./common/DeleteTaskButton";

export function TaskList() {
  const { page, setPage } = useTaskContext();

  const { data, isLoading, error } = useTasks();

  if (isLoading) return <p>Loading...</p>;

  if (error instanceof Error) return <p>Error: {error.message}</p>;

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < (data?.meta?.pagination?.totalPages ?? 1)) {
      setPage(page + 1);
    }
  };

  return (
    <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <h1 className="text-4xl">Task List:</h1>
      <ul className="space-y-4">
        {data?.data?.map((task: Task, index: number) => (
          <li key={index} className="flex flex-col items-start">
            <div className="flex justify-between w-[600px] max-w-[600px]">
              <Link
                href={`/${task.id}`}
                className="text-indigo-400 hover:underline text-2xl max-w-[305px] dark:text-indigo-300 mr-2 truncate overflow-hidden whitespace-nowrap"
              >
                {task.title}
              </Link>
              <div className="flex items-center space-x-4">
                <StatusTag status={task.status} />

                <EditTaskButton task={task} />

                <DeleteTaskButton id={task.id} />
              </div>
            </div>
            <TaskDates createdAt={task.createdAt} updatedAt={task.updatedAt} />
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePreviousPage}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 flex items-center"
          disabled={(data?.meta?.pagination?.page ?? 1) <= 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <span className="mx-4 flex items-center ">
          {`Page ${page} of ${data?.meta?.pagination?.totalPages}`}
        </span>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 flex items-center"
          disabled={
            !data?.meta?.pagination?.totalPages ||
            data?.meta?.pagination?.page >= data?.meta?.pagination?.totalPages
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
