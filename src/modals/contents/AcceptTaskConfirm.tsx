import c from "classnames";
import s from "./index.module.less";
import { Button } from "antd";
import useModal from "@/hooks/useModal";
import { useAcceptTask } from "@/state/task/hook";

export type AcceptTaskConfirmModalProps = {
  taskId: number;
  entryTitle: string;
};

const AcceptTaskConfirmModal = (props: AcceptTaskConfirmModalProps) => {
  const { taskId, entryTitle } = props ?? {};

  const { acceptTask } = useAcceptTask();

  const modal = useModal();

  const handleAcceptTask = () => {
    acceptTask.mutate(taskId);
    modal?.hide();
  };

  return (
    <div className={c(s.accept_task_confirm)}>
      <div className={c(s.content)}>
        <p className="mt-40">确认接受 "{entryTitle}" 词条关联的任务吗？</p>
        <div className="mt-40 fbh gap-20 fbje">
          <Button type="primary" onClick={handleAcceptTask}>
            确认
          </Button>
          <Button onClick={() => modal?.hide()}>取消</Button>
        </div>
      </div>
    </div>
  );
};

export default AcceptTaskConfirmModal;
