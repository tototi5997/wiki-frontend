import service from "@/utils/axios";

export type TypeSubmitTaskParams = {
  taskId: number;
  content: string;
};

export type TypeQueryAllSubmissions = {
  page?: number;
  pageSize?: number;
};

export type SubmissionStaus = 0 | 1 | 2;

export const SubmissionStausMap = {
  0: "待审核",
  1: "通过",
  2: "不通过",
};

export type TypePassSubmissionParams = {
  id: number;
  points: number;
};

export type TypeSubmission = {
  id: number;
  status: SubmissionStaus;
  created_at: string;
  content: string;
  task: {
    id: number;
    title: string;
    description: string;
    entry: {
      id: number;
      title: string;
    };
  };
  user: {
    id: number;
    username: string;
  };
};

// 提交任务
export const submitTaskAPI = (data: TypeSubmitTaskParams) => {
  return service({
    url: "/submissions/create",
    method: "post",
    data,
  });
};

// 获取所有提交
export const getSubmissionsAPI = (params: TypeQueryAllSubmissions): Promise<{ data: TypeSubmission[]; total: number; page: number }> => {
  return service({
    url: "/submissions/all",
    method: "get",
    params,
  });
};

// 获取提交详情
export const getSubmissionDetailAPI = (id: number): Promise<TypeSubmission> => {
  return service({
    url: `/submissions/${id}`,
    method: "get",
  });
};

// 通过审核
export const passSubmissionAPI = (params: TypePassSubmissionParams) => {
  return service({
    url: "/submissions/confirm/" + params.id,
    method: "put",
    data: {
      points: params.points,
    },
  });
};
