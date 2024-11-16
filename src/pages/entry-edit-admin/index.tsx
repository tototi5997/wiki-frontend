import c from "classnames";
import s from "./index.module.less";
import { Button, Form, Image, Input, InputNumber, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEditEntry, useEntryDetail } from "@/state/entry/hook";
import { useServerImg } from "@/hooks/useServerImg";
import { useEffect } from "react";
import { useForm } from "antd/es/form/Form";

const AdminEntryEditPage = () => {
  const { entryId } = useParams();

  const [fromRef] = useForm();

  const navigate = useNavigate();

  const { data: entryDetail } = useEntryDetail(Number(entryId));

  const coverImage = useServerImg(entryDetail?.cover_image);

  const { editEntry } = useEditEntry(() => {
    message.success("词条编辑成功");
    navigate("/home/admin/entry-management");
  });

  const onBack = () => history.back();

  const defaultContent = entryDetail?.content ? JSON.parse(entryDetail?.content) : {};

  useEffect(() => {
    defaultContent && fromRef.setFieldsValue(defaultContent);
  }, [defaultContent]);

  const handleCancel = () => {
    history.back();
  };

  const handleSubmit = async () => {
    const values = await fromRef.validateFields();
    const content = JSON.stringify(values);
    editEntry.mutate({ entryId: Number(entryId), content });
  };

  return (
    <div className={c(s.entry_edit, "w-full h-full fbh fbjc")}>
      <div className={c(s.content)}>
        <Button style={{ padding: 0 }} color="primary" variant="link" size="small" onClick={onBack}>
          返回
        </Button>

        <div className={c("mt-40 fbv gap-20")}>
          <div>词条名称：{entryDetail?.title ?? "-"}</div>
          <div className="fbh">
            <div>图片信息：</div>
            <Image src={coverImage} />
          </div>
        </div>

        <Form className="mt-20" initialValues={{ desc: defaultContent?.desc }} form={fromRef}>
          <Form.Item name="desc" label="描述信息">
            <Input.TextArea style={{ width: 400 }} placeholder="该词条的描述信息，用处,作用等等" />
          </Form.Item>

          <Form.Item name="integra" label="稀有程度">
            <Input style={{ width: 400 }} placeholder="低级稀有/高级稀有/副本稀有" />
          </Form.Item>

          <Form.Item name="wayToGet" label="获取途径">
            <Input style={{ width: 400 }} placeholder="具体到哪个任务/哪个怪物NPC掉落" />
          </Form.Item>

          <Form.Item name="route" label="获取路线">
            <Input style={{ width: 400 }} placeholder="统一从小贝为出发点" />
          </Form.Item>

          <Form.Item name="price" label="市场估值">
            <InputNumber style={{ width: 200 }} min={0} formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
          </Form.Item>
        </Form>

        <div className="mt-120 fbh fbje gap-12">
          <Button type="primary" onClick={handleSubmit}>
            提交
          </Button>
          <Button onClick={handleCancel}>取消</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminEntryEditPage;
