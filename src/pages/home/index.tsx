import { Header } from "@/layout";
import { Outlet } from "react-router-dom";
import c from "classnames";
import s from "./index.module.less";

const Home = () => {
  return (
    <div className={c(s.home, "relative fbh fbjc fbac pr")}>
      <Header />

      <div className={c(s.content, "pr")}>
        <div className={c(s.content_bg, "pa")} />
        <div className={c(s.npc_1, "pa")} />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
