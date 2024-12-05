import service from "@/utils/axios";

export type QueryCollectionsParams = {
  page?: number;
  pageSize?: number;
};

export type Collection = {
  id: number;
  title: string;
  description: string;
  images: string[];
  create_at: string;
  update_at: string;
};

export type CreateCollectionParams = {
  title: string;
  description: string;
  images: string[];
};

// 获取所有的合照
export const getAllCollectionsAPI = (data: QueryCollectionsParams): Promise<{ collections: Collection[]; total: number }> => {
  return service({
    method: "post",
    url: "/collections/all",
    data,
  });
};

// 创建合照
export const createCollectionAPI = (data: CreateCollectionParams) => {
  return service({
    method: "post",
    url: "/collections/create",
    data,
  });
};

// 删除合照
export const deleteCollectionAPI = (id: number) => {
  return service({
    method: "delete",
    url: `/collections/${id}`,
  });
};
