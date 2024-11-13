import { Button, Input, Table, TableProps } from "antd";
import { useAllEntries } from "@/state/entry/hook";
import { useState } from "react";
import { addKeysToData } from "@/utils/addKeysToData";
import s from "./index.module.less";
import c from "classnames";
import dayjs from "dayjs";

const EntryManagement = () => {
  const [page, setPage] = useState(1);

  const { data: entriesData, isLoading } = useAllEntries({ page, pageSize: 10 });

  const { entries, total } = entriesData ?? {};

  const columns: TableProps<any>["columns"] = [
    {
      title: "名称",
      dataIndex: "title",
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      render: (v) => dayjs(v).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "更新时间",
      dataIndex: "update_at",
      render: (v) => dayjs(v).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "操作",
      render: () => (
        <div className={c("fbh fbac gap-8")}>
          <span className={c(s.edit_text)}>查看</span>
          <span className={c(s.edit_text)}>编辑</span>
          <span className={c(s.edit_text)}>删除</span>
        </div>
      ),
    },
  ];

  return (
    <div className={c(s.entry_management, "mt-20")}>
      <div className="text-[14px] font-600">词条列表</div>
      <div className="fbh mt-10 gap-20">
        <Input.Search className="w-300" placeholder="搜索词条名称" />
        <Button type="primary">新增词条</Button>
      </div>
      <Table
        className="mt-10"
        columns={columns}
        loading={isLoading}
        dataSource={addKeysToData(entries!)}
        pagination={{ total, onChange: setPage, pageSize: 10, size: "small" }}
      />
    </div>
  );
};

export default EntryManagement;
