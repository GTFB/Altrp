import AltrpModel from "./AltrpModel";
import store from "../store/store";
import { undoHistoryStore, redoHistoryStore } from "../store/history-store/actions";

class ControllerHistory extends AltrpModel {

  undo() {
    let current = appStore.getState().historyStore.current;
    let history = _.cloneDeep(appStore.getState().historyStore.history);
    if(current >= 0) {
      let restoreElement = history[current];

      switch(restoreElement.type) {
        case 'ADD':
          console.log('ADD')
          this.restoreAdd(restoreElement.data.element);
          break;
        case 'DELETE':
          console.log('DELETE')
          this.restoreDelete(restoreElement.data.element, restoreElement.data.parent, restoreElement.data.index);
          break;
        case 'EDIT':
          console.log('EDIT')
          this.restoreEdit(restoreElement.data.element, restoreElement.data.settingName, restoreElement.data.oldValue); 
          break;
      }
      store.dispatch(undoHistoryStore(1));
    }
  }

  redo() {
    let current = appStore.getState().historyStore.current;
    let history = _.cloneDeep(appStore.getState().historyStore.history);
    if(history.length - 1 > current) {
      let restoreElement = history[current + 1];
      switch(restoreElement.type) {
        case 'ADD':
          this.restoreDelete(restoreElement.data.element, restoreElement.data.parent, restoreElement.data.index);
          break;
        case 'DELETE':
          this.restoreAdd(restoreElement.data.element);
          break;
        case 'EDIT':
          this.restoreEdit(restoreElement.data.element, restoreElement.data.settingName, restoreElement.data.newValue); 
          break;
      }
      store.dispatch(redoHistoryStore(1));
    }
  }

  restoreDelete(element, parent, index) {
    console.log('restore delete')
    parent.restoreChild(index, element);
  }

  restoreEdit(element, settingName, value) {
    console.log('restore edit')
    element.setSettingValue(settingName, value, true);
  }

  restoreAdd(element) {
    console.log('restore add')
    element.parent.deleteChild(element, true);
  }
}


export default ControllerHistory;