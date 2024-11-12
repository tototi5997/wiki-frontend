import service from "@/utils/axios";

export type searchType = {
  q: string | undefined;
}

// 搜索词条
export const searchEntry = (params: searchType) => {
  return service({
    url: "/entries/search",
    method: "get",
    params
  });
};
