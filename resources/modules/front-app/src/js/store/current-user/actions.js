export const CHANGE_CURRENT_USER = "CHANGE_CURRENT_USER";
export const CHANGE_CURRENT_USER_PROPERTY = "CHANGE_CURRENT_USER_PROPERTY";

export function changeCurrentUser(user) {
  return {
    type: CHANGE_CURRENT_USER,
    user: user || {}
  };
}

export function changeCurrentUserProperty(path, value) {
  return {
    type: CHANGE_CURRENT_USER_PROPERTY,
    path: path || "",
    value: value || ""
  };
}
