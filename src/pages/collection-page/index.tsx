import { Image } from "antd";
import s from "./index.module.less";
import c from "classnames";
import hezhao from "@/assets/hezhao.jpg";

const CollectionPage = () => {
  return (
    <div className={c(s.collection_page, "px-170 pt-50 mobile:px-20 mobile:pt-10")}>
      <div className={c(s.content)}>
        <Image src={hezhao} />
      </div>
    </div>
  );
};

export default CollectionPage;
