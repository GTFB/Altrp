import BaseHistoryItem from "./BaseHistroryItem";

/**
 * @class ControllerHistoryItemAdd
 */
//откат добавления
class ControllerHistoryItemAdd extends BaseHistoryItem {
  constructor(element){
    const data = {
      element,
    };
    super(data);
  }
  restore(){
    const elementId = this.getProperty('elementId');
    const controllerId = this.getProperty('controllerIm');
    const oldValue = this.getProperty('oldValue');
    const element = getTemplateDataStorage().getElementById(elementId);
    element.setSettings(controllerId, oldValue);
    super.restore();
  }
}

export default ControllerHistoryItemAdd