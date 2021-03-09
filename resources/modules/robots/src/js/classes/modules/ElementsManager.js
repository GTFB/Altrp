export default class ElementsManger {
  constructor() {
    this.elements = {};
  }

  getElements() {
    return this.elements;
  }

  getElementClass(name) {
    if (!this.elements[name]) {
      throw "Не найден элемент с именем " + name;
    }
    return this.elements[name];
  }

  getComponentClass(name) {
    if (!this.components[name]) {
      throw "Не найден компонент с именем " + name;
    }
    return this.components[name];
  }

  getWidgetsList() {
    return [];
  }

  checkElementExists(elementName) {
    return !!this.elements[elementName];
  }
}
