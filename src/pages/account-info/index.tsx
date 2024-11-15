import { Children, useState } from "react";
import { Button, Table, TableProps } from "antd";
import { useMyInfo } from "@/state/auth/hook";
import { useMyPoints } from "@/state/points/hook";
import useModal from "@/hooks/useModal";
import dayjs from "dayjs";
import c from "classnames";
import s from "./index.module.less";
import { useMyTasks } from "@/state/task/hook";
import { TaskStatus, TaskStatusMap, TypeTask } from "@/api/task";
import { addKeysToData } from "@/utils/addKeysToData";
import { useNavigate } from "react-router-dom";

const AccountInfoPage = () => {
  const { data: userInfo } = useMyInfo();

  const { total_points, available_points } = useMyPoints();

  const { username, is_admin, email, created_at } = userInfo ?? {};

  const navigate = useNavigate();

  const modal = useModal();

  const [page, setPage] = useState(1);

  const { data: myTasksData } = useMyTasks({ page, pageSize: 10 });

  const { data: myTasks } = myTasksData ?? {};

  console.log(myTasks);

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

  const columns: TableProps<any>["columns"] = [
    {
      title: "名称",
      dataIndex: "title",
    },
    {
      title: "描述信息",
      dataIndex: "description",
      render: (v) => v ?? "-",
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (v: TaskStatus) => TaskStatusMap?.[v],
    },
    {
      title: "操作",
      render: (_, record) => {
        return (
          <div>
            <span className="blue-1 hand usn" onClick={() => handleToTaskDetail(record)}>
              查看
            </span>
          </div>
        );
      },
    },
  ];

  const handleToTaskDetail = (task: TypeTask) => {
    navigate("/taskDetail/" + task.id);
  };

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

      <div className="mt-20 white-1 mb-20">我的任务</div>
      <Table columns={columns} dataSource={addKeysToData(myTasks!)} />
    </div>
  );
};

export default AccountInfoPage;
