import c from "classnames";
import s from "./index.module.less";

const Home = () => {
  return (
    <div className={c(s.home, "relative fbv fbac fbjc")}>
      <p className="text-[30px] font-[600]">ZLI TEMPLATE</p>
      <div className="mt-20">Create by React + Vite + Tailwind</div>
    </div>
  );
};

export default Home;
