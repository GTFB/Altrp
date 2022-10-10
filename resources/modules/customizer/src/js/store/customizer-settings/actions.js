import {addNode, addNodes} from "../node-store/action";

export const SET_CUSTOMIZER_SETTINGS = "SET_CUSTOMIZER_SETTINGS";
export const SET_UPDATED_NODE = "SET_UPDATED_NODE";

export function setCustomizerSettingsData(data) {
  return {
    type: SET_CUSTOMIZER_SETTINGS,
    data
  };
}

export function setUpdatedNode(value) {
  return {
    type: SET_UPDATED_NODE,
    value
  };
}


window.storeActions = window.storeActions || {}
window.storeActions.setUpdatedNode = setUpdatedNode
window.storeActions.setCustomizerSettingsData = setCustomizerSettingsData
