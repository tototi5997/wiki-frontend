import c from "classnames";
import s from "./index.module.less";
import { useAllTasks } from "@/state/task/hook";
import { Button, Select } from "antd";
import { Children, useState } from "react";
import { TaskStatus } from "@/api/task";
import Icon from "@/components/icon";
import { useQueryClient } from "@tanstack/react-query";

const TaskHall = () => {
  const queryClient = useQueryClient();

  const [status, setStatus] = useState<TaskStatus | -1>(0);

  const { data: tasksData } = useAllTasks({ page: 1, pageSize: 10, status: status === -1 ? undefined : status });

  const { data: tasks } = tasksData ?? {};

  const handleSearch = () => {
    queryClient.invalidateQueries({ queryKey: ["all-tasks"] });
  };

  return (
    <div className={c(s.task_hall)}>
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
          return Children.toArray(<div className={c(s.task_item, "usn hand w-full")}>{t.title}</div>);
        })}
        {!tasks?.length && <div className="h-100">暂无任务</div>}
      </div>
    </div>
  );
};

export default TaskHall;
