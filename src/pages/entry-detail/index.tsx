import { useEffect } from "react";
import { useEntry } from "@/state/entry/hook";
import { Button } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import c from "classnames";
import s from "./index.module.less";

const EntryDetail = () => {
  const { onEntryDetail, entryDetail } = useEntry();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = params.get("id");

  useEffect(() => {
    if (id) {
      onEntryDetail.mutate(id);
    }
  }, [id]);

  // 返回
  const onBack = () => {
    navigate("/home");
  };

  return (
    <div className={c(s["entry-detail-wrapper"], "relative fbh fbjc fbac")}>
      <div className={s.content}>
        <Button color="primary" variant="link" size="small" onClick={onBack}>
          返回
        </Button>
        <div className={s["detail-title"]}>{entryDetail.title}</div>

        <div className={s["detail-img"]}>
          <img src={entryDetail.cover_image} alt="" />
        </div>

        <div className={c(s.center_text, "fbv gap-4")}>
          <p>一个神秘的道具，可以用作生活技能材料，也可以用作登记</p>
          <p>稀有度：一般</p>
          <p>获取途径：贝罗斯 - 野外丛林 - 大树</p>
          <p>市场估值: 1千万游戏币</p>
        </div>

        <div className={c(s["detail-creator"], "fbv")}>
          <div className={c(s["base-info"], "fbh")}>
            <span>创建人：</span>
            <span>{entryDetail.creator?.username}</span>
          </div>
          <div className={c(s["base-info"], "fbh")}>
            <span>创建时间：</span>
            <span>{entryDetail.created_at ? dayjs(entryDetail.created_at).format("YYYY-MM-DD hh:mm:ss") : "-"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EntryDetail;
