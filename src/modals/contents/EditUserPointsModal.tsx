import c from "classnames";
import s from "./index.module.less";
import { UserInfoType } from "@/api/auth";
import { Button, InputNumber } from "antd";
import { useState } from "react";
import { useManagePoints } from "@/state/points/hook";
import useModal from "@/hooks/useModal";

const EditUserPointsModal = (userInfo: UserInfoType) => {
  const [points, setPoints] = useState(0);

  const { earnPoints, usePoints } = useManagePoints();

  const modal = useModal();

  const handleEarnPoints = () => {
    earnPoints.mutate({ user_id: userInfo.id, points });
    modal?.hide();
  };

  const handleUsePoints = () => {
    usePoints.mutate({ user_id: userInfo.id, points: points });
    modal?.hide();
  };

  return (
    <div className={c(s.edit_user_points)}>
      <div className={c(s.content)}>
        <div>编辑用户积分</div>
        <div className="mt-20 fbh fbac gap-20">
          <div>积分：</div>
          <InputNumber value={points} min={0} onChange={(v) => setPoints(v!)} />
        </div>

        <div className="mt-40 fbh gap-20 fbje">
          <Button type="primary" onClick={handleEarnPoints}>
            奖励积分
          </Button>
          <Button onClick={handleUsePoints}>扣除积分</Button>
        </div>
      </div>
    </div>
  );
};

export default EditUserPointsModal;
