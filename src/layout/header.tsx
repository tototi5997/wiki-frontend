import c from "classnames";
import s from "./index.module.less";

const Header = () => {
  const is_admin = true; // 用户信息

  return (
    <div className={c(s.header, "fbh fbac fbjc")}>
      <div className={c(s.header_btn)}>任务大厅</div>
      <div className={c(s.header_btn)}>首页</div>
      <div className={c(s.header_btn)}>我的</div>
      <div className={c(s.header_btn)}>管理</div>
    </div>
  );
};

export default Header;
