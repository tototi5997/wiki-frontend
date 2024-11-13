import { searchEntry, TypeEntry, getEntryDetail, getAllEntriesAPI, SearchAllEntriesParams } from "@/api/entry";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useEntry = () => {
  const [assData, setAssData] = useState<TypeEntry[]>([]);
  const [entryDetail, setEntryDetail] = useState<any>({});
  // 联想搜索
  const onAssociation = useMutation({
    mutationFn: searchEntry,
    onSuccess: (res) => setAssData(res.entries || []),
  });
  // 词条详情
  const onEntryDetail = useMutation({
    mutationFn: getEntryDetail,
    onSuccess: (res) => setEntryDetail(res || {}),
  });

  return { onAssociation, assData, onEntryDetail, entryDetail };
};

export const useAllEntries = (params: SearchAllEntriesParams) => {
  const data = useQuery({
    queryKey: ["all-entries"],
    queryFn: () => getAllEntriesAPI(params),
  });

  return data;
};
