import c from "classnames";
import s from "./index.module.less";
import { TypeTask } from "@/api/task";
import { Button, message } from "antd";
import useModal from "@/hooks/useModal";
import { useDeleteTask } from "@/state/task/hook";
import { useQueryClient } from "@tanstack/react-query";

const DeleteTaskModal = (task: TypeTask) => {
  const modal = useModal();

  const queryClient = useQueryClient();

  const { deleteTask } = useDeleteTask(() => {
    modal?.hide();
    message.success("任务删除成功");
    queryClient.invalidateQueries({ queryKey: ["all-tasks"] });
  });

  const handleDelete = () => {
    deleteTask.mutate(task.id);
  };

  return (
    <div className={c(s.delete_task_modal)}>
      <div className={c(s.content)}>
        <div>确认删除该任务吗？</div>
        <div>确认删除任务后，相关联的提交信息会一并删除且无法恢复。</div>
      </div>
      <div className="mt-40 fbh gap-20 fbje">
        <Button type="primary" onClick={handleDelete}>
          确认
        </Button>
        <Button onClick={() => modal?.hide()}>取消</Button>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
