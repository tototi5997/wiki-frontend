import { searchEntry, TypeEntry } from "@/api/entry";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const useAssociation = () => {
  const [assData, setAssData] = useState<TypeEntry[]>([]);
  // 联想搜索
  const onAssociation = useMutation({
    mutationFn: searchEntry,
    onSuccess: (res) => setAssData(res.entries || []),
  });

  return { onAssociation, assData };
};
