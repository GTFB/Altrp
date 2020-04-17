import store, {getCurrentElement} from '../store/store';
import {CONSTANTS} from "../helpers";
import CSSRule from "../classes/CSSRule";
import {changeTemplateStatus} from "../store/template-status/actions";

class Controller {
  constructor(data){
    this.data = data;
    this.rules = [];
    if(data.rules){
      for(let selector in data.rules){
        if(data.rules.hasOwnProperty(selector)){
          let newRule = new CSSRule(selector, data.rules[selector]);
          this.rules.push(newRule);
          if(data.default){
            newRule.insertValue(data.default);
          }
        }
      }
    }
    let currentElement = getCurrentElement();
    if(this.rules.length){
      currentElement.addStyles(this.getSettingName(), this.rules);
    }
  }
  changeValue(value){
    /**
     * @member {BaseElement} currentElement
     * */
    let currentElement = getCurrentElement();
    currentElement.setSettingValue(this.getSettingName(), value);
    this.rules.forEach(rule => {
      rule.insertValue(value);
    });
    if(this.rules.length){
      currentElement.addStyles(this.getSettingName(), this.rules);
    }
    store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_NEED_UPDATE));
  }
  /**
   * @return {string}
   * */
  getSettingName(){
    return this.data.controlId;
  }
}

export default Controller