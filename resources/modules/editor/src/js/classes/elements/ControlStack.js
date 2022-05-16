import React, {Component} from "react";
import {CONTROLLER_TEXT} from "../modules/ControllersManager";
import FrontElement from "../../../../../front-app/src/js/classes/FrontElement";

class ControlStack extends FrontElement {

  constructor(data){
    super(data)
  }
  /**
   * @param {string} controlId
   * @param {{
   *   [type]: string,
   *   [label]: string,
   *   [description]: string,
   *   [units]: array,
   *   [options]: array,
   *   [conditions]: object,
   *   [conditionsCallback]: function,
   *   [default]: any,
   *   [stateless]: boolean,
   *   [responsive]: boolean,
   * }} args
   * */
  addControl(controlId, args){
    if(!this.currentSection){
      throw 'Controls Can only be Added Inside the Section!'
    }
    if(this.controlsIds.indexOf(controlId) !== -1){
      throw 'Control with id \'' + controlId + '\' Already Exists in ' + this.getName();
    }

    let section = this._getCurrentSection();

    let defaults = {
      type: CONTROLLER_TEXT,
    };

    section.controls.push({...defaults, ...args, controlId});
    window.controllersManager.setControlsCache(this.getName() + controlId, {...args, controlId});
    this.controlsIds.push(controlId);
  }
}

export default ControlStack
