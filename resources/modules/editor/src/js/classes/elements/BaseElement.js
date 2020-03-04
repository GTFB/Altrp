import {TAB_CONTENT, TAB_STYLE} from "../modules/ControllersManager";

class BaseElement {

  constructor(){
    this.settings = {};
    this.controls = {};
    this.controlsIds = [];
    this.controllersRegistered = false;
    this.children = [];
    this.componentClass = window.elementsManager.getComponentClass(this.getName())
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
    let children = this.getChildren();
    if(children){
      data.data.children = children;
    }
    return data;
  }

  getChildren() {
    if(! this.children.length){
      return;
    }
    let children = [];
    for( let _c of this.children ){
      children.push(_c.toObject())
    }
    return children;
  }

  appendChild(child){
    this.children.push(child);
  }

  insertAfter(childId, child){

  }

  getSettings(settingName){
    if(! settingName){
      return this.settings;
    }
    if(! this.settings[settingName]){
      return null;
    }
    return this.settings[settingName];
  }

  setSettingValue(settingName, value){
    // if(! this.settings[settingName]){
    //   this.settings[settingName] = new ElementSettings(settingName);
    // }
    this.settings[settingName] = value;
    this.component.changeSetting(settingName, value);
  }

  _registerControls(){
    this.controllersRegistered = true;
  }
  getControllers(tab){
    // this._registerControls();
    // return this.controllers[tab];
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
}

export default BaseElement