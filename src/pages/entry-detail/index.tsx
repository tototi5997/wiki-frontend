import { useEntryDetail } from "@/state/entry/hook";
import { Button, Image } from "antd";
import { useSearchParams } from "react-router-dom";
import { useServerImg } from "@/hooks/useServerImg";
import dayjs from "dayjs";
import c from "classnames";
import s from "./index.module.less";
import { EntryDetail } from "@/api/entry";

export type EntryConfig = {
  desc?: string;
  integra?: string;
  wayToGet?: string;
  route?: string;
  price?: number;
};

const EntryDetailPage = () => {
  // const navigate = useNavigate();

  const [params] = useSearchParams();

  const id = params.get("id");

  const { data: entryConfig } = useEntryDetail(Number(id));

  const cover_image = useServerImg(entryConfig?.cover_image);

  const parseContentData = (detail?: EntryDetail) => {
    try {
      return JSON.parse(detail?.content || "{}");
    } catch (error) {
      throw new Error("解析词条内容出错");
    }
  };

  // 返回
  const onBack = () => history.back();

  // const config = {
  //   desc: "一些描述信息，用来描述词条",
  //   integra: "普通",
  //   wayToGet: "某个游戏角色掉落",
  //   route: "A -> B -> C -> D",
  //   price: 10000,
  // };

  const config = parseContentData(entryConfig);

  const parseConfig = (config: EntryConfig) => {
    return (
      <div className={c(s.center_text, "fbv gap-4")}>
        <div className="pt-10 pb-10">{config?.desc}</div>
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
        <Button style={{ padding: 0 }} color="primary" variant="link" size="small" onClick={onBack}>
          返回
        </Button>
        <div className={s["detail-title"]}>{entryConfig?.title}</div>

        <Image src={cover_image} />

        {parseConfig(config)}

        <div className={c(s["detail-creator"], "fbv")}>
          <div className={c(s["base-info"], "fbh")}>
            <span>创建人：</span>
            <span>{entryConfig?.creator?.username}</span>
          </div>
          <div className={c(s["base-info"], "fbh")}>
            <span>更新时间：</span>
            <span>{entryConfig?.update_at ? dayjs(entryConfig.update_at).format("YYYY-MM-DD hh:mm:ss") : "-"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EntryDetailPage;
