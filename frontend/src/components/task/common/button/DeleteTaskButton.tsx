import { useDeleteTask } from "../../../../hooks/task";
import { Page } from "../../../../type";

export function DeleteTaskButton({
  id,
  page = "task-list",
}: {
  id: number;
  page?: Page;
}) {
  const deleteTaskMutation = useDeleteTask();

  function handleOnDeleteClick(id: number, page: Page) {
    deleteTaskMutation.mutate({ id, page });
  }

  return (
    <button
      onClick={() => handleOnDeleteClick(id, page)}
      className="bg-red-400 dark:bg-red-500 text-white px-4 py-2 mr-2"
    >
      Delete
    </button>
  );
}
