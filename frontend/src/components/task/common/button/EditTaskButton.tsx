import { useTaskContext } from "../../../../hooks/task";
import { Task } from "../../../../type/task";

export function EditTaskButton({ task }: { task: Task }) {
  const { openModal } = useTaskContext();

  function handleOnEditClick(task: Task) {
    openModal(task);
  }

  return (
    <button
      onClick={() => handleOnEditClick(task)}
      className="bg-indigo-400 dark:bg-indigo-600 text-white px-4 py-2"
    >
      Edit
    </button>
  );
}
