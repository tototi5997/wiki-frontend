import { useState } from "react";
import { Button, Image, InputNumber, message } from "antd";
import { useParams } from "react-router-dom";
import { useEntryDetail } from "@/state/entry/hook";
import { useServerImg } from "@/hooks/useServerImg";
import { usePassSubmission, useSubmissionDetail } from "@/state/submission/hook";
import { EntryConfig } from "../entry-detail";
import c from "classnames";
import s from "./index.module.less";

const SubmissionVerify = () => {
  const { id, entryId } = useParams();

  const { data: entryDetail } = useEntryDetail(Number(entryId));

  const { data: submissionDetail } = useSubmissionDetail(Number(id));

  const { cover_image } = entryDetail ?? {};

  const { task, content, user } = submissionDetail ?? {};

  const coverImage = useServerImg(cover_image);

  const parseConent = content ? JSON.parse(content) : {};

  const { passSubmission } = usePassSubmission(() => {
    message.success("审核成功，词条已经更新");
    history.back();
  });

  const [points, setPoints] = useState(0);

  const onBack = () => history.back();

  const handleCancel = () => {
    history.back();
  };

  const handlePass = () => {
    passSubmission.mutate({ id: Number(id), points });
  };

  const parseConfig = (config: EntryConfig) => {
    return (
      <div className={c(s.center_text, "fbv gap-4")}>
        <div>词条描述：{config?.desc}</div>
        <p>稀有度：{config?.integra}</p>
        <p>获取途径：{config?.wayToGet}</p>
        <p>路线: {config?.route}</p>
        <p>市场估值: {config?.price}</p>
      </div>
    );
  };

  return (
    <div className={c(s.submission_verify, "w-full h-full fbh fbjc")}>
      <div className={c(s.content)}>
        <Button style={{ padding: 0 }} color="primary" variant="link" size="small" onClick={onBack}>
          返回
        </Button>

        <div className={c("mt-40 fbv gap-20")}>
          <div>任务描述：{task?.description ?? "-"}</div>
          <div>词条名称：{entryDetail?.title ?? "-"}</div>
          <div>提交用户：{user?.username ?? "-"}</div>
          <div className="fbh">
            <div>图片信息：</div>
            <Image src={coverImage} />
          </div>
        </div>

        <div className={c(s.split_line)} />
        <div className="mt-40 mb-20">审核信息</div>

        {parseConfig(parseConent)}

        <div className="fbh gap-12 fbac mt-20">
          <div>奖励积分：</div>
          <InputNumber style={{ width: 200 }} min={0} defaultValue={0} value={points} onChange={(v) => setPoints(v ?? 0)} />
        </div>

        <div className="text-[12px] mt-20">Tips: 通过审核后，该信息将作为词条的信息展示</div>

        <div className="mt-120 fbh fbje gap-12">
          <Button type="primary" onClick={handlePass}>
            通过
          </Button>
          <Button onClick={handleCancel}>取消</Button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionVerify;
