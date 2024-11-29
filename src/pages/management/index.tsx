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
    // {
    //   label: "任务管理",
    //   key: "/home/admin/task-management",
    // },
    // {
    //   label: "审核管理",
    //   key: "/home/admin/submission-management",
    // },
  ];

  return (
    <div className={c(s.management_page, "pt-0 pb-20 px-170 mobile:px-20 mobile:pt-0 mobile:pb-20")}>
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
