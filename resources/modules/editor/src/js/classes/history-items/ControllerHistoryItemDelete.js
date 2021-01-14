import BaseHistoryItem from "./BaseHistroryItem";

/**
 * @class ControllerHistoryItemDelete
 */
//откат удаления
class ControllerHistoryItemDelete extends BaseHistoryItem {
  constructor(element, elementIndex){
    const data = {
      element,
      elementIndex,
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

export default ControllerHistoryItemDelete