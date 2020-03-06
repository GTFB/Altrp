import {TAB_CONTENT, TAB_STYLE} from "../modules/ControllersManager";
import {isEditor} from "../../helpers";

class BaseElement {

  constructor(){
    this.settings = {};
    this.controls = {};
    this.controlsIds = [];
    this.controllersRegistered = false;
    this.children = [];
    this.componentClass = window.elementsManager.getComponentClass(this.getName());
    this.initiatedDefaults = null;
  }

  getId(){
    if(! this.id){
      this.id = BaseElement.generateId();
    }
    return this.id;
  }

  getName(){
    return this.constructor.getName();
  }

  getType(){
    return this.constructor.getType();
  }

  getTitle(){
    return this.constructor.getTitle();
  }

  static generateId(){
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  toObject(){
    if(!this.component){
      throw 'Element Must Composites with Some Component';
    }
    let data = {data:{}};
    data.id = this.getId();
    data.name = this.getName();
    data.data.settings = this.settings;
    let children = this.getChildrenForImport();
    if(children){
      data.data.children = children;
    }
    return data;
  }

  getChildrenForImport() {
    if(! this.children.length){
      return[];
    }
    let children = [];
    for( let _c of this.children ){
      children.push(_c.toObject())
    }
    return children;
  }

  getChildren(){
    if(! this.children.length){
      return[];
    }
    return this.children;
  }

  appendChild(child){
    this.children.push(child);
    if(this.component && typeof this.component.setChildren === 'function'){
      this.component.setChildren(this.children);
    }
  }

  insertAfter(childId, child){

  }

  getSettings(settingName){
    this._initDefaultSettings();
    if(! settingName){
      return this.settings;
    }
    if(this.settings[settingName] === undefined){
      let control = window.controllersManager.getElementControl(this.getName(), settingName);
      if(! control || !control.default){
        return null;
      }
      this.settings[settingName] = control.default;
    }
    return this.settings[settingName];
  }

  _initDefaultSettings(){
    if(!window.controllersManager || this.initiatedDefaults){
      return;
    }
    let controls = window.controllersManager.getControls(this.getName());

    for (let tabName in controls){
      if(controls.hasOwnProperty(tabName)){
        if(!controls[tabName].length){
          continue;
        }
        for (let section of controls[tabName]) {
          if(!section.controls.length){
            continue;
          }
          for (let control of section.controls){
            if(control.default !== undefined
                && this.settings[control.controlId] === undefined){
              this.settings[control.controlId] = control.default;
            }
          }
        }
      }
    }
  }

  setSettingValue(settingName, value){
    this.settings[settingName] = value;
    this.component.changeSetting(settingName, value);
  }

  _registerControls(){
    this.controllersRegistered = true;
  }
   /**
    * @param {string} sectionId
    * @param {object} args{
    *   @member {string} tab
    *   @member {string} label
    * }
    * */
  startControlSection(sectionId, args){
     if(this.controlsIds.indexOf(sectionId) !== -1){
       throw 'Control with id' + sectionId + ' Already Exists in ' + this.getName();
     }
    this.currentSection = {...args, sectionId};
     this.controlsIds.push(sectionId);
   }

  endControlSection(){
    this.currentSection = null;
  }


  /**
   * @param {string} controlId
   * @param {object} args{
   *   @member {string} type
   *   @member {any} default
   * }
   * */
  addControl(controlId, args){
    if(!this.currentSection){
      throw 'Controls Can only be Added Inside the Section!'
    }
    if(this.controlsIds.indexOf(controlId) !== -1){
      throw 'Control with id' + controlId + ' Already Exists in ' + this.getName();
    }

    let section = this._getCurrentSection();

    section.controls.push({...args, controlId});
    window.controllersManager.setControlsCache(this.getName() + controlId, {...args, controlId});
    this.controlsIds.push(controlId);
  }

  _getCurrentTab(){
    let tabName = this.currentSection.tab || TAB_STYLE;
    let tab = this.controls[tabName];
    if(! tab){
      tab = this.controls[tabName] = [];
    }
    return tab;
  }
  _getCurrentSection(){
    let tab = this._getCurrentTab();
    let sectionId = this.currentSection.sectionId;
    for(let _section of tab){
      if(this.currentSection.sectionId=== _section.sectionId){
         return _section
      }
    }
    let section ;
    section = {
      ...this.currentSection,
      controls: [],
    };
    tab.push(section);

    return section;
  }

  getControls(){
    this._registerControls();
    return this.controls;
  }

  setElementAsCurrent(){
    window.altrpEditor.modules.templateDataStorage.setCurrentElement(this);
  }

  isEditor(){
    return isEditor();
  }
}

export default BaseElement