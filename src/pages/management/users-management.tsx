import c from "classnames";
import s from "./index.module.less";
import { Table, TableProps } from "antd";
import { useState } from "react";
import { useAllUsers } from "@/state/user/hook";
import dayjs from "dayjs";
import { addKeysToData } from "@/utils/addKeysToData";
import { UserInfoType } from "@/api/auth";
import useModal from "@/hooks/useModal";

const UserManagement = () => {
  const [userListPage, setUserListPage] = useState(1);

  const { data: allUsersData, isLoading: usersTableLoading } = useAllUsers({ page: userListPage, page_size: 10 });

  const { data: userList, total: usersTotal } = allUsersData ?? {};

  const modal = useModal();

  const userTableColumns: TableProps<UserInfoType>["columns"] = [
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "角色",
      dataIndex: "is_admin",
      render: (v) => (v ? "管理员" : "普通用户"),
    },
    {
      title: "邮箱",
      dataIndex: "email",
    },
    {
      title: "上次登录时间",
      dataIndex: "last_login",
      render: (v) => dayjs(v).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "操作",
      render: (_, record) => {
        return (
          <div className={c("fbh fbac gap-8")}>
            <span className={c(s.edit_text)}>编辑</span>
            <span className={c(s.edit_text)} onClick={() => handleEditUserPoints(record)}>
              积分
            </span>
          </div>
        );
      },
    },
  ];

  const handleEditUserPoints = (userInfo: UserInfoType) => {
    modal?.show("edit_user_points", userInfo);
  };

  return (
    <div className={c(s.user_management, "mt-20")}>
      <div className="text-[14px] font-600">用户列表</div>
      <Table
        className="mt-10"
        columns={userTableColumns}
        loading={usersTableLoading}
        dataSource={addKeysToData(userList!) ?? []}
        pagination={{ total: usersTotal, onChange: setUserListPage, pageSize: 10, size: "small" }}
      />
    </div>
  );
};

export default UserManagement;
