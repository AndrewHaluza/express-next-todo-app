import { TaskStatus } from "../type/task";

export function StatusTag(props: { status: TaskStatus; className?: string }) {
  return (
    <span
      className={`flex items-center justify-center px-2 py-1 rounded-full h-[30px] text-white ${
      props.status === "done"
        ? "bg-green-400"
        : props.status === "todo"
        ? "bg-yellow-400"
        : props.status === "in-progress"
        ? "bg-blue-400"
        : props.status === "postponed"
        ? "bg-orange-400"
        : "bg-gray-500"
      }`}
    >
      {props.status === "todo"
      ? "To Do"
      : props.status === "in-progress"
      ? "In Progress"
      : props.status === "done"
      ? "Done"
      : props.status === "postponed"
      ? "Postponed"
      : "Archived"}
    </span>
  );
}
