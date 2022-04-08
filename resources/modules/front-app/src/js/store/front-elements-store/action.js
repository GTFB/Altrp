import AppStore from "../store";

export const addFrontElement = (obj) => {
  let a = AppStore.getState().frontElementsState.frontElements.some(item => item.name === obj.name)
  if (!a) {
    window.frontElementsManager.addElement(obj)
  }

  return {
    type: "ADD_FRONT_ELEMENT",
    payload: obj
  }
}
