import { HashRouter, BrowserRouter, RouteObject, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import NotFoundPage from "./pages/404";
import SearchPage from "./pages/search-page";
import AccountInfoPage from "./pages/account-info";
import PointsPage from "./pages/points";
import EntryDetail from "./pages/entry-detail";
import ManagementPage from "./pages/management";
import UserManagement from "./pages/management/users-management";
import EntryManagement from "./pages/management/entry-management";

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
        element: <AccountInfoPage />,
      },
      {
        path: "/home/points",
        element: <PointsPage />,
      },
      {
        path: "/home/admin",
        element: <ManagementPage />,
        children: [
          {
            path: "/home/admin",
            element: <Navigate to="/home/admin/user-management" replace />,
          },
          {
            path: "/home/admin/user-management",
            element: <UserManagement />,
          },
          {
            path: "/home/admin/entry-management",
            element: <EntryManagement />,
          },
          {
            path: "/home/admin/task-management",
            element: <div>任务管理</div>,
          },
        ],
      },
    ],
  },
  {
    path: "/entryDetail",
    element: <EntryDetail />,
  },
  // 404 放在最下面
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
