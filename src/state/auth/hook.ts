import { getUserInfo, login, logout } from "@/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const useAuthority = () => {
  const isAuthorize = !!Cookies.get("token");

  const navigate = useNavigate();

  const userLogin = useMutation({
    mutationFn: login,
    onSuccess: () => navigate("/home"),
  });

  const userLogout = useMutation({
    mutationFn: logout,
    onSuccess: () => navigate("/login"),
  });

  return { isAuthorize, userLogin, userLogout };
};

// 获取自己的信息
export const useUserInfo = () => {
  const data = useQuery({
    queryKey: ["user-info"],
    queryFn: () => getUserInfo(),
  });

  return data;
};
