import {TAB_CONTENT, TAB_STYLE} from "../modules/ControllersManager";
import {editorSetCurrentElement, getEditor, getFactory, getTemplateDataStorage} from "../../helpers";
import {addFont} from "../../../../../front-app/src/js/store/fonts-storage/actions";
import CONSTANTS from "../../consts";
import {changeTemplateStatus} from "../../store/template-status/actions";
import store, {getCurrentScreen, getElementState} from "../../store/store";
import ControlStack from "./ControlStack";
import {isEditor} from "../../../../../front-app/src/js/helpers";
import {addHistoryStoreItem} from "../../store/history-store/actions";

/**
 * Базовый класс для методов элемента для редактора
 */
class BaseElement extends ControlStack {
  constructor(element) {
    super();
    if(!element) {
      this.settings = {};
      this.settingsLock = {};
      this.cssClassStorage = {};
    } else {
      this.settings = element.settings;
      this.settingsLock = element.settingsLock;
      this.cssClassStorage = element.cssClassStorage;
    }
    this.controls = {};
    this.controlsIds = [];
    this.controllersRegistered = false;
    this.children = [];
    this.componentClass = window.elementsManager.getComponentClass(
      this.getName()
    );
    this.initiatedDefaults = null;

    /**
     * @type {BaseElement}
     * @public
     */
    this.parent = null;
    this._initDefaultSettings();
  }

  /**
   *
   * @returns {BaseElement|null}
   */
  findElementById(elementId){
    if(! elementId){
      return null
    }
    if(this.getId() === elementId){
      return this
    }
    for(const el of this.getChildren()){
      if(el.findElementById(elementId)){
        return el.findElementById(elementId)
      }
    }
    return null
  }
  /**
   * Задать настройки
   * @param settings
   * @param settingsLock
   */
  setSettings(settings, settingsLock) {
    this.settings = settings || this.settings;

    this.settingsLock =  settingsLock || {};

    const controls = controllersManager.getControls(this.getName())
    // Выбираем locked настройки
    Object.keys(controls).map(key => {
      controls[key].map(tab => {
        tab.controls.map(control => {
          if (control.locked) {
            this.settingsLock[control.controlId] = settings[control.controlId] || this.settingsLock[control.controlId]
          }
        })
      })
    })

    if (this.component && settings) {
      this.component.setState(state => {
        return {
          ...state,
          settings
        };
      });
    }
    if (this.wrapperComponent && settings) {
      this.wrapperComponent.setState(state => ({ ...state, settings }));
    }
  }

  /**
   * Задать Хранилище CSS классов для контроллеров с prefixClass
   * @param {{}} cssClassStorage
   * @return {*|null}
   */
  setCSSStorage(cssClassStorage) {
    this.cssClassStorage = _.cloneDeep(cssClassStorage);
  }

  /**
   *
   * @returns {string}
   */
  getId() {
    if (!this.id) {
      this.id = BaseElement.generateId();
    }
    return this.id;
  }

  /**
   * Сохранить prefixClass и value, которое будет браться из variants.
   * @param settingName
   * @param value
   */

  setCssClass(settingName, value) {
    this.cssClassStorage[settingName] = value;
  }

  /**
   *
   * @returns {string}
   */
  getName() {
    if(!this.constructor.getName()){
      console.log(this);
      console.log(this.constructor);
    }
    return this.constructor.getName();
  }

  getType() {
    return this.constructor.getType();
  }

  getTitle() {
    return this.constructor.getTitle();
  }

  static generateId() {
    return (
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }

  cleaner(settings) {
    const newSettings = {}

    _.keys(settings).forEach(key => {
      let setting = settings[key]

      if(setting) {

        if(!Array.isArray(setting)) {

          if(typeof setting === "object") {
            const cleaned = this.cleaner(setting);

            setting = _.keys(cleaned).length > 0 && cleaned
          }

          if(setting) {
            newSettings[key] = setting
          }
        } else {
          newSettings[key] = setting
        }
      }
    })

    return newSettings;
  }

  toObject() {
    // if(!this.component){
    //   throw 'Element Must Composites with Some Component';
    // }
    let data = {};
    data.id = this.getId();
    data.name = this.getName();
    data.settings = this.settings;

    data.settingsLock = this.settingsLock;
    data.type = this.getType();
    if (this.dynamicContentSettings && this.dynamicContentSettings.length) {
      data.dynamicContentSettings = [...this.dynamicContentSettings];
    }
    data.cssClassStorage = { ...this.cssClassStorage };
    let children = this.getChildrenForImport();
    if (children) {
      data.children = children;
    }
    return data;
  }

  getChildrenForImport() {
    if (!this.children.length) {
      return [];
    }
    let children = [];
    for (let _c of this.children) {
      children.push(_c.toObject());
    }
    return children;
  }

  getChildren() {
    if (!this.children?.length) {
      return [];
    }
    return this.children;
  }

  /**
   * добавлйет новый  дочерний элемент в конец
   * @param {BaseElement} child
   * */
  appendChild(child, dispatchToHistory = true) {
    this.children.push(child);
    child.setParent(this);
    if (this.component && typeof this.component.setChildren === "function") {
      this.component.setChildren(this.children);
    }
    this.templateNeedUpdate();
    if (dispatchToHistory) {
      let index = this.children.length - 1;
      store.dispatch(
        addHistoryStoreItem("ADD", { element: child, index, parent: this })
      );
    }
  }
  /**
   * добавлйет новый  дочерний элемент в конец
   * @param {BaseElement} child
   * */
  prependChild(child, dispatchToHistory = true) {
    this.children.unshift(child);
    child.setParent(this);
    if (this.component && typeof this.component.setChildren === "function") {
      this.component.setChildren(this.children);
    }
    this.templateNeedUpdate();
    if (dispatchToHistory) {
      let index = this.children.length - 1;
      store.dispatch(
        addHistoryStoreItem("ADD", { element: child, index, parent: this })
      );
    }
  }

  setAllChild(child, dispatchToHistory = true) {
    const factory = getFactory();

    const sections = [];

    child.forEach(section => {
      sections.push(factory.parseData(section, this, null, {
        updateId: true
      }))
    })

    this.children = [...this.children, ...sections]

    if (this.component && typeof this.component.setChildren === "function") {
      this.component.setChildren(this.children);
    }

    this.templateNeedUpdate();

    child.forEach
  }



  insertSiblingAfter(newSibling) {
    this.parent.insertNewChildAfter(this.getId(), newSibling);
  }
  /**
   * @param {number} index
   * @param {BaseElement} child
   * */
  restoreChild(index, child) {
    if (index === undefined || index > this.children.length) {
      throw "can not restore child";
    }

    if (child.parent === undefined) {
      child.setParent(this);
    }

    let isHaveChild = false;
    isHaveChild = this.children.some(childItem => {
      if (childItem.getId() === child.getId()) {
        return true;
      }
    });
    if (!isHaveChild) {
      this.children.splice(index, 0, child);
    }

    this.component.setChildren(this.children);
    editorSetCurrentElement(child);

    this.templateNeedUpdate();
  }

  insertSiblingBefore(newSibling) {
    this.parent.insertNewChildBefore(this.getId(), newSibling);
  }
  /**
   * @param {string} childId
   * @param {BaseElement} newChild
   * */
  insertNewChildAfter(childId, newChild) {
    let index;
    this.children.map((childItem, idx) => {
      if (childItem.getId() === childId) {
        index = idx;
      }
    });
    if (index === undefined) {
      throw "childId not found when insertNewChildAfter";
    }
    newChild.setParent(this);
    this.children.splice(index + 1, 0, newChild);
    this.component.setChildren(this.children);
    this.templateNeedUpdate();
    index += 1;
    store.dispatch(
      addHistoryStoreItem("ADD", { element: newChild, index, parent: this })
    );
  }
  /**
   * @param {string} childId
   * @param {BaseElement} newChild
   * */
  insertNewChildBefore(childId, newChild) {
    let index;
    this.children.map((childItem, idx) => {
      if (childItem.getId() === childId) {
        index = idx;
      }
    });
    if (index === undefined) {
      throw "childId not found when insertNewChildBefore";
    }
    newChild.setParent(this);
    this.children.splice(index, 0, newChild);
    this.component.setChildren(this.children);
    this.templateNeedUpdate();
    store.dispatch(
      addHistoryStoreItem("ADD", { element: newChild, index, parent: this })
    );
  }

  /**
   * @param {BaseElement} target
   * */
  insertAfter(target) {
    target.insertSiblingAfter(this);
  }
  /**
   * @param {BaseElement} target
   * */
  insertBefore(target) {
    target.insertSiblingBefore(this);
  }

  templateNeedUpdate() {
    store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_NEED_UPDATE));
  }
  /**
   * @param {BaseElement[]} newChildren
   * */
  setChildren(newChildren) {
    this.children = newChildren;
  }
  /**
   * @param {BaseElement[]} newChildren
   * */
  updateChildren(newChildren) {
    if (newChildren) {
      this.children = newChildren;
    }
    this.component.setChildren(this.children);
    store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_NEED_UPDATE));
  }

  /**
   * Удаляет текущий элемент у родителя
   */
  deleteThisElement() {
    this.parent.deleteChild(this);
  }

  /**
   * Дублирует элемент и вставляет после текущего
   */
  duplicate() {
    let factory = getFactory();
    let newElement = factory.duplicateElement(this, this.parent);
    getTemplateDataStorage().setCurrentElement(newElement);
    getEditor().showSettingsPanel();
    this.update();
  }

  deleteAllIds() {
    this.id = null;
    this.children.forEach(child => {
      child.deleteAllIds();
    });
  }
  /**
   * @param {BaseElement | string} child
   * @param {boolean} dispatchToHistory
   * @throws Если не указан IG или сам элемент
   * */
  deleteChild(child, dispatchToHistory = true) {
    let childExist = false;
    let childId;
    if (typeof child === "string") {
      childId = child;
    } else if (child instanceof BaseElement) {
      childId = child.getId();
    } else {
      throw "Delete Child can only by id or Instance";
    }
    let newChildren = this.children.filter((item, index) => {
      if (item.getId() === childId) {
        childExist = true;
        if (dispatchToHistory) {
          store.dispatch(
            addHistoryStoreItem("DELETE", {
              element: child,
              parent: this,
              index
            })
          );
          item.beforeDelete();
        }
        return false;
      }
      return true;
    });
    if (!childExist) {
      throw "Element not Found for Delete";
    }
    this.updateChildren(newChildren);
  }

  removeFromParent() {
    this.parent.deleteChild(this);
  }

  beforeDelete() {
    this.children.map(item => {
      item.beforeDelete();
    });
    if (
      getTemplateDataStorage()
        .getCurrentElement()
        .getId() === this.getId()
    ) {
      getTemplateDataStorage().setCurrentRootElement();
      getEditor().showWidgetsPanel();
    }
  }

  /**
   * Удаляет свойство настройки по id
   * @param {string} settingName
   */
  deleteSetting(settingName) {
    if (this.settings[settingName]) {
      delete this.settings[settingName];
    }
    // if(this.component){
    //   this.component.changeSetting(settingName, null);
    // }
  }
  /**
   * Возвращает значение настройки по id
   * @param {string} settingName
   * @param {*}_default
   * @return {*}
   */
  getSettings(settingName, _default = "", locked = false) {
    this._initDefaultSettings();
    const settings = locked ? this.settingsLock : this.settings

    if (!settingName) {
      return _.cloneDeep(settings);
    }

    if (settings[settingName] === undefined) {
      let control = window.controllersManager.getElementControl(
        this.getName(),
        settingName
      );

      if(settingName === "button_text") {
        console.log(control, settings[settingName]);
      }
      if (!control || !control.default) {
        if (_.isString(_default)) {
          return _default;
        }
        return _default || null;
      }
      settings[settingName] = control.default;
      if(settingName === "button_text") {
        console.log(control, settings[settingName]);
      }
    }

    return settings[settingName] || _default;
  }

  getLockedSettings(settingName, _default = "") {
    return this.getSettings(settingName, _default, true)
  }

  _initDefaultSettings() {
    if (!window.controllersManager || this.initiatedDefaults) {
      return;
    }
    let controls = window.controllersManager.getControls(this.getName());
    if (this.defaultSettingsIsApply) {
      return;
    }
    for (let tabName in controls) {
      if (controls.hasOwnProperty(tabName)) {
        if (!controls[tabName].length) {
          continue;
        }
        for (let section of controls[tabName]) {
          if (!section.controls.length) {
            continue;
          }
          for (let control of section.controls) {
            const settings = control.locked ? this.settingsLock : this.settings
            if (
              control.default !== undefined &&
              settings[control.controlId] === undefined
            ) {
              settings[control.controlId] = control.default;
            }
          }
        }
      }
    }

    this.updateStyles();
    this.defaultSettingsIsApply = true;
  }

  setSettingValue(settingName, value, dispatchToHistory = true, locked = false) {
    const settings = locked ? this.settingsLock : this.settings
    //check change value
    if (settings[settingName] !== value) {
      if (
        dispatchToHistory &&
        store.getState().templateStatus.status ===
          CONSTANTS.TEMPLATE_NEED_UPDATE
      )
        store.dispatch(
          addHistoryStoreItem("EDIT", {
            element: this,
            oldValue: settings[settingName],
            newValue: value,
            locked,
            settingName
          })
        );
      // this.settings = {...this.settings};

      if (locked) {
        this.settingsLock[settingName] = value;
      }

      this.settings[settingName] = value;
      if (this.component) {
        (async () => {
          this.component?.changeSetting && this.component?.changeSetting(settingName, value);
        })();
      }
    }
  }

  _registerControls() {
    this.controllersRegistered = true;
  }
  /**
   * @param {string} sectionId
   * @param {object} args
   * */
  startControlSection(sectionId, args) {

    if (this.controlsIds.indexOf(sectionId) !== -1) {
      throw "Control with id" +
        sectionId +
        " Already Exists in " +
        this.getName();
    }
    let defaults = {
      tab: TAB_CONTENT
    };
    this.currentSection = { ...defaults, ...args, sectionId };
    this.controlsIds.push(sectionId);
  }

  endControlSection() {
    this.currentSection = null;
  }

  _getCurrentTab() {
    let tabName = this.currentSection.tab || TAB_STYLE;
    let tab = this.controls[tabName];
    if (!tab) {
      tab = this.controls[tabName] = [];
    }
    return tab;
  }
  _getCurrentSection() {
    let tab = this._getCurrentTab();
    let sectionId = this.currentSection.sectionId;
    for (let _section of tab) {
      if (this.currentSection.sectionId === _section.sectionId) {
        return _section;
      }
    }
    let section;
    section = {
      ...this.currentSection,
      controls: []
    };
    tab.push(section);

    return section;
  }

  getControls() {
    this._registerControls();
    return this.controls;
  }

  setElementAsCurrent() {
    window.altrpEditor.modules.templateDataStorage.setCurrentElement(this);
  }

  isEditor() {
    return isEditor();
  }
  getIds() {
    let ids = [this.getId()];
    this.children.map(item => {
      ids.push(item.getIds());
    });
    return ids;
  }

  getSelector() {
    return `.altrp-element${this.getId()}`;
  }
  /**
   * @param {string} settingName
   * @param {CSSRule[]} rules
   * */
  addStyles(settingName, rules) {
    let breakpoint = CONSTANTS.DEFAULT_BREAKPOINT;
    if (getCurrentScreen().name) {
      breakpoint = getCurrentScreen().name;
    }
    this.settings.styles = this.settings.styles || {};
    this.settings.styles[breakpoint] = this.settings.styles[breakpoint] || {};

    this.settings.styles[breakpoint][settingName] = {};
    rules.forEach(rule => {
      let finalSelector = rule.selector;
      finalSelector = finalSelector
        .replace(/{{ELEMENT}}/g, this.getSelector())
        .replace(/{{ID}}/g, this.getId())
        .replace(/{{STATE}}/g, getElementState().value);
      /**
       * если this.settings.styles[breakpoint][settingName] массив, то преобразуем в объект
       */
      if (_.isArray(this.settings.styles[breakpoint][settingName])) {
        this.settings.styles[breakpoint][settingName] = _.toPlainObject(
          this.settings.styles[breakpoint][settingName]
        );
      }
      this.settings.styles[breakpoint][settingName][finalSelector] =
        rule.properties;
    });
    this.updateStyles();
  }

  /**
   * @param {string} settingName
   * @param {string} breakpoint
   * */
  removeStyle(settingName, breakpoint = CONSTANTS.DEFAULT_BREAKPOINT) {
    this.settings.styles[breakpoint][settingName] = {};
    this.updateStyles();
  }

  /**
   * @param {String} styles
   * */
  setStringStyles(styles) {
    styles = styles.replace(/__selector__/g, this.getSelector());
    this.settings.stringStyles = styles;
    this.updateStyles();
  }

  /**
   * @param {BaseElement} parent
   * */
  setParent(parent) {
    if (this.parent instanceof BaseElement) {
      this.parent.deleteChild(this);
    }
    this.parent = parent;
  }

  /**
   * Сохранить данные для динамического контента
   * каждая настройка содержит в себе название настройки, имя модели, название поля модели
   * @param {{}} dynamicContent
   */
  setModelsSettings(dynamicContent) {
    this.dynamicContentSettings = this.dynamicContentSettings || [];
    let exist = false;
    this.dynamicContentSettings = this.dynamicContentSettings.map(
      _dynamicContent => {
        /**
         * Если для текущего свойства есть настройка динамического контента, то заменяем
         */
        if (
          _.isEqual(_dynamicContent.settingName, dynamicContent.settingName)
        ) {
          exist = true;
          return dynamicContent;
        } else {
          return _dynamicContent;
        }
      }
    );
    /**
     * Если для текущего свойства нет настройки динамического контента, то добавляем
     */

    if (!exist) {
      this.dynamicContentSettings.push({ ...dynamicContent });
    }
    this.component.subscribeToModels();
  }

  /**
   * Удаляет настроки динамического контента по названию настройки
   * вызывается после нажатия конпки удалить динамический контент
   * @param {string} settingName
   */
  removeModelSettings(settingName) {
    this.dynamicContentSettings = _.remove(this.dynamicContentSettings, {
      settingName
    });
  }

  /**
   * Сохраняет имя шрифта для контроллера
   *
   * @param {string} settingName
   * @param {string} fontName
   */
  addFont(settingName, fontName) {
    if (!settingName || !fontName) {
      return;
    }
    _.set(this.settings, `__altrpFonts__.${settingName}`, fontName);
  }
  /**
   * Сохраняет имя шрифта для контроллера
   *
   * @param {string} settingName
   */
  removeFont(settingName) {
    if (!settingName) {
      return;
    }
    _.unset(this.settings, `__altrpFonts__.${settingName}`);
  }

  /**
   * Получить данные динамических настроек
   * @param {string} dynamicSettingName
   * @param {{} | null} settings
   */
  setDynamicSetting(dynamicSettingName, settings) {
    if (!_.isEmpty(settings)) {
      _.set(
        this.settings,
        `altrpDynamicSetting.${dynamicSettingName}`,
        settings
      );
    } else {
      _.unset(this.settings, `altrpDynamicSetting.${dynamicSettingName}`);
    }
  }

  /**
   * Обновляем стили из настроек другого элемента
   * @param {{}} settings
   */
  pasteStylesFromSettings(settings) {
    if (_.isEmpty(settings) || !_.isObject(settings)) {
      return;
    }
    const stylesSettings = this.getStylesSettings(settings);
    const newSettings = { ..._.assign(this.settings, stylesSettings) };
    this.settings = newSettings;

    editorSetCurrentElement(this.getRoot());
    editorSetCurrentElement(this);
    this.component.setState(state => ({ ...state, settings: newSettings }));
  }

  /**
   * Удаляем лишнии свойства, оставляем только свойства стилей
   * @param {{}} settings
   */
  getStylesSettings(settings = {}) {
    const contentControllers =
      controllersManager.getControls(this.getName()).content || [];
    contentControllers.forEach(section => {
      const { controls = [] } = section;
      controls.forEach(control => {
        delete settings[control.controlId];
      });
    });
    return settings;
  }

  /**
   * Сброс стилей элементов
   */
  resetStyles() {
    let newSettings = {};
    const contentControllers =
      controllersManager.getControls(this.getName()).content || [];
    contentControllers.forEach(section => {
      const { controls = [] } = section;
      controls.forEach(control => {
        newSettings[control.controlId] = this.settings[control.controlId];
      });
    });
    const styleControllers =
      controllersManager.getControls(this.getName()).style || [];
    styleControllers.forEach(section => {
      const { controls = [] } = section;
      controls.forEach(control => {
        if (control.default) {
          newSettings[control.controlId] = control.default;
        }
      });
    });
    const advancedControllers =
      controllersManager.getControls(this.getName()).advanced || [];
    advancedControllers.forEach(section => {
      const { controls = [] } = section;
      controls.forEach(control => {
        if (control.default) {
          newSettings[control.controlId] = control.default;
        }
      });
    });

    this.settings = newSettings;
    editorSetCurrentElement(this.getRoot());
    editorSetCurrentElement(this);
    this.component.setState(state => ({ ...state, settings: newSettings }));
  }

  /**
   * Обновим все глобальные стили
   * @param guid
   * @param value
   */
  updateAllGlobals(guid, value) {
    let currentPropsList = _.get(
      this.settings,
      `global_styles_storage.${guid}`,
      []
    );
    currentPropsList.forEach(settingName => {
      // this.settings[settingName] = value;
      /**
       * child.addFont(
            this.props.controller.getSettingName(),
            value.value
          );
       */
      if (settingName.indexOf("typographic") >= 0) {
        this.addFont(settingName, value.family);
        appStore.dispatch(addFont(this.getId(), settingName, value.family));
      }
      if (settingName.indexOf("gradient-first-color:") >= 0) {
        settingName = settingName.replace("gradient-first-color:", "");
        if (
          typeof settingName == "undefined" &&
          !_.isObject(this.settings[settingName])
        ) {
          return;
        }
        let currentValue = this.settings[settingName];
        currentValue.value = currentValue.value.replace(
          currentValue.firstColor,
          value.color
        );
        currentValue.firstColor = value.color;
        value = currentValue;
      }
      if (settingName.indexOf("gradient-second-color:") >= 0) {
        settingName = settingName.replace("gradient-second-color:", "");
        if (
          typeof settingName == "undefined" &&
          !_.isObject(this.settings[settingName])
        ) {
          return;
        }
        let currentValue = this.settings[settingName];
        currentValue.value = currentValue.value.replace(
          currentValue.secondColor,
          value.color
        );
        currentValue.secondColor = value.color;
        value = currentValue;
      }
      console.log(settingName);
      this.setSettingValue(settingName, value);
    });
    this.updateStyles();
  }

  /**
   * Проверим есть ли в списке глобальных стилей стиль с определенным guid
   * @param guid
   * @return {*}
   */
  hasGlobal(guid) {
    return _.get(this.settings, `global_styles_storage.${guid}`, false);
  }

  /**
   * Добавим в список глобальных стилей свойство
   * @param guid
   * @param settingName
   */
  setGlobalStyle(guid, settingName) {
    let currentPropsList = _.get(
      this.settings,
      `global_styles_storage.${guid}`,
      []
    );
    if (currentPropsList.indexOf(settingName) === -1) {
      currentPropsList.push(settingName);
      _.set(this.settings, `global_styles_storage.${guid}`, [
        ...currentPropsList
      ]);
    }
  }

  /**
   * Удалим глобальный стиль из списка (вызвать в контроллере, если выбираем не глобальный стиль)
   * @param guid
   * @param settingName
   */
  deleteGlobalStyle(guid, settingName) {
    let currentPropsList = _.get(
      this.settings,
      `global_styles_storage.${guid}`,
      []
    );
    if (currentPropsList.indexOf(settingName) !== -1) {
      delete currentPropsList[settingName];
      _.set(this.settings, `global_styles_storage.${guid}`, [
        ...currentPropsList
      ]);
    }
  }
}
window.BaseElement = BaseElement
export default BaseElement;
