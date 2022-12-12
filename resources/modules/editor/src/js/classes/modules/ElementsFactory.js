import BaseModule from "./BaseModule";
import { getEditor } from "../../helpers";
import BaseElement from "../elements/BaseElement";
import store  from "../../store/store";

class ElementsFactory extends BaseModule {
  /**
   * Парсит объект и создает из него дерево элементов
   * @param object
   * @param parent
   * @param {boolean} rewriteStyles
   * @param {object} other
   * @param {boolean} [other.updateId]
   * @return {BaseElement}
   */
  parseData(object, parent, rewriteStyles = false, other) {
    let updateId = false;

    if(other) {
      if(other.updateId) {
        updateId = other.updateId;
      }
    }
    let children = [];
    const elementsManager = window.elementsManager;
    // console.error(Object.keys(store.getState().widgetsManager.elements));
    /**
     * @member {BaseElement} element
     * */
    let element = new (elementsManager.getElementClass(object.name))();
    // element.name = object.name;
    if (object.children && object.children.length) {
      for (let child of object.children) {
        elementsManager.checkElementExists(child.name)
          ? children.push(this.parseData(child, element, rewriteStyles))
          : "";
      }
    }
    if (rewriteStyles) {
      let oldId = object.id;
      element.id = element.getId();
      object.settings = JSON.stringify(object.settings).replace(
        RegExp(oldId, "g"),
        element.getId()
      );
      object.settings = JSON.parse(object.settings);
    } else {
      if(updateId) {
        element.id = BaseElement.generateId();
      } else {
        element.id = object.id;
      }
    }
    element.children = children;
    /**
     * Если настройки пустыe то с сервера приходит пустой массив -- меняем на пустой объект
     * */
    let settings = object.settings.length === 0 ? {} : object.settings;
    let locked = (object.settingsLock || []).length === 0 ? {} : object.settingsLock
    element.setSettings(settings, locked);
    let cssClassStorage =
      object.cssClassStorage && object.cssClassStorage.length === 0
        ? {}
        : object.cssClassStorage;
    element.setCSSStorage(cssClassStorage);
    if (object.dynamicContentSettings) {
      element.dynamicContentSettings =
        object.dynamicContentSettings.length === 0
          ? {}
          : object.dynamicContentSettings;
    }

    if (parent) {
      element.parent = parent;
    }
    element.update();
    element.updateFonts();
    return element;
  }

  /**
   * @param {BaseElement} element
   * @param {BaseElement} target
   * @return{BaseElement}
   * */
  duplicateElement(element, target) {
    let newElement = this._duplicateElement(element);
    target.insertNewChildAfter(element.getId(), newElement);
    /**
     * @member {TemplateDataStorage} templateDataStorage
     * */
    let templateDataStorage = getEditor().modules.templateDataStorage;
    templateDataStorage.elementsIds = _.union(
      templateDataStorage.elementsIds,
      newElement.getIds()
    );
    return newElement;
  }
  /**
   * @param {BaseElement} element
   * */
  _duplicateElement(element) {
    /**
     * @member {BaseElement} newElement
     * */
    let newElement = new (elementsManager.getElementClass(element.getName()))();
    let newChildren = [];
    element.children.map(childrenItem => {
      let newChild = this._duplicateElement(childrenItem);
      newChild.setParent(newElement);
      newChildren.push(newChild);
    });
    // newElement.component = new
    newElement.setChildren(newChildren);
    newElement.settings = _.cloneDeep(element.settings);
    newElement.settingsLock = _.cloneDeep(element.settingsLock);
    if (element.dynamicContentSettings) {
      newElement.dynamicContentSettings = _.cloneDeep(
        element.dynamicContentSettings
      );
    }
    newElement.children = newChildren;
    return newElement;
  }
}

export default ElementsFactory;
