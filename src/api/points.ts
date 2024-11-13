import service from "@/utils/axios";

export type PointsType = {
  total_points: number;
  available_points: number;
  used_points: number;
};

export const getMyPointsAPI = (): Promise<PointsType> => {
  return service.get("/points/me");
};
