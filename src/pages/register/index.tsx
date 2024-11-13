import { RegisterType } from "@/api/auth";
import { Input, Button, Form } from "antd";
import Icon from "@/components/icon";
import type { FormProps } from "antd";
import { useAuthority } from "@/state/auth/hook";
import { useNavigate } from "react-router-dom";
import c from "classnames";
import s from "./index.module.less";

const Register = () => {
  const { userRegister } = useAuthority();
  const navigate = useNavigate();
  // 注册
  const onFinish: FormProps<RegisterType>["onFinish"] = (values) => {
    userRegister.mutate(values);
  };
  // 返回登录页
  const onReturn = () => {
    navigate("/login");
  };

  return (
    <div className={c(s["register-wrapper"], "fbh fbac fbjc")}>
      <div className={s["register-box"]}>
        <div className={c(s["register-title"], "fbh fbac fbjc")}>WIKI</div>
        <Form name="register" onFinish={onFinish} autoComplete="off">
          <Form.Item<RegisterType> label="" name="username" rules={[{ required: true, message: "请输入昵称!" }]}>
            <Input className={s["register-input"]} prefix={<Icon name="user" />} placeholder="昵称" />
          </Form.Item>
          <Form.Item<RegisterType>
            label=""
            name="email"
            rules={[
              {
                type: "email",
                message: "请输入正确的电子邮件",
              },
              {
                required: true,
                message: "请输入邮箱!",
              },
            ]}
          >
            <Input className={s["register-input"]} prefix={<Icon name="email" />} placeholder="邮箱" />
          </Form.Item>
          <Form.Item<RegisterType>
            label=""
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
              {
                min: 6,
                message: "请输入至少6位字符",
              },
            ]}
          >
            <Input.Password className={s["register-input"]} prefix={<Icon name="password" />} placeholder="密码" />
          </Form.Item>

          <div className={"fbh fbjsb"}>
            <Button color="default" variant="solid" className={s["register-btn"]} htmlType="submit" loading={userRegister.isPending}>
              注 册
            </Button>
            <Button className={s["register-btn"]} loading={userRegister.isPending} onClick={onReturn}>
              返 回
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
