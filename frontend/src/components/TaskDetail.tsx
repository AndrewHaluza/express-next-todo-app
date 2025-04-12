import Link from "next/link";
import { useTask } from "../hooks/task";
import { StatusTag } from "./common/StatusTag";
import { TaskDates } from "./TaskDates";
import { EditTaskButton } from "./common/EditTaskButton";
import { DeleteTaskButton } from "./common/DeleteTaskButton";

export function TaskDetail({ id }: { id: string }) {
  const { data, isLoading, error } = useTask(id);

  if (isLoading) return <p>Loading...</p>;

  if (error instanceof Error) return <p>Error: {error.message}</p>;

  if (!data) return <p>No task found</p>;

  return (
    <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-[500px] max-w-[500px]">
      <div className="flex items-center justify-items-stretch w-full">
        <Link
          href="/"
          className="text-indigo-400 hover:underline text-2xl dark:text-indigo-600 ml-0 mr-auto"
        >
          Back
        </Link>

        <div>
          <DeleteTaskButton id={data.id} page="task-detail" />

          <EditTaskButton task={data} />
        </div>
      </div>

      <h1 className="text-3xl">Task Detail</h1>
      <div className="flex flex-col items-start space-y-4">
        <p className="text-2xl truncate overflow-hidden whitespace-nowrap">
          <span className="font-semibold">Task ID:</span> {data.id}
        </p>
        <p className="text-2xl truncate overflow-hidden whitespace-nowrap">
          <span className="font-semibold">Title:</span> {data.title}
        </p>
        <p className="text-2xl truncate overflow-hidden whitespace-nowrap">
          <span className="font-semibold">Description:</span>
          <span className="block">{data.description}</span>
        </p>
        <p className="flex text-2xl truncate overflow-hidden whitespace-nowrap">
          <span className="font-semibold mr-2">Status:</span>{" "}
          <StatusTag status={data.status} />
        </p>
        <TaskDates createdAt={data.createdAt} updatedAt={data.updatedAt} />
      </div>
    </div>
  );
}
