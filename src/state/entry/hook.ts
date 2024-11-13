import { searchEntry, TypeEntry, getEntryDetail } from "@/api/entry";
import { useMutation } from "@tanstack/react-query";
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
