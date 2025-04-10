export function TaskDates(props: { createdAt: string; updatedAt: string }) {
  return (
    <div className="text-xs text-gray-500 mt-2  dark:text-gray-300">
      Created: {new Date(props.createdAt).toLocaleDateString()} | Updated:{" "}
      {new Date(props.updatedAt).toLocaleDateString()}
    </div>
  );
}
