import { EntryDetail } from "@/api/entry";
import { Button, message } from "antd";
import useModal from "@/hooks/useModal";
import { useDeleteEntry } from "@/state/entry/hook";
import s from "./index.module.less";
import c from "classnames";
import { useQueryClient } from "@tanstack/react-query";

const DeleteEntryModal = (entry: EntryDetail) => {
  const modal = useModal();

  const queryClient = useQueryClient();

  const { deleteEntry } = useDeleteEntry(() => {
    modal?.hide();
    message.success("词条删除成功");
    queryClient.invalidateQueries({ queryKey: ["all-entries"] });
  });

  const handleDelete = () => {
    deleteEntry.mutate(entry.id);
  };

  return (
    <div className={c(s.delete_entry)}>
      <div className={c(s.content)}>
        <p className="mt-40">确认删除 "{entry.title}" 词条吗？</p>
        <div className="mt-40 fbh gap-20 fbje">
          <Button type="primary" onClick={handleDelete}>
            确认
          </Button>
          <Button onClick={() => modal?.hide()}>取消</Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEntryModal;
