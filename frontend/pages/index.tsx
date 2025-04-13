import { ReactElement } from "react";

import { CreateTask } from "../src/components/task/common/CrateTask";
import { EditTaskModal } from "../src/components/task/EditTaskModal";
import DefaultLayout from "../src/layouts/layout";
import { TaskList } from "../src/components/task/TaskList";
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
