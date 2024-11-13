import { Outlet, useLocation, useNavigate } from "react-router-dom";
import c from "classnames";
import s from "./index.module.less";

const ManagementPage = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const management_menus = [
    {
      label: "用户管理",
      key: "/home/admin/user-management",
    },
    {
      label: "词条管理",
      key: "/home/admin/entry-management",
    },
    {
      label: "任务管理",
      key: "/home/admin/task-management",
    },
  ];

  return (
    <div className={c(s.management_page)}>
      <div className={c("fbh gap-10", s.admin_menu)}>
        {management_menus.map((item) => (
          <div
            key={item.key}
            className={c(s.admin_menuitem, "hand usn", { [s.active]: pathname === item.key })}
            onClick={() => navigate(item.key)}
          >
            {item.label}
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default ManagementPage;
