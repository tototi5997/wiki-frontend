import service from "@/utils/axios";

export type searchType = {
  q: string | undefined;
};

export type TypeEntry = {
  id: number;
  title: string;
  created_at: string;
};

export type TypeSearchResult = {
  entries: TypeEntry[];
  total: number;
  page: number;
  page_size: number;
};

// 搜索词条
export const searchEntry = (params: searchType): Promise<TypeSearchResult> => {
  return service({
    url: "/entries/search",
    method: "get",
    params,
  });
};
// 获取词条详情
export const getEntryDetail = (id: string) => {
  return service({
    url: `/entries/${id}`,
    method: "get",
  });
};
