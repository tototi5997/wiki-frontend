import { login, logout } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useAuthority = () => {
  const isAuthorize = !!Cookies.get("token");

  const userLogin = useMutation({
    mutationFn: login,
  });

  const userLogout = useMutation({
    mutationFn: logout,
  });
  return { isAuthorize, userLogin, userLogout };
};
