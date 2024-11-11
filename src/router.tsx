import { HashRouter, BrowserRouter, RouteObject, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import NotFoundPage from "./pages/404";
import SearchPage from "./pages/search-page";

export type RouterType = "hash" | "browser";

// 当前路由模式
const ROUTER_TYPE: RouterType = "browser";

// 路由类型
const routerMap = {
  hash: HashRouter,
  browser: BrowserRouter,
};

export const RouterComponent = routerMap[ROUTER_TYPE];

// 路由配置
export const routerConfig: RouteObject[] = [
  { path: "/", element: <Navigate to="/login" replace /> },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "/home",
        element: <Navigate to="/home/index" replace />,
      },
      {
        path: "/home/index",
        element: <SearchPage />,
      },
      {
        path: "/home/messionHall",
        element: <div>任务大厅</div>,
      },
      {
        path: "/home/my",
        element: <div>我的</div>,
      },
      {
        path: "/home/admin",
        element: <div>管理</div>,
      },
    ],
  },
  // 404 放在最下面
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
