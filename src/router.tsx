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
import TaskManagement from "./pages/management/task-management";
import TaskHall from "./pages/task-hall";
import EntryAddPage from "./pages/entry-add";
import TaskDetailPage from "./pages/task-detail";
import EntryEditPage from "./pages/entry-edit";
import AdminEntryEditPage from "./pages/entry-edit-admin";
import SubmissionManagement from "./pages/management/submission-management";
import SubmissionVerify from "./pages/submision-verify";
import CollectionPage from "./pages/collection-page";
import CollectionManagement from "./pages/management/collection-management";
import CollectionEdit from "./pages/collection-edit";

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
        element: <TaskHall />,
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
        path: "/home/collect",
        element: <CollectionPage />,
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
            element: <TaskManagement />,
          },
          {
            path: "/home/admin/submission-management",
            element: <SubmissionManagement />,
          },
          {
            path: "/home/admin/collection-management",
            element: <CollectionManagement />,
          },
        ],
      },
    ],
  },
  {
    path: "/entryDetail",
    element: <EntryDetail />,
  },
  {
    path: "/entryEdit/admin/:entryId",
    element: <AdminEntryEditPage />,
  },
  {
    path: "/entryEdit/:entryId/:taskId",
    element: <EntryEditPage />,
  },
  {
    path: "/entryAdd",
    element: <EntryAddPage />,
  },
  {
    path: "/taskDetail/:taskId",
    element: <TaskDetailPage />,
  },
  {
    path: "/submissionVerify/:id/:entryId",
    element: <SubmissionVerify />,
  },
  {
    path: "/collections/add",
    element: <CollectionEdit />,
  },
  {
    path: "/collections/edit/:id",
    element: <CollectionEdit />,
  },
  // 404 放在最下面
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
