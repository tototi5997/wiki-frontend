import { Button, message } from "antd";
import useModal from "@/hooks/useModal";
import { useQueryClient } from "@tanstack/react-query";
import { Collection } from "@/api/collection";
import { useDeleteCollection } from "@/state/collection/hook";
import s from "./index.module.less";
import c from "classnames";

const DeleteCollectionModal = (collection: Collection) => {
  const modal = useModal();

  const queryClient = useQueryClient();

  const { deleteCollection } = useDeleteCollection(() => {
    modal?.hide();
    message.success("合照删除成功");
    queryClient.invalidateQueries({ queryKey: ["all-collections"] });
  });

  const handleDelete = () => {
    deleteCollection.mutate(collection.id);
  };

  return (
    <div className={c(s.delete_collection)}>
      <div className={c(s.content)}>
        <p className="mt-40">确认删除 "{collection.title}" 合照吗？</p>
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

export default DeleteCollectionModal;
