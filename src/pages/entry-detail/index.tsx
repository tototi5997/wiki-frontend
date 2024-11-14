import { useEntryDetail } from "@/state/entry/hook";
import { Button } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useServerImg } from "@/hooks/useServerImg";
import dayjs from "dayjs";
import NoImage from "@/assets/no-image.png";
import c from "classnames";
import s from "./index.module.less";

export type EntryConfig = {
  desc?: string;
  integra?: string;
  wayToGet?: string;
  route?: string;
  price?: number;
};

const EntryDetail = () => {
  const navigate = useNavigate();

  const [params] = useSearchParams();

  const id = params.get("id");

  const { data: entryDetail } = useEntryDetail(Number(id));

  const cover_image = useServerImg(entryDetail?.cover_image);

  // 返回
  const onBack = () => navigate("/home");

  // const config = {
  //   desc: "一些描述信息，用来描述词条",
  //   integra: "普通",
  //   wayToGet: "某个游戏角色掉落",
  //   route: "A -> B -> C -> D",
  //   price: 10000,
  // };

  const config = {};

  const parseConfig = (config: EntryConfig) => {
    return (
      <div className={c(s.center_text, "fbv gap-4")}>
        <div className="m-10">{config?.desc}</div>
        <p>稀有度：{config?.integra}</p>
        <p>获取途径：{config?.wayToGet}</p>
        <p>路线: {config?.route}</p>
        <p>市场估值: {config?.price}</p>
      </div>
    );
  };

  return (
    <div className={c(s["entry-detail-wrapper"], "relative fbh fbjc fbac")}>
      <div className={s.content}>
        <Button color="primary" variant="link" size="small" onClick={onBack}>
          返回
        </Button>
        <div className={s["detail-title"]}>{entryDetail?.title}</div>

        <div className={s["detail-img"]}>
          <img src={cover_image || NoImage} alt="" />
        </div>

        {parseConfig(config)}

        <div className={c(s["detail-creator"], "fbv")}>
          <div className={c(s["base-info"], "fbh")}>
            <span>创建人：</span>
            <span>{entryDetail?.creator?.username}</span>
          </div>
          <div className={c(s["base-info"], "fbh")}>
            <span>更新时间：</span>
            <span>{entryDetail?.update_at ? dayjs(entryDetail.update_at).format("YYYY-MM-DD hh:mm:ss") : "-"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EntryDetail;
