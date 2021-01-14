import AltrpModel from "../AltrpModel";

/**
 * @class BaseHistoryItem
 */
class BaseHistoryItem extends AltrpModel {

  restore(){
    let index  = appStore.getState().historyStore.indexOf(this);
    let newHistoryStore = [...appStore.getState().historyStore];
    newHistoryStore.splice(0, index + 1);
  }
}

export default BaseHistoryItem;