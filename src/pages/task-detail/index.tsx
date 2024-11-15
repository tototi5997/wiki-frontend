import { Button } from "antd";
import { useTaskDetail } from "@/state/task/hook";
import { useNavigate, useParams } from "react-router-dom";
import { TaskStatusMap } from "@/api/task";
import { useMyInfo } from "@/state/auth/hook";
import c from "classnames";
import s from "./index.module.less";
import useModal from "@/hooks/useModal";
import { AcceptTaskConfirmModalProps } from "@/modals/contents/AcceptTaskConfirm";

const TaskDetailPage = () => {
  const { taskId } = useParams();

  const modal = useModal();

  const navigate = useNavigate();

  const { data: userInfo } = useMyInfo();

  const { is_admin } = userInfo ?? {};

  const id = taskId ? Number(taskId) : undefined;

  const { data: taskDetail } = useTaskDetail(id!);

  const { title, description, status, participants, entry } = taskDetail ?? {};

  const participanent = participants?.[0]?.user;

  const showAcceptButton = status === 0 && !is_admin;

  const showGoToTaskButton = participanent?.id === userInfo?.id && status === 1;

  const onBack = () => history.back();

  const handleTakeTask = () => {
    // if (id) acceptTask.mutate(id);
    modal?.show<AcceptTaskConfirmModalProps>("accept_task_confirm", { taskId: id!, entryTitle: taskDetail?.entry?.title ?? "" });
  };

  const handleDoTask = () => {
    navigate("/entryEdit/" + entry?.id + "/" + taskId);
  };

  return (
    <div className={c(s.task_detail, "w-full h-full fbv fbac")}>
      <div className={s.content}>
        <Button style={{ padding: 0 }} color="primary" variant="link" size="small" onClick={onBack}>
          返回
        </Button>
        <div className="mt-20">任务详情</div>
        <div className="mt-20 fbv gap-8">
          <TaskInfoItem label="任务名称" value={title} />
          <TaskInfoItem label="任务描述" value={description} />
          <TaskInfoItem label="任务状态" value={TaskStatusMap?.[status!]} />
          {participanent && <TaskInfoItem label="参与人员" value={participanent?.username} />}
        </div>

        <div className="mt-120">
          {showAcceptButton && <Button onClick={handleTakeTask}>接取任务</Button>}
          {showGoToTaskButton && (
            <Button type="primary" onClick={handleDoTask}>
              完成任务
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const TaskInfoItem = ({ label, value }: { label: string; value?: string }) => {
  return (
    <div className="fbh gap-12">
      <div>{label}</div>
      <span>{value ?? "-"}</span>
    </div>
  );
};

export default TaskDetailPage;
