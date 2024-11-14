import { getMyPointsAPI, getPointsRankingAPI } from "@/api/points";
import { useQuery } from "@tanstack/react-query";

export const useMyPoints = () => {
  const { data } = useQuery({ queryKey: ["my-points"], queryFn: getMyPointsAPI });
  return { ...data };
};

export const usePointsRanking = () => {
  const data = useQuery({ queryKey: ["points-ranking"], queryFn: getPointsRankingAPI });
  return data;
};
