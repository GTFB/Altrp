import store, { getCurrentElement } from "../store/store";
import { getElementSettingsSuffix } from "../helpers";
import CONSTANTS from "../consts";
import CSSRule from "../classes/CSSRule";
import { changeTemplateStatus } from "../store/template-status/actions";
import { controllerValue } from "../store/controller-value/actions";
import RepeaterController from "../components/controllers/RepeaterController";

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
          let value = currentElement.getSettings(this.getSettingName());
          if (value) {
            newRule.insertValue(value);
          }
        }
      }
    }

    if (this.data.prefixClass) {
      currentElement.setCssClass(
        this.getSettingName(),
        this.data.prefixClass +
          currentElement.getSettings(this.getSettingName())
      );
    }
    if (this.rules.length) {
      currentElement.addStyles(this.getSettingName(), this.rules);
    }
  }

  /**
   * Изменение значения либо в текущем элементе, либо в репитере
   * @param {*} value
   */
  changeValue(value) {
    /**
     * Если значение контроллера объект, то создаем его копию
     */
    if (_.isObject(value)) {
      value = _.cloneDeep(value);
    }
    /**
     * @member {BaseElement} currentElement
     * */
    let currentElement = getCurrentElement();
    if (!this.data.repeater) {
      currentElement.setSettingValue(this.getSettingName(), value);
      this.rules.forEach(rule => {
        rule.insertValue(value);
      });
      if (this.rules.length) {
        value
          ? currentElement.addStyles(this.getSettingName(), this.rules)
          : currentElement.removeStyle(this.getSettingName());
      }
      /**
       *
       * Вызываем currentElement setCssClass в случае если есть this.data.prefixClass
       */
      if (this.data.prefixClass) {
        currentElement.setCssClass(
          this.getSettingName(),
          this.data.prefixClass + value
        );
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
        value
      );
    }
    if (this.getSettingName() === "element_css_editor") {
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
      let [controlId, comparedValue] = condition;
      let negative = controlId.indexOf("!") >= 0;
      controlId = controlId.replace("!", "");
      let _value = getCurrentElement().getSettings(controlId);
      if (this.data.repeater && this.data.itemIndex !== undefined) {
        let item = this.data.repeater.getItem(this.data.itemIndex);
        _value = _.get(item, controlId);
      }
      if (!_.isArray(_value)) {
        _value = [_value];
      } else if (_value.length === 0) {
        show = false;
      }
      _value.forEach(value => {
        if (!show) {
          return;
        }
        if (_.isString(comparedValue) || _.isBoolean(comparedValue)) {
          show = value !== comparedValue ? negative : !negative;
        }
        if (_.isArray(comparedValue)) {
          show = comparedValue.indexOf(value) === -1 ? negative : !negative;
        }
      });
    });
    return show;
  }

  /**
   * Получеаем название свойства добавив суффикс
   * @return {string}
   * */
  getSettingName() {
    /**
     * Если css редактор, то добавляем суффикс
     */
    if (this.data.controlId === "element_css_editor") {
      return "element_css_editor";
    }
    return this.data.controlId + getElementSettingsSuffix(this);
  }
}

export default Controller;
