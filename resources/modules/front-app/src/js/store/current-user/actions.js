export const CHANGE_CURRENT_USER = 'CHANGE_CURRENT_USER';
export const SET_NOTICE_FOR_USER = 'SET_NOTICE_FOR_USER';
export const CHANGE_CURRENT_USER_PROPERTY = "CHANGE_CURRENT_USER_PROPERTY";

export function changeCurrentUser(user) {
  return {
    type: CHANGE_CURRENT_USER,
    user: user || {}
  };
}

export function setUserNotice(notice){
  return { type: SET_NOTICE_FOR_USER, notice }
}

export function changeCurrentUserProperty(path, value) {
  return {
    type: CHANGE_CURRENT_USER_PROPERTY,
    path: path || "",
    value: value || ""
  };
}
