export const SET_ROBOT_SETTINGS = "SET_ROBOT_SETTINGS";
export const SET_ROBOT_EMAIL_TO = "SET_ROBOT_EMAIL_TO";
export const SET_ROBOT_EMAIL_MSG = "SET_ROBOT_EMAIL_MSG";

export const SET_NODE_POSITION = "SET_NODE_POSITION";

export function setRobotSettingsData(data) {
  return {
    type: SET_ROBOT_SETTINGS,
    data
  };
}
export function setRobotEmailTo(value) {
  return {
    type: SET_ROBOT_EMAIL_TO,
    value
  };
}
export function setRobotEmailMSG(value) {
  return {
    type: SET_ROBOT_EMAIL_MSG,
    value
  };
}

export function setNodePosition(value) {
  return {
    type: SET_NODE_POSITION,
    value
  };
}
