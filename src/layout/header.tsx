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
    // {
    //   label: "任务大厅",
    //   key: "/home/messionHall",
    // },
    // {
    //   label: "积分榜",
    //   key: "/home/points",
    // },
    {
      label: "我的",
      key: "/home/my",
    },
    {
      label: "管理",
      key: "/home/admin",
    },
    {
      label: "大合照",
      key: "/home/collect",
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
    <div className={c(s.header, "fbv fbh fbac")}>
      <div className={c(s.menu_content, "fbh fbac fbjc w-900 h-40 mobile:w-full")}>
        {menuData.map((m) => {
          if (m.key === "/home/admin" && !is_admin) return null;
          return Children.toArray(
            <div
              className={c(s.header_btn, "w-120 mobile:w-80", { [s.menu_active]: pathname.includes(m.key) })}
              onClick={() => handleClickMenuItem(m.key)}
            >
              {m.label}
            </div>
          );
        })}
      </div>
      <div className="w-900 mobile:w-full fbh">
        <div className="mt-10 text-[12px] ml-auto gray-1 mobile:mr-10">
          {username && `欢迎您, ${username}`}
          <span className="ml-10 hand blue-1" onClick={handleLogout}>
            退出
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
