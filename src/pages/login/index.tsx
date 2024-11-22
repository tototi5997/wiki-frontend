import { LoginType } from "@/api/auth";
import { Input, Button, Form } from "antd";
import Icon from "@/components/icon";
import type { FormProps } from "antd";
import { useAuthority } from "@/state/auth/hook";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile";
import c from "classnames";
import s from "./index.module.less";

const Login = () => {
  const { userLogin } = useAuthority();

  const navigate = useNavigate();

  const { isMobile } = useIsMobile();
  // 登录
  const onFinish: FormProps<LoginType>["onFinish"] = (values) => {
    userLogin.mutate(values);
  };
  // 注册
  const onRegister = () => {
    navigate("/register");
  };

  return (
    <div className={c(s["login-wrapper"], "fbh fbac fbjc pr")}>
      <div className={c(s["login-box"], "pr w-500 h-320 p-20 rounded-[8px] mobile:w-340")}>
        {!isMobile && (
          <>
            <div className={c(s.person, "pa")} />
            <div className={c(s.person_2, "pa")} />
          </>
        )}

        <div className={c(s["login-title"], "fbh fbac fbjc")}>WIKI</div>
        <Form name="login" onFinish={onFinish} autoComplete="off">
          <Form.Item<LoginType>
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
            <Input className={s["login-input"]} prefix={<Icon name="email" />} placeholder="邮箱" />
          </Form.Item>
          <Form.Item<LoginType>
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
            <Input.Password className={s["login-input"]} prefix={<Icon name="password" />} placeholder="密码" />
          </Form.Item>
          <div className={c(s["login-link"], "fbh fbac fbje")}>
            <Button color="default" variant="link" onClick={onRegister}>
              注 册
            </Button>
          </div>
          <Button color="default" variant="solid" className={s["login-btn"]} htmlType="submit" loading={userLogin.isPending}>
            登 录
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
