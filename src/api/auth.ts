import service from "@/utils/axios";

export type RegisterType = {
  username: string;
  email: string;
  password: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type UserInfoType = {
  username: string;
  email: string;
  id: number;
  created_at: string;
  is_admin: boolean;
};

// 注册接口
export const register = (data: RegisterType) => {
  return service({
    url: "/auth/register",
    method: "post",
    data,
  });
};
// 登入接口
export const login = (data: LoginType) => {
  return service({
    url: "/auth/login",
    method: "post",
    data,
  });
};
// 登出接口
export const logout = () => {
  return service({
    url: "/auth/logout",
    method: "get",
  });
};
// 获取当前用户信息
export const getUserInfo: () => Promise<UserInfoType> = () => {
  return service({
    url: "/auth/me",
    method: "get",
  });
};
