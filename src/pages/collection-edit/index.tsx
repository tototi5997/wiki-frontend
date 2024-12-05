import c from "classnames";
import s from "./index.module.less";
// import { useLocation } from "react-router-dom";
import { Button, Form, Input, message, Upload, UploadFile, UploadProps } from "antd";
import { useState } from "react";
import Icon from "@/components/icon";
import { useForm } from "antd/es/form/Form";
import { useCreateCollection } from "@/state/collection/hook";
import { useNavigate } from "react-router-dom";

const CollectionEdit = () => {
  // const params = useParams();

  const [formRef] = useForm();

  // const { pathname } = useLocation();

  const navigate = useNavigate();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { createCollection } = useCreateCollection(() => {
    message.success("合照创建成功");
    navigate("/home/admin/collection-management");
  });

  // const is_edit = pathname.includes("edit");

  const MAX_IMAGES = 3;

  const onUploadImgChange: UploadProps["onChange"] = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSaveCollection = async () => {
    const values = await formRef.validateFields();
    const params = {
      ...values,
      images: fileList.map((i) => i.response?.filePath),
    };
    createCollection.mutate(params);
  };

  const onBack = () => history.back();

  return (
    <div className={c(s.collection_edit, "w-full h-full fbh fbjs")}>
      <div className={c(s.content, "px-170 pt-50 mobile:px-20 mobile:pt-10 mobile:pb-20")}>
        <Button style={{ padding: 0 }} color="primary" variant="link" size="small" onClick={onBack}>
          返回
        </Button>

        <div className="mt-20">新增合照</div>

        <Form className="mt-10" form={formRef}>
          <Form.Item label="合照名称" name="title" rules={[{ required: true, message: "请输入合照名称" }]}>
            <Input style={{ width: 400 }} placeholder="请输入合照名称" />
          </Form.Item>

          <Form.Item label="描述信息" name="description">
            <Input style={{ width: 400 }} placeholder="请输入描述信息" />
          </Form.Item>

          <Form.Item label="图片列表" name="images">
            <Upload
              name="file"
              action="http://121.37.180.58:3000/upload/collection"
              // action="http://10.1.5.66:3000/upload/collection"
              listType="picture-card"
              fileList={fileList}
              onChange={onUploadImgChange}
            >
              {fileList.length >= MAX_IMAGES ? null : (
                <button style={{ border: 0, background: "none" }} type="button" className="fbv fbac">
                  <Icon name="add" />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              )}
            </Upload>
          </Form.Item>
        </Form>

        <div className="fbh gap-20 mt-120 mobile:mt-40">
          <Button className="w-120" type="primary" onClick={handleSaveCollection}>
            创建
          </Button>
          <Button className="w-120" onClick={onBack}>
            取消
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollectionEdit;
