export const SET_ROBOT_SETTINGS = "SET_ROBOT_SETTINGS";
export const SET_UPDATED_NODE = "SET_UPDATED_NODE";

export function setRobotSettingsData(data) {
  return {
    type: SET_ROBOT_SETTINGS,
    data
  };
}

export function setUpdatedNode(value) {
  return {
    type: SET_UPDATED_NODE,
    value
  };
}