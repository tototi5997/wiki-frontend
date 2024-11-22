import service from "@/utils/axios";

export type TaskStatus = 0 | 1 | 2;

export type TypeQueryAllTasks = {
  page: number;
  pageSize: number;
  q?: string;
  status?: TaskStatus; // 0:代接取 1:进行中 2:已完成
};

export type TypeQueryMyTask = {
  page: number;
  pageSize: number;
};

export type TypeTask = {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  create_at: string;
};

export const TaskStatusMap: Record<TaskStatus, string> = {
  0: "待接取",
  1: "进行中",
  2: "已完成",
};

export type CreateTaskParams = {
  title: string;
  description?: string;
  entryId: number;
};

export type TypeTaskDetail = TypeTask & {
  create_at: string;
  update_at: string;
  entry: {
    id: number;
    title: string;
  };
  creator: {
    userName: string;
  };
  participants: {
    user: {
      username: string;
      id: number;
    };
  }[];
};

// 获取所有任务
export const getTasksAPI = (data: TypeQueryAllTasks): Promise<{ data: TypeTask[]; total: number; page: number }> => {
  return service({
    url: "/tasks",
    method: "post",
    data,
  });
};

// 创建任务
export const createTaskAPI = (data: CreateTaskParams) => {
  return service({
    url: "/tasks/create",
    method: "post",
    data,
  });
};

// 获取任务详情
export const getTaskDetailAPI = (taskId: number): Promise<TypeTaskDetail> => {
  return service({
    url: "/tasks/" + taskId,
    method: "get",
  });
};

// 接取任务
export const takeTaskAPI = (taskId: number) => {
  return service({
    url: "/tasks/accept/" + taskId,
    method: "post",
  });
};

// 获取我的任务
export const getMyTasksAPI = (data: TypeQueryMyTask): Promise<{ data: TypeTask[]; total: number; page: number }> => {
  return service({
    url: "/tasks/me",
    method: "post",
    data,
  });
};

// 删除任务
export const deleteTaskAPI = (taskId: number) => {
  return service({
    url: "/tasks/delete/" + taskId,
    method: "delete",
  });
};
