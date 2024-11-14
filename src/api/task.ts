import service from "@/utils/axios";

export type TaskStatus = 0 | 1 | 2;

export type TypeQueryAllTasks = {
  page: number;
  pageSize: number;
  q?: string;
  status?: TaskStatus; // 0:代接取 1:进行中 2:已完成
};

export type TypeTask = {
  id: number;
  title: string;
  decription?: string;
  status: TaskStatus;
};

export const TaskStatusMap: Record<TaskStatus, string> = {
  0: "待接取",
  1: "进行中",
  2: "已完成",
};

// 获取所有任务
export const getTasksAPI = (data: TypeQueryAllTasks): Promise<{ data: TypeTask[]; total: number; page: number }> => {
  return service({
    url: "/tasks",
    method: "post",
    data,
  });
};
