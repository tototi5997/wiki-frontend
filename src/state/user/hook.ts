import { getAllUserAPI, QueryAllUserParams, updateUserInfoAPI } from "@/api/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

// 区分 userMyInfo，需要传入用户id
export const useUserInfo = () => {
  const queryClient = useQueryClient();

  const updateUser = useMutation({
    mutationFn: updateUserInfoAPI,
    onSuccess: () => {
      message.success("用户信息修改成功");
      queryClient.invalidateQueries({ queryKey: ["user-info"] });
    },
  });

  return { updateUser };
};

export const useAllUsers = (params: QueryAllUserParams) => {
  const data = useQuery({
    queryKey: ["all-users"],
    queryFn: () => getAllUserAPI(params),
  });
  return { ...data };
};
