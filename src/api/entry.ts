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

export type SearchAllEntriesParams = {
  page?: number;
  pageSize?: number;
  q?: string;
};

export type EntryDetail = {
  id: number;
  title: string;
  content: string;
  update_at: string;
  cover_image?: string;
  creator: {
    username: string;
  };
};

export type TypeCreateEntry = {
  title: string;
  content: string;
  cover_image?: string;
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
export const getEntryDetail = (id: number): Promise<EntryDetail> => {
  return service({
    url: `/entries/${id}`,
    method: "get",
  });
};

// 获取所有词条
export const getAllEntriesAPI = (params: SearchAllEntriesParams): Promise<TypeSearchResult> => {
  return service({
    url: "/entries",
    method: "get",
    params,
  });
};

// 创建词条
export const createEntryAPI = (data: TypeCreateEntry) => {
  return service({
    url: "/entries/create",
    method: "post",
    data,
  });
};
