import Link from "next/link";
import { NotFound } from "../../common/NotFound";

export function TaskNotFound() {
  return (
    <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-[500px] max-w-[500px]">
      <div className="flex items-center justify-items-stretch w-full">
        <Link
          href="/"
          className="text-indigo-400 hover:underline text-2xl dark:text-indigo-600 ml-0 mr-auto"
        >
          Back
        </Link>
      </div>

      <NotFound message="Task not found" />
    </div>
  );
}
