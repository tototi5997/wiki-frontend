import { searchEntry } from "@/api/entry";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const useAssociation = () => {
  const [assData, setAssData] = useState([])
  // 联想搜索
  const onAssociation = useMutation({
    mutationFn: searchEntry,
    onSuccess: (res:any) => setAssData(res.entries || []),
  });

  return { onAssociation, assData };
};