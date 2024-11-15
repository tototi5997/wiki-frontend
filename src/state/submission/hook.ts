import { getSubmissionDetailAPI, getSubmissionsAPI, passSubmissionAPI, submitTaskAPI, TypeQueryAllSubmissions } from "@/api/submission";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSubmitTask = (successCallback?: () => void) => {
  const submitTask = useMutation({
    mutationFn: submitTaskAPI,
    onSuccess: () => {
      successCallback?.();
    },
  });

  return { submitTask };
};

// 获取所有提交
export const useAllSubmissions = (params: TypeQueryAllSubmissions) => {
  const data = useQuery({
    queryKey: ["all-submissions"],
    queryFn: () => getSubmissionsAPI(params),
  });

  const { data: submissionData, total, page } = data.data ?? {};

  return {
    ...data,
    total,
    page,
    data: submissionData?.map((s) => ({
      id: s.id,
      task: s.task.title,
      taskId: s.task.id,
      user: s.user.username,
      userId: s.user.id,
      time: s.created_at,
      status: s.status,
      entryId: s.task.entry.id,
    })),
  };
};

// 获取提交详情
export const useSubmissionDetail = (id: number) => {
  const data = useQuery({
    queryKey: ["submission-detail"],
    queryFn: () => getSubmissionDetailAPI(id),
  });
  return data;
};

export const usePassSubmission = (successCallback?: () => void) => {
  const passSubmission = useMutation({
    mutationFn: passSubmissionAPI,
    onSuccess: () => {
      successCallback?.();
    },
  });

  return { passSubmission };
};
