import AltrpModel from "../../../../editor/src/js/classes/AltrpModel";
/**
 * Класс представляющий действия на странице
 * @link https://docs.google.com/document/d/1v8Hm1DLkqqwzBeISd8-UvgTqscVxQPtBUtKqBrH1HaU/edit#
 * @class Action
 */
class Action extends AltrpModel{
  /**
   *
   * @return {*}
   */
  getType(){
    return this.getProperty('type');
  }
}

export default Action