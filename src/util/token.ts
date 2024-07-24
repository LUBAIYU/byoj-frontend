/**
 * 解析Token获取用户角色信息
 * @param token
 */
export const getRole = (token: string) => {
  // 获取token中存储的用户角色信息
  const payloadBase64Url = token?.split(".")[1];
  const payloadBase64 = payloadBase64Url.replace(/-/g, "+").replace(/_/g, "/");
  const payloadBinary = atob(payloadBase64);
  const payload = JSON.parse(payloadBinary);
  // 返回用户角色信息
  return payload?.role ?? 1;
};

/**
 * 解析Token获取用户ID
 * @param token
 */
export const getUserId = (token: string) => {
  // 获取token中存储的用户ID
  const payloadBase64Url = token?.split(".")[1];
  const payloadBase64 = payloadBase64Url.replace(/-/g, "+").replace(/_/g, "/");
  const payloadBinary = atob(payloadBase64);
  const payload = JSON.parse(payloadBinary);
  // 返回用户ID
  return payload?.userId ?? undefined;
};
