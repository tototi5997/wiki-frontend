import { Children } from "react";
import { Button } from "antd";
import { useMyInfo } from "@/state/auth/hook";
import { useMyPoints } from "@/state/points/hook";
import useModal from "@/hooks/useModal";
import dayjs from "dayjs";
import c from "classnames";
import s from "./index.module.less";

const AccountInfoPage = () => {
  const { data: userInfo } = useMyInfo();

  const { total_points, available_points } = useMyPoints();

  const { username, is_admin, email, created_at } = userInfo ?? {};

  const modal = useModal();

  const defaultInfoList: { label: string; value: string | number | undefined }[] = [
    {
      label: "用户名",
      value: username,
    },
    {
      label: "邮箱",
      value: email,
    },
    {
      label: "注册时间",
      value: dayjs(created_at).format("YYYY-MM-DD hh:mm"),
    },
    {
      label: "角色",
      value: is_admin ? "管理员" : "普通用户",
    },
    {
      label: "总积分",
      value: total_points,
    },
    {
      label: "可用积分",
      value: available_points,
    },
  ];

  const handleOpenEditModal = () => {
    modal?.show("edit_user_info");
  };

  return (
    <div className={s.account_info}>
      <div className={c("fbv gap-10", s.info_content)}>
        {defaultInfoList.map((item) => {
          return Children.toArray(
            <div>
              <span className={c(s.item_label)}>{item.label}: </span>
              {item.value ?? "-"}
            </div>
          );
        })}
      </div>

      <Button className="mt-20" onClick={handleOpenEditModal}>
        修改个人信息
      </Button>
    </div>
  );
};

export default AccountInfoPage;
