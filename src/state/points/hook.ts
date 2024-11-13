import { getMyPointsAPI } from "@/api/points";
import { useQuery } from "@tanstack/react-query";

export const useMyPoints = () => {
  const { data } = useQuery({ queryKey: ["my-points"], queryFn: getMyPointsAPI });
  return { ...data };
};
