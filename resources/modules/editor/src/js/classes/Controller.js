import store, { getCurrentElement, getElementState } from '../store/store';
import {CONSTANTS, getElementSettingsSuffix} from "../helpers";
import CSSRule from "../classes/CSSRule";
import { changeTemplateStatus } from "../store/template-status/actions";
import { controllerValue } from "../store/controller-value/actions";

/**
 * Класс-контроллер
 * @member {object} data
 * @property {RepeaterController} data.repeater
 */
class Controller {
  constructor(data) {
    let currentElement = getCurrentElement();
    this.data = data;
    this.rules = [];
    if (data.rules) {
      for (let selector in data.rules) {
        if (data.rules.hasOwnProperty(selector)) {
          let newRule = new CSSRule(selector, data.rules[selector]);
          this.rules.push(newRule);
          let value = currentElement.getSettings(this.getSettingName() + getElementSettingsSuffix());
          if (value) {
            newRule.insertValue(value);
          }
        }
      }
    }
    if (this.rules.length) {
      currentElement.addStyles(this.getSettingName() + getElementSettingsSuffix(), this.rules);
    }
  }

  /**
   * Изменение значения либо в текущем элементе либо в репитере
   * @param {*} value
   */
  changeValue(value) {
    /**
     * @member {BaseElement} currentElement
     * */
    let currentElement = getCurrentElement();
    if (!this.data.repeater) {
      currentElement.setSettingValue(this.getSettingName() + getElementSettingsSuffix(), value);
      this.rules.forEach(rule => {
        rule.insertValue(value);
      });
      if (this.rules.length) {

        value ? currentElement.addStyles(this.getSettingName() + getElementSettingsSuffix(), this.rules)
          : currentElement.removeStyle(this.getSettingName() + getElementSettingsSuffix());
      }
      store.dispatch(controllerValue(value, this.getSettingName()));

    } else {

      /**
       * @type {RepeaterController}
       * @public
       */
      this.data.repeater.changeValue(
        this.data.itemIndex,
        this.data.controlId,
        value);
    }
    if (this.getSettingName() === 'element_css_editor') {
      currentElement.setStringStyles(value);
    }
    store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_NEED_UPDATE));
  }

  /**
   * Проверяем нужно ли контроллер отрисовывать
   * @return {boolean}
   */
  isShow() {
    if (!this.data.conditions) {
      return true;
    }
    /**
     * как работает метод toPairs
     * @link https://lodash.com/docs/4.17.15#toPairs
     */
    let conditionPairs = _.toPairs(this.data.conditions);
    let show = true;
    conditionPairs.forEach(condition => {
      let [controlId, value] = condition;
      if (getCurrentElement().getSettings(controlId) !== value) {
        show = false;
      }
    });
    return show;
  }

  /**
   * @return {string}
   * */
  getSettingName() {
    return this.data.controlId;
  }
}

export default Controller
