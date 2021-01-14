import BaseHistoryItem from "./BaseHistroryItem";

/**
 * @class ControllerHistoryItemChange
 */
//откат изменений 
class ControllerHistoryItemChange extends BaseHistoryItem {
  constructor(elementId, controllerIm, oldValue){
    const data = {
      elementId,
      controllerIm,
      oldValue,
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

export default ControllerHistoryItemChange