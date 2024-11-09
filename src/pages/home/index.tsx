import c from "classnames";
import s from "./index.module.less";
import { Header } from "@/layout";

const Home = () => {
  return (
    <div className={c(s.home, "relative fbh fbjc fbac")}>
      <Header />

      <div className={c(s.content)}></div>
    </div>
  );
};

export default Home;
