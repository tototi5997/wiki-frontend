import { useState, ChangeEvent } from "react";
import { register, login, LoginType } from "@/api/auth"
import { Input, Button, message, Form } from "antd";
import type { FormProps } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import c from "classnames";
import s from "./index.module.less";

const Login = () => {
  const [loading, setLoading] = useState(false)

  const onFinish: FormProps<LoginType>['onFinish'] = (values) => {
    setLoading(true)
    login(values).then((res) => {
      console.log(res,'login')
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  };


  return (
    <div className={c(s['login-wrapper'], 'fbh fbac fbjc')} >
      <div className={s['login-box']}>
        <div className={c(s['login-title'], 'fbh fbac fbjc')}>WIKI</div>
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<LoginType>
            label=""
            name="email"
            rules={[{ required: true, message: '请输入邮箱!' }]}
          >
            <Input
              className={s['login-input']}
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="邮箱"
            />
          </Form.Item>
          <Form.Item<LoginType>
            label=""
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password
              className={s['login-input']}
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="密码"
            />
          </Form.Item>
          <div className={c(s['login-link'], "fbh fbac fbje")}>
            <Button color="default" variant="link">
              注 册
            </Button>
          </div>
          <Button
            color="default"
            variant="solid"
            className={s['login-btn']}
            htmlType="submit"
            loading={loading}
          >
            登 录
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
