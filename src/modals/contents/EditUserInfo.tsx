import c from "classnames";
import s from "./index.module.less";
import { Button, Form, Input } from "antd";
import { useMyInfo } from "@/state/auth/hook";
import useModal from "@/hooks/useModal";
import { useForm } from "antd/es/form/Form";
import { useUserInfo } from "@/state/user/hook";

const EditUserInfoModal = () => {
  const { data: userInfo } = useMyInfo();

  const { username, id: userId } = userInfo ?? {};

  const { updateUser } = useUserInfo();

  const modal = useModal();

  const [fromRef] = useForm();

  const handleSubmitForm = () => {
    const values = fromRef.getFieldsValue();
    updateUser.mutate({ ...values, userId });
    modal?.hide();
  };

  return (
    <div className={c(s.edit_user_info)}>
      <div className="text-[14px] font-[500]">信息修改</div>
      <div className={c(s.content, "fbv")}>
        <Form labelCol={{ span: 4 }} form={fromRef} initialValues={{ username }}>
          <Form.Item label="新昵称" name="username">
            <Input placeholder="请输入新昵称" />
          </Form.Item>
          <Form.Item label="修改密码" name="password">
            <Input placeholder="留空视为不修改密码" />
          </Form.Item>
        </Form>
        <div className="fbh gap-12 ml-auto">
          <Button type="primary" style={{ width: 100 }} onClick={handleSubmitForm}>
            确认
          </Button>
          <Button style={{ width: 100 }} onClick={() => modal?.hide()}>
            取消
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditUserInfoModal;
