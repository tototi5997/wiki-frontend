export const useServerImg = (url?: string) => {
  if (!url) return "";

  // const prefix = "http://10.1.5.66:3000"; // mac
  const prefix = "http://121.37.180.58:3000"; // 服务器
  // const prefix = "http://"  // pc
  return prefix + url;
};
