import { useRouter } from "next/router";
import { ReactElement } from "react";

import { TaskDetail } from "../../src/components/TaskDetail";
import DefaultLayout from "../../src/layouts/layout";
import { TaskProvider } from "../../src/contexts/TaskContext";
import { EditTaskModal } from "../../src/components/EditTaskModal";

function TaskDetailPage() {
  const {
    query: { slug },
  } = useRouter();

  if (typeof slug !== "string") {
    return <p>Invalid task ID</p>;
  }

  return (
    <TaskProvider>
      <TaskDetail id={slug as string} />

      <EditTaskModal />
    </TaskProvider>
  );
}

TaskDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default TaskDetailPage;
