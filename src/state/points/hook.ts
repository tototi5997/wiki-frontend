import { earnPointsAPI, getMyPointsAPI, getPointsRankingAPI, usePointsAPI } from "@/api/points";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";

export const useMyPoints = () => {
  const { data } = useQuery({ queryKey: ["my-points"], queryFn: getMyPointsAPI });
  return { ...data };
};

export const usePointsRanking = () => {
  const data = useQuery({ queryKey: ["points-ranking"], queryFn: getPointsRankingAPI });
  return data;
};

export const useManagePoints = () => {
  const earnPoints = useMutation({
    mutationFn: earnPointsAPI,
    onSuccess: () => {
      message.success("奖励积分成功");
    },
  });

  const usePoints = useMutation({
    mutationFn: usePointsAPI,
    onSuccess: () => {
      message.success("扣除积分成功");
    },
  });

  return { earnPoints, usePoints };
};
