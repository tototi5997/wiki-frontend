import c from "classnames";
import s from "./index.module.less";
import { useAllTasks } from "@/state/task/hook";
import { Button, Select } from "antd";
import { Children, useState } from "react";
import { TaskStatus, TypeTask } from "@/api/task";
import Icon from "@/components/icon";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const TaskHall = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [status, setStatus] = useState<TaskStatus | -1>(-1);

  const { data: tasksData } = useAllTasks({ page: 1, pageSize: 10, status: status === -1 ? undefined : status });

  const { data: tasks } = tasksData ?? {};

  const handleSearch = () => {
    queryClient.invalidateQueries({ queryKey: ["all-tasks"] });
  };

  const handleClickTaskItem = (task: TypeTask) => {
    navigate("/taskDetail/" + task.id);
  };

  return (
    <div className={c(s.task_hall, "px-0 py-170 mobile:px-20 mobile:py-0")}>
      <div className={c("fbh fbac gap-12")}>
        <Select
          options={[
            { label: "全部", value: -1 },
            { label: "待接取", value: 0 },
            { label: "进行中", value: 1 },
            { label: "已完成", value: 2 },
          ]}
          value={status}
          className="w-120"
          onChange={setStatus}
        />
        <Button onClick={handleSearch}>
          <Icon name="search" />
        </Button>
      </div>

      <div className={c(s.tasks_content, "fbv fbjc fbac gap-12 mt-20")}>
        {tasks?.map((t) => {
          return Children.toArray(
            <div className={c(s.task_item, "usn hand w-full")} onClick={() => handleClickTaskItem(t)}>
              {t.title}
            </div>
          );
        })}
        {!tasks?.length && <div className="h-100">暂无任务</div>}
      </div>
    </div>
  );
};

export default TaskHall;
