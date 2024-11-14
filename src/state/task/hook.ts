import { getTasksAPI, TypeQueryAllTasks } from "@/api/task";
import { useQuery } from "@tanstack/react-query";

export const useAllTasks = (params: TypeQueryAllTasks) => {
  const data = useQuery({
    queryKey: ["all-tasks"],
    queryFn: () => getTasksAPI(params),
  });

  return data;
};
