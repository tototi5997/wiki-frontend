/**
 *
 * @param data
 * @param keyName
 * @returns data with keys
 */
export const addKeysToData = (data: any[], keyName?: string) => {
  return data?.map((i, index) => ({
    ...i,
    key: keyName && i?.[keyName] ? i[keyName] : index.toString(),
  }));
};
