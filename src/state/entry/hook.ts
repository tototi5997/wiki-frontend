import {
  searchEntry,
  TypeEntry,
  getEntryDetail,
  getAllEntriesAPI,
  SearchAllEntriesParams,
  createEntryAPI,
  editEntryAPI,
  deleteEntryAPI,
} from "@/api/entry";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { useState } from "react";

export const useEntrySearch = () => {
  const [assData, setAssData] = useState<TypeEntry[]>([]);

  // 联想搜索
  const onAssociation = useMutation({
    mutationFn: searchEntry,
    onSuccess: (res) => setAssData(res.entries || []),
  });

  return { onAssociation, assData };
};

export const useEntryDetail = (id: number) => {
  const data = useQuery({
    queryKey: ["entry-detail"],
    queryFn: () => getEntryDetail(id),
  });
  return data;
};

export const useAllEntries = (params: SearchAllEntriesParams) => {
  const { page } = params;
  const data = useQuery({
    queryKey: ["all-entries", page],
    queryFn: () => getAllEntriesAPI(params),
  });

  return data;
};

export const useCreateEntry = (successCallback?: () => void) => {
  const createNewEntry = useMutation({
    mutationFn: createEntryAPI,
    onSuccess: () => {
      message.success("词条创建成功");
      successCallback?.();
    },
  });

  return { createNewEntry };
};

export const useEditEntry = (successCallback?: () => void) => {
  const editEntry = useMutation({
    mutationFn: editEntryAPI,
    onSuccess: () => {
      successCallback?.();
    },
  });

  return { editEntry };
};

export const useDeleteEntry = (successCallback?: () => void) => {
  const deleteEntry = useMutation({
    mutationFn: deleteEntryAPI,
    onSuccess: () => {
      successCallback?.();
    },
  });
  return { deleteEntry };
};
