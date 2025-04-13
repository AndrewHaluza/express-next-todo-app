import Link from "next/link";

import { useTasks } from "../../hooks/task";
import { Task } from "../../type/task";
import { Loader } from "../common/Loader";
import { NotFound } from "../common/NotFound";
import { DeleteTaskButton } from "./common/button/DeleteTaskButton";
import { EditTaskButton } from "./common/button/EditTaskButton";
import { Pagination } from "./common/Pagination";
import { StatusTag } from "./common/StatusTag";
import { TaskDates } from "./common/TaskDates";

export function TaskList() {
  const { data, isLoading, error } = useTasks();

  if (isLoading) return <Loader />;

  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col gap-[5px] row-start-2 items-center sm:items-start">
      <h1 className="text-4xl">Task List:</h1>

      {!data?.meta?.pagination?.totalItems ? (
        <NotFound message="No tasks yet" />
      ) : (
        <ul className="mb-4">
          {data?.data?.map((task: Task, index: number) => (
            <li key={index} className="flex flex-col items-start mb-2">
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
              <TaskDates
                createdAt={task.createdAt}
                updatedAt={task.updatedAt}
              />
            </li>
          ))}
        </ul>
      )}
      <Pagination />
    </div>
  );
}
