import { ReactElement } from "react";

import { CreateTask } from "../src/components/common/CrateTask";
import { EditTaskModal } from "../src/components/EditTaskModal";
import DefaultLayout from "../src/layouts/layout";
import { TaskList } from "../src/components/TaskList";
import { TaskProvider } from "../src/contexts/TaskContext";

function TasksListPage() {
  return (
    <TaskProvider>
      <CreateTask />

      <TaskList />

      <EditTaskModal />
    </TaskProvider>
  );
}

TasksListPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default TasksListPage;
