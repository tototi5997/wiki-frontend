import c from "classnames";
import s from "./index.module.less";
import { Button, Input, Select, Table, TableProps } from "antd";
import { useAllTasks } from "@/state/task/hook";
import { useState } from "react";
import { addKeysToData } from "@/utils/addKeysToData";
import { TaskStatus, TaskStatusMap, TypeTask } from "@/api/task";
import { useQueryClient } from "@tanstack/react-query";
import Icon from "@/components/icon";
import useModal from "@/hooks/useModal";
import { useNavigate } from "react-router-dom";

const TaskManagement = () => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);

  const [query, setQuery] = useState("");

  const [status, setStatus] = useState<TaskStatus | -1>(-1);

  const { data: tasksData, isLoading } = useAllTasks({ page, pageSize: 10, q: query, status: status === -1 ? undefined : status });

  const { data: tasks, total } = tasksData ?? {};

  const modal = useModal();

  const navigate = useNavigate();

  const columns: TableProps<TypeTask>["columns"] = [
    {
      title: "名称",
      dataIndex: "title",
    },
    {
      title: "描述信息",
      dataIndex: "description",
      render: (v) => v ?? "-",
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (v: TaskStatus) => TaskStatusMap?.[v],
    },
    {
      title: "操作",
      render: (_, record) => (
        <div className={c("fbh fbac gap-8")}>
          <span className={c(s.edit_text)} onClick={() => handleToTaskDetail(record)}>
            查看
          </span>
          <span className={c(s.edit_text)}>删除</span>
        </div>
      ),
    },
  ];

  const handleToTaskDetail = (task: TypeTask) => {
    navigate("/taskDetail/" + task.id);
  };

  const handleSearch = () => {
    queryClient.invalidateQueries({ queryKey: ["all-tasks"] });
  };

  const handleCreateTask = () => {
    modal?.show("create_task");
  };

  return (
    <div className={c(s.task_management, "mt-20")}>
      <div className="text-[14px] font-600">任务列表</div>
      <div className="fbh mt-10 gap-20">
        <Input className="w-300" placeholder="搜索任务名称" value={query} onChange={(e) => setQuery(e.target.value)} />
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
        <Button type="primary" onClick={handleCreateTask}>
          发布任务
        </Button>
      </div>
      <Table
        className="mt-10"
        columns={columns}
        loading={isLoading}
        dataSource={addKeysToData(tasks!)}
        pagination={{ total, onChange: setPage, pageSize: 10, size: "small" }}
      />
    </div>
  );
};

export default TaskManagement;
