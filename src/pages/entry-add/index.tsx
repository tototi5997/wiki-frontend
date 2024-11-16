import { Button, Form, Input, InputNumber, message, Upload, UploadFile, UploadProps } from "antd";
import Icon from "@/components/icon";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import c from "classnames";
import s from "./index.module.less";
import { useCreateEntry } from "@/state/entry/hook";

const EntryAddPage = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [fromRef] = useForm();

  const { createNewEntry } = useCreateEntry(() => {
    history.back();
  });

  const onBack = () => history.back();

  const onUploadImgChange: UploadProps["onChange"] = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleCreateEntry = async () => {
    const values = await fromRef.validateFields();
    const cover_image = values?.cover_image?.file?.response?.filePath;

    if (!cover_image) return message.error("未成功上穿图片信息");

    // entry content
    const content = {
      desc: values?.desc,
      integra: values?.integra,
      wayToGet: values?.wayToGet,
      route: values?.route,
      price: values?.price,
    };

    // 接口需要的参数
    const queryData = {
      title: values?.title,
      cover_image,
      content: JSON.stringify(content),
    };

    createNewEntry.mutate(queryData);
  };

  return (
    <div className={c(s.entry_add, "w-full h-full fbv fbac")}>
      <div className={c(s.content)}>
        <Button style={{ padding: 0 }} color="primary" variant="link" size="small" onClick={onBack}>
          返回
        </Button>

        <div className="mt-20">新增词条</div>

        <Form className="mt-10" form={fromRef}>
          <Form.Item name="title" label="词条名称" rules={[{ required: true, message: "词条名称不可为空" }]}>
            <Input style={{ width: 400 }} placeholder="词条名称不可为空" />
          </Form.Item>

          <Form.Item name="cover_image" label="图片信息" rules={[{ required: true, message: "图片信息不可为空" }]}>
            <Upload
              name="file"
              // action="http://10.1.5.66:3000/upload/image"
              action="http://121.37.180.58:3000/upload/image"
              listType="picture-card"
              maxCount={1}
              fileList={fileList}
              onChange={onUploadImgChange}
            >
              {fileList.length >= 1 ? null : (
                <button style={{ border: 0, background: "none" }} type="button" className="fbv fbac">
                  <Icon name="add" />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              )}
            </Upload>
          </Form.Item>

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

        <div className="fbh gap-20 mt-120">
          <Button className="w-120" type="primary" onClick={handleCreateEntry}>
            创建
          </Button>
          <Button className="w-120">取消</Button>
        </div>
      </div>
    </div>
  );
};

export default EntryAddPage;
