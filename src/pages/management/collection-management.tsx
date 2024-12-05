import { Button, Table, TableProps } from "antd";
import { useAllCollectios } from "@/state/collection/hook";
import { useState } from "react";
import { Collection } from "@/api/collection";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { addKeysToData } from "@/utils/addKeysToData";
import useModal from "@/hooks/useModal";
import s from "./index.module.less";
import c from "classnames";

const CollectionManagement = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const navigate = useNavigate();

  const { data, isLoading } = useAllCollectios({ page, pageSize });

  const { collections } = data ?? {};

  const modal = useModal();

  const columns: TableProps<Collection>["columns"] = [
    {
      dataIndex: "title",
      key: "title",
      title: "名称",
    },
    {
      dataIndex: "description",
      key: "description",
      title: "描述信息",
    },
    {
      dataIndex: "update_at",
      key: "update_at",
      title: "更新时间",
      render: (v) => dayjs(v).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "操作",
      render: (_, record) => {
        return (
          <div className="flex fbac gap-10">
            {/* <div className={c(s.edit_text)} onClick={() => handleEditCollection(record)}>
              编辑
            </div> */}
            <div className={c(s.edit_text)} onClick={() => handleRemoveCollection(record)}>
              删除
            </div>
          </div>
        );
      },
    },
  ];

  const handleAddCollection = () => {
    navigate("/collections/add");
  };

  // const handleEditCollection = (record: Collection) => {
  //   navigate(`/collections/edit/${record.id}`);
  // };

  const handleRemoveCollection = (collection: Collection) => {
    modal?.show<Collection>("delete_collection_confirm", collection);
  };

  return (
    <div className={c(s.collection_management, "mt-20")}>
      <Button onClick={handleAddCollection}>新增合照</Button>
      <div className="text-[14px] font-600 mt-20">合照列表</div>
      <Table
        className="mt-10"
        columns={columns}
        loading={isLoading}
        dataSource={addKeysToData(collections!)}
        scroll={{ x: "max-content" }}
        pagination={{ total: 1, onChange: setPage, pageSize, size: "small", showSizeChanger: false }}
      />
    </div>
  );
};

export default CollectionManagement;
