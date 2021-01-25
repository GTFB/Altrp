import AltrpModel from "./AltrpModel";
import store from "../store/store";
import { deleteLastHistoryStoreItems } from "../store/history-store/actions";


class ControllerHistory extends AltrpModel {

  restore() {
    let index = appStore.getState().historyStore.indexOf(this);
    let newHistoryStore = [...appStore.getState().historyStore];
    console.log(newHistoryStore)
    newHistoryStore.splice(0, index + 1);

    if(!(newHistoryStore.length === 0)) {
      let restoreElement = newHistoryStore.pop();

      switch(restoreElement.type) {
        case 'ADD':
          this.restoreAdd(restoreElement.data.element);
          break;
        case 'DELETE':
          this.restoreDelete(restoreElement.data.element, restoreElement.data.parent, restoreElement.data.index);
          break;
        case 'EDIT':
          this.restoreEdit(restoreElement.data.element, restoreElement.data.oldValue); 
          break;
      }
    }
  }

  restoreDelete(element, parent, index) {
    console.log('restore delete')
    parent.restoreChild(index, element);
    store.dispatch(deleteLastHistoryStoreItems(1));
  }

  restoreEdit(element, oldValue) {
    console.log('restore edit')
    element.setSettingValue(oldValue.settingName, oldValue.value, true);

    store.dispatch(deleteLastHistoryStoreItems(1));
  }

  restoreAdd(element) {
    console.log('restore add')
    element.parent.deleteChild(element, true);

    store.dispatch(deleteLastHistoryStoreItems(1));
  }
}


export default ControllerHistory;