import service from "@/utils/axios";
import { UserInfoType } from "./auth";

export type UpdateUserType = {
  username?: string;
  password?: string;
  userId: number;
};

export type QueryAllUserParams = {
  page?: number;
  page_size?: number;
};

// 更新用户信息
export const updateUserInfoAPI = (data: UpdateUserType) => {
  return service({
    url: `/users/${data.userId}`,
    method: "put",
    data,
  });
};

// 获取所有用户
export const getAllUserAPI = (data: QueryAllUserParams): Promise<{ data: UserInfoType[]; total: number; page: number }> => {
  return service({
    url: "/users",
    method: "post",
    data,
  });
};
