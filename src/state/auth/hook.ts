import { getUserInfo, login, logout, register } from "@/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const useAuthority = () => {
  const isAuthorize = !!Cookies.get("token");

  const navigate = useNavigate();
  // 登录
  const userLogin = useMutation({
    mutationFn: login,
    onSuccess: () => navigate("/home"),
  });
  // 退出登录
  const userLogout = useMutation({
    mutationFn: logout,
    onSuccess: () => navigate("/login"),
  });
  // 注册
  const userRegister = useMutation({
    mutationFn: register,
    onSuccess: () => navigate("/login"),
  });

  return { isAuthorize, userLogin, userLogout, userRegister };
};

// 获取自己的信息
export const useMyInfo = () => {
  const data = useQuery({
    queryKey: ["user-info"],
    queryFn: () => getUserInfo(),
  });

  return data;
};
