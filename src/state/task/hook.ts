import {
  createTaskAPI,
  deleteTaskAPI,
  getMyTasksAPI,
  getTaskDetailAPI,
  getTasksAPI,
  takeTaskAPI,
  TypeQueryAllTasks,
  TypeQueryMyTask,
} from "@/api/task";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

// 获取所有的任务
export const useAllTasks = (params: TypeQueryAllTasks) => {
  const data = useQuery({
    queryKey: ["all-tasks"],
    queryFn: () => getTasksAPI(params),
  });

  return data;
};

// 创建任务
export const useCreateTask = (successCallback?: () => void) => {
  const createNewTask = useMutation({
    mutationFn: createTaskAPI,
    onSuccess: () => {
      successCallback?.();
    },
  });
  return { createNewTask };
};

// 任务详情
export const useTaskDetail = (taskId: number) => {
  const data = useQuery({
    queryKey: ["task-detail"],
    queryFn: () => getTaskDetailAPI(taskId),
  });
  return data;
};

export const useAcceptTask = () => {
  const queryClient = useQueryClient();

  const acceptTask = useMutation({
    mutationFn: takeTaskAPI,
    onSuccess: () => {
      message.success("任务接取成功");
      queryClient.invalidateQueries({ queryKey: ["task-detail"] });
    },
  });

  return { acceptTask };
};

export const useMyTasks = (params: TypeQueryMyTask) => {
  const data = useQuery({
    queryKey: ["my-tasks"],
    queryFn: () => getMyTasksAPI(params),
  });
  return data;
};

export const useDeleteTask = (successCallback?: () => void) => {
  const deleteTask = useMutation({
    mutationFn: deleteTaskAPI,
    onSuccess: () => {
      successCallback?.();
    },
  });

  return { deleteTask };
};
