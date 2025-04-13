import { useTaskContext, useTasks } from "../../../hooks/task";

export function Pagination() {
  const { page, setPage } = useTaskContext();

  const { data } = useTasks();

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
    !!data?.meta?.pagination?.totalPages && (
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePreviousPage}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 flex items-center disabled:bg-gray-100 disabled:dark:bg-gray-400 disabled:cursor-not-allowed"
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
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 flex items-center disabled:bg-gray-100 disabled:dark:bg-gray-400 disabled:cursor-not-allowed"
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
    )
  );
}
