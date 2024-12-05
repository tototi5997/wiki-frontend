import { ModalProps } from "antd";
import EditUserInfoModal from "./contents/EditUserInfo";
import CreateTaskModal from "./contents/CreateTaskModal";
import AcceptTaskConfirmModal from "./contents/AcceptTaskConfirm";
import DeleteEntryModal from "./contents/DeleteEntryModal";
import DeleteTaskModal from "./contents/DeleteTaskModal";
import EditUserPointsModal from "./contents/EditUserPointsModal";
import DeleteCollectionModal from "./contents/DeleteCollectionModal";

interface IModalMain {
  des?: string;
  component: (props: any) => JSX.Element | null;
  extraProps?: Record<string, unknown>;
  noPadding?: boolean;
}

export type GlobalMoalType = IModalMain & ModalProps;

export type ModalKey =
  | "edit_user_info"
  | "create_task"
  | "accept_task_confirm"
  | "delete_entry_confirm"
  | "delete_task_confirm"
  | "edit_user_points"
  | "delete_collection_confirm";

const modalMap = new Map<ModalKey, GlobalMoalType>([
  [
    "edit_user_info",
    {
      component: EditUserInfoModal,
      footer: null,
      noPadding: true,
      closable: true,
      width: 560,
    },
  ],
  [
    "create_task",
    {
      component: CreateTaskModal,
      footer: null,
      noPadding: true,
      closable: true,
      width: 560,
    },
  ],
  [
    "accept_task_confirm",
    {
      component: AcceptTaskConfirmModal,
      footer: null,
      noPadding: true,
      closable: true,
      width: 460,
    },
  ],
  [
    "delete_entry_confirm",
    {
      component: DeleteEntryModal,
      footer: null,
      noPadding: true,
      closable: true,
      width: 460,
    },
  ],
  [
    "delete_task_confirm",
    {
      component: DeleteTaskModal,
      footer: null,
      noPadding: true,
      closable: true,
      width: 460,
    },
  ],
  [
    "edit_user_points",
    {
      component: EditUserPointsModal,
      footer: null,
      noPadding: true,
      closable: true,
      width: 560,
    },
  ],
  [
    "delete_collection_confirm",
    {
      component: DeleteCollectionModal,
      footer: null,
      noPadding: true,
      closable: true,
      width: 460,
    },
  ],
]);

export default modalMap;
