import service from "@/utils/axios";

export type PointsType = {
  total_points: number;
  available_points: number;
  used_points: number;
};

export type RaningPoints = {
  username: string;
  total_points: number;
  available_points: number;
};

export type EarnPointsParams = {
  points: number;
  user_id: number;
};

export const getMyPointsAPI = (): Promise<PointsType> => {
  return service.get("/points/me");
};

export const getPointsRankingAPI = (): Promise<{ data: RaningPoints[] }> => {
  return service({
    url: "/points/all",
    method: "post",
    data: {
      pageSize: 100,
      sort: "desc",
    },
  });
};

export const earnPointsAPI = (data: EarnPointsParams) => {
  return service({
    url: "/points/earn",
    method: "put",
    data,
  });
};

export const usePointsAPI = (data: EarnPointsParams) => {
  return service({
    url: "/points/use",
    method: "put",
    data,
  });
};
