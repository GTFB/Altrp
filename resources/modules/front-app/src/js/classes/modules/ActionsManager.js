/**
 * @class ActionsManager
 * Класс хранит действия для виджетов и вызывает их последовательно в порядке полученного списка
 * @member {} data - где хранятся действия виджета сгруппированные по типу события {
 *  widgetId:{
 *    eventName: []
 *  }
 * }
 */
import AltrpAction from "../AltrpAction";
import AltrpModel from "../../../../../editor/src/js/classes/AltrpModel";
import isEditor from "../../functions/isEditor"

class ActionsManager extends AltrpModel{
  /**
   * Регистрирует действия для определенного виджета
   * @param {string} widgetId
   * @param {array} actions
   * @param {string} eventName
   * @param {FrontElement | null} element
   * @param {*} context
   */
  registerWidgetActions(widgetId, actions = [], eventName = 'click', element = null, context = null ){
    if((! actions) || ! actions.length){
      return null;
    }
    actions = actions.filter(a=>a.type).map(a=>{
      return new AltrpAction(a, widgetId, element);
    });
    return this.setProperty(`actions.${widgetId}.${eventName}`, actions);
  }

  /**
   * удаляет все действия виджета
   * @param {string} widgetId
   */
  unregisterWidgetActions(widgetId){
    return this.unsetProperty(`actions.${widgetId}`)
  }

  /**
   * Вызывает все зарегистрированные действия определенного типа для виджета
   * @param {string} widgetId
   * @param {string} eventName
   * @param {[]} preventedActions
   * @param {FrontElement} element
   * @return {Promise<void>}
   */
  async callAllWidgetActions(widgetId, eventName = 'click', preventedActions, element){
    if(isEditor()){
      return
    }
    if(this.getProperty(`widget.statuses.${widgetId}.${eventName}`) === 'inAction'){
      return
    }
    this.setProperty(`widget.statuses.${widgetId}.${eventName}`, 'inAction')
    preventedActions = preventedActions || [];
    let actions = preventedActions;
    const errors = [];
    actions = actions.map(a=> new AltrpAction(a, widgetId, element))
    // if(! actions.length && preventedActions.length && element){
    //   this.registerWidgetActions(widgetId, preventedActions, eventName, element);
    //   actions = this.getProperty(`actions.${widgetId}.${eventName}`, []);
    // }
    for (let action of actions){
      try {
        let result = await action.doAction();
        if(! result.success){
          if(result.error){
            console.error(result.error);
            errors.push(result.error);
          }
          break;
        }
      } catch(error){
        errors.push(error);
        console.error(error);
      }
    }
    this.setProperty(`widget.statuses.${widgetId}.${eventName}`, 'noAction')
    if (errors.length){
      return {
        success: false,
        errors
      }
    }
    return {success: true};
  }
}

/**
 *
 * @type {ActionsManager}
 */
window.actionsManager = new ActionsManager;
export default window.actionsManager
