import { useState } from "react";

import { useCreateTask } from "../../../hooks/task";

export function CreateTask() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const createTaskMutation = useCreateTask();

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createTaskMutation.mutate(
      { title, description },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
        },
      }
    );
  };

  return (
    <form
      className="flex items-center justify-center bg-white dark:bg-gray-800 p-4 rounded shadow-md"
      onSubmit={handleOnSubmit}
    >
      <input
        className="mr-2"
        placeholder="What you gonna do next?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="ml-2"
        placeholder="Add description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        type="submit"
        disabled={!title || !description}
        className="bg-indigo-400 dark:bg-indigo-600 text-white font-bold py-2 px-4 ml-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
      >
        Add
      </button>
      <button
        type="button"
        onClick={() => {
          const randomTitles = [
            "Go for a run",
            "Read a book",
            "Write a blog post",
          ];
          const randomDescriptions = [
            "-put on running shoes\n-run 5km",
            "-choose a book\n-read 50 pages",
            "-pick a topic\n-write 500 words",
          ];
          const randomIndex = Math.floor(Math.random() * randomTitles.length);
          setTitle(randomTitles[randomIndex]);
          setDescription(randomDescriptions[randomIndex]);
        }}
        className="bg-green-400 dark:bg-green-600 text-white font-bold py-2 px-4 ml-2"
      >
        Random
      </button>
    </form>
  );
}
