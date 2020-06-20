import React, {Component} from "react";
import {CONTROLLER_TEXT} from "../modules/ControllersManager";

class ControlStack extends Component {

  /**
   * @param {string} controlId
   * @param {object} args
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