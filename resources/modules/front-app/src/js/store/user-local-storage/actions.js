export const CHANGE_USER_LOCAL_STORAGE = "CHANGE_USER_LOCAL_STORAGE";

export function changeStorageData(user) {
  return {
    type: CHANGE_USER_LOCAL_STORAGE,
    user: user || {}
  };
}
