import c from "classnames";
import s from "./index.module.less";
import { Table, TableProps } from "antd";
import { useAllSubmissions } from "@/state/submission/hook";
import { useState } from "react";
import { addKeysToData } from "@/utils/addKeysToData";
import dayjs from "dayjs";
import { SubmissionStaus, SubmissionStausMap } from "@/api/submission";
import { useNavigate } from "react-router-dom";

const SubmissionManagement = () => {
  const [page, setPage] = useState(1);

  const { data: submissionsData, isLoading, total } = useAllSubmissions({ page, pageSize: 10 });

  const navigate = useNavigate();

  const columns: TableProps<any>["columns"] = [
    {
      title: "关联任务",
      dataIndex: "task",
    },
    {
      title: "提交者",
      dataIndex: "user",
    },
    {
      title: "提交时间",
      dataIndex: "time",
      render: (v) => dayjs(v).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (v: SubmissionStaus) => SubmissionStausMap[v],
    },
    {
      title: "操作",
      render: (_, record) => {
        return (
          <div>
            {record?.status === 0 && (
              <span className={c(s.edit_text)} onClick={() => handleVerifySubmission(record)}>
                审核
              </span>
            )}
          </div>
        );
      },
    },
  ];

  const handleVerifySubmission = (record: any) => {
    navigate("/submissionVerify/" + record.id + "/" + record.entryId);
  };

  return (
    <div className={c(s.submission_management, "mt-20")}>
      <div className="text-[14px] font-600">提交列表</div>
      <Table
        className="mt-10"
        columns={columns}
        loading={isLoading}
        dataSource={addKeysToData(submissionsData!)}
        pagination={{ total, onChange: setPage, pageSize: 10, size: "small" }}
      />
    </div>
  );
};

export default SubmissionManagement;
