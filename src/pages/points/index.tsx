import c from "classnames";
import s from "./index.module.less";
import { useMyPoints, usePointsRanking } from "@/state/points/hook";
import { Children } from "react";

const PointsPage = () => {
  const { data: rankingResult } = usePointsRanking();

  const { total_points } = useMyPoints();

  const rankingData = rankingResult?.data ?? [];

  const renderRankingContent = () => {
    return rankingData.map((r) =>
      Children.toArray(
        <div className={c("fbh fbac fbjsb w-500 mobile:w-full", s.ranking_item)}>
          <div>{r.username}</div>
          <div>
            <div>
              <span className="w-80 inline-block">总积分：</span>
              {r?.total_points}
            </div>
            <div>
              <span className="w-80 inline-block">可用积分：</span>
              {r?.available_points}
            </div>
          </div>
        </div>
      )
    );
  };

  return (
    <div className={c(s.points_page, "px-0 py-170 mobile:px-20 mobile:py-0")}>
      <div>我的积分: {total_points ?? "-"}</div>
      <div className="text-center text-[14px] font-[500] m-20">积分榜</div>
      <div className={c(s.points_warp, "fbv fbac gap-12")}>{renderRankingContent()}</div>
    </div>
  );
};

export default PointsPage;
