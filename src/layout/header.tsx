import { Children } from "react";
import { useAuthority, useMyInfo } from "@/state/auth/hook";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import c from "classnames";
import s from "./index.module.less";

const Header = () => {
  const { data: userInfo } = useMyInfo();

  const { userLogout } = useAuthority();

  const { is_admin, username } = userInfo ?? {};

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const menuData = [
    {
      label: "首页",
      key: "/home/index",
    },
    {
      label: "任务大厅",
      key: "/home/messionHall",
    },
    {
      label: "积分榜",
      key: "/home/points",
    },
    {
      label: "我的",
      key: "/home/my",
    },
    {
      label: "管理",
      key: "/home/admin",
    },
  ];

  const handleClickMenuItem = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    userLogout.mutate();
    Cookies.remove("token");
  };

  return (
    <div className={c(s.header, "fbv")}>
      <div className={c(s.menu_content, "fbh fbac fbjc")}>
        {menuData.map((m) => {
          if (m.key === "/home/admin" && !is_admin) return null;
          return Children.toArray(
            <div className={c(s.header_btn, { [s.menu_active]: m.key === pathname })} onClick={() => handleClickMenuItem(m.key)}>
              {m.label}
            </div>
          );
        })}
      </div>
      <div className="mt-10 text-[12px] ml-auto gray-1">
        {username && `欢迎您, ${username}`}
        <span className="ml-10 hand blue-1" onClick={handleLogout}>
          退出
        </span>
      </div>
    </div>
  );
};

export default Header;
