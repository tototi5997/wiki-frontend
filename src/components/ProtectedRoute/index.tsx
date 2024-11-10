import React, { useEffect } from "react";
import Cookie from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";

interface IProtectRoute {
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<IProtectRoute> = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const noProtectList = ["/login", "/register"];
  const whiteList = ["/temp"];

  useEffect(() => {
    const inWhiteList = noProtectList.some((path) => pathname.includes(path)) || whiteList.includes(pathname) || pathname === "/";
    const isAuthenticated = !!Cookie.get("token");

    if (!isAuthenticated && !inWhiteList) {
      navigate("/login");
    }

    if (isAuthenticated && pathname === "/login") {
      navigate("/home");
    }
  }, [pathname]);

  return <>{children}</>;
};

export default ProtectedRoute;
