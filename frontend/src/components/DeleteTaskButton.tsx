import { useDeleteTask } from "../hooks/task";

export function DeleteTaskButton({
  id,
  redirect = false,
}: {
  id: number;
  redirect?: boolean;
}) {
  const deleteTaskMutation = useDeleteTask();

  function handleOnDeleteClick(id: number, redirect: boolean) {
    deleteTaskMutation.mutate({ id, redirect });
  }

  return (
    <button
      onClick={() => handleOnDeleteClick(id, redirect)}
      className="bg-red-400 dark:bg-red-500 text-white px-4 py-2 mr-2"
    >
      Delete
    </button>
  );
}
