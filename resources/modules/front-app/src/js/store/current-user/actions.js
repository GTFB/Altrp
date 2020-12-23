export const CHANGE_CURRENT_USER = "CHANGE_CURRENT_USER";
export const CHANGE_CURRENT_USER_PROPERTY = "CHANGE_CURRENT_USER_PROPERTY";
export const UPDATE_USER_NOTIFICATION = "UPDATE_USER_NOTIFICATION";

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
export function updateUserNotification(notifiction) {
  return {
    type: UPDATE_USER_NOTIFICATION,
    notification: nnotifiction
  };
}
