import { Header } from "@/layout";
import { Outlet } from "react-router-dom";
import c from "classnames";
import s from "./index.module.less";

const Home = () => {
  return (
    <div className={c(s.home, "relative fbh fbjc fbac")}>
      <Header />

      <div className={c(s.content)}>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
