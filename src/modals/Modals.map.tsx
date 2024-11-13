import { ModalProps } from "antd";
import EditUserInfoModal from "./contents/EditUserInfo";

interface IModalMain {
  des?: string;
  component: (props: any) => JSX.Element | null;
  extraProps?: Record<string, unknown>;
  noPadding?: boolean;
}

export type GlobalMoalType = IModalMain & ModalProps;

export type ModalKey = "edit_user_info";

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
]);

export default modalMap;
