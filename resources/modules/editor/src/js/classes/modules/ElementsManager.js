export default class ElementsManger {
  getElements() {
    return window.appStore.getState().widgetsManager.elements;
  }

  getElementClass(name) {

    const {widgetsManager} = window.appStore.getState()
    if (!widgetsManager.elements[name]) {
      throw "Not found element with name " + name;
    }
    return widgetsManager.elements[name];
  }

  getComponentClass(name) {
    const {widgetsManager} = window.appStore.getState()
    if (!widgetsManager.components[name]) {
      throw "Not found component with name " + name;
    }
    return widgetsManager.components[name];
  }

  checkElementExists(elementName) {
    return !!window.appStore.getState().widgetsManager.elements[elementName];
  }
}

