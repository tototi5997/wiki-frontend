import { searchEntry, TypeEntry, getEntryDetail, getAllEntriesAPI, SearchAllEntriesParams, createEntryAPI } from "@/api/entry";
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
  const data = useQuery({
    queryKey: ["all-entries"],
    queryFn: () => getAllEntriesAPI(params),
  });

  return data;
};

export const useCreateEntry = () => {
  const createNewEntry = useMutation({
    mutationFn: createEntryAPI,
    onSuccess: () => {
      message.success("词条创建成功");
    },
  });

  return { createNewEntry };
};
