import { createCollectionAPI, deleteCollectionAPI, getAllCollectionsAPI, QueryCollectionsParams } from "@/api/collection";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAllCollectios = (params: QueryCollectionsParams) => {
  const data = useQuery({
    queryKey: ["all-collections"],
    queryFn: () => getAllCollectionsAPI(params),
  });

  return data;
};

export const useCreateCollection = (successCallback?: () => void) => {
  const createCollection = useMutation({
    mutationFn: createCollectionAPI,
    onSuccess: () => {
      successCallback?.();
    },
  });
  return { createCollection };
};

export const useDeleteCollection = (successCallback: () => void) => {
  const deleteCollection = useMutation({
    mutationFn: deleteCollectionAPI,
    onSuccess: () => {
      successCallback?.();
    },
  });
  return { deleteCollection };
};
