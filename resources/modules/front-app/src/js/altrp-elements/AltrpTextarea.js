import findElement from "../functions/findElement";

export default class  AltrpTextarea{
  constructor(HTMLElement) {
    this.HTMLElement = HTMLElement;
    this.element = findElement(HTMLElement.dataset.reactElement);
  }

}
