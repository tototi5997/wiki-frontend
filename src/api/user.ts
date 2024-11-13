import service from "@/utils/axios";

export type UpdateUserType = {
  username?: string;
  password?: string;
  userId: number;
};

// 更新用户信息
export const updateUserInfoAPI = (data: UpdateUserType) => {
  return service({
    url: `/users/${data.userId}`,
    method: "put",
    data,
  });
};
