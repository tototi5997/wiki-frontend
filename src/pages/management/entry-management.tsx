import { Button, Input, Table, TableProps } from "antd";
import { useAllEntries } from "@/state/entry/hook";
import { useState } from "react";
import { addKeysToData } from "@/utils/addKeysToData";
import s from "./index.module.less";
import c from "classnames";
import dayjs from "dayjs";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { EntryDetail } from "@/api/entry";
import useModal from "@/hooks/useModal";

const EntryManagement = () => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);

  const [query, setQuery] = useState("");

  const { data: entriesData, isLoading } = useAllEntries({ page, pageSize: 10, q: query });

  const { entries, total } = entriesData ?? {};

  const navigate = useNavigate();

  const modal = useModal();

  const columns: TableProps<EntryDetail>["columns"] = [
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
      render: (_, record) => (
        <div className={c("fbh fbac gap-8")}>
          <span className={c(s.edit_text)} onClick={() => handleToEntryDetail(record)}>
            查看
          </span>
          <span className={c(s.edit_text)} onClick={() => handleEditEntry(record)}>
            编辑
          </span>
          <span className={c(s.edit_text)} onClick={() => handleShowConfirmModal(record)}>
            删除
          </span>
        </div>
      ),
    },
  ];

  const handleShowConfirmModal = (record: EntryDetail) => {
    modal?.show("delete_entry_confirm", record);
  };

  const handleToEntryDetail = (entry: EntryDetail) => {
    navigate("/entryDetail?id=" + entry.id);
  };

  const handleEditEntry = (entry: EntryDetail) => {
    navigate("/entryEdit/admin/" + entry?.id);
  };

  const handleSearch = () => {
    queryClient.invalidateQueries({ queryKey: ["all-entries"] });
  };

  const handleAddEntry = () => {
    navigate("/entryAdd");
  };

  return (
    <div className={c(s.entry_management, "mt-20")}>
      <div className="text-[14px] font-600">词条列表</div>
      <div className="fbh mt-10 gap-20">
        <Input.Search
          className="w-300"
          placeholder="搜索词条名称"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSearch={handleSearch}
        />
        <Button type="primary" onClick={handleAddEntry}>
          新增词条
        </Button>
      </div>
      <Table
        className="mt-10"
        columns={columns}
        loading={isLoading}
        scroll={{ x: "max-content" }}
        dataSource={addKeysToData(entries!)}
        pagination={{ total, onChange: setPage, pageSize: 10, size: "small", showSizeChanger: false }}
      />
    </div>
  );
};

export default EntryManagement;
