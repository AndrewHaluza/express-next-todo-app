import { ReactElement } from "react";

import { CreateTask } from "../src/components/CrateTask";
import { EditTaskModal } from "../src/components/EditTaskModal";
import DefaultLayout from "../src/layouts/layout";
import { TaskList } from "../src/components/TaskList";
import { TaskModalProvider } from "../src/contexts/TaskModalContext";

function TasksListPage() {
  return (
    <TaskModalProvider>
      <CreateTask />

      <TaskList />

      <EditTaskModal />
    </TaskModalProvider>
  );
}

TasksListPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default TasksListPage;
