import AltrpModel from "./AltrpModel";
import store from "../store/store";
import { undo } from "../store/history-store/actions";


class ControllerHistory extends AltrpModel {

  restore() {
    console.log('historyStore: ', appStore.getState().historyStore.history);
    console.log('current: ', appStore.getState().historyStore.current);

    if(!(appStore.getState().historyStore.history.length === 0)) {
      let current = appStore.getState().historyStore.current;
      let restoreElement = appStore.getState().historyStore.history[current];

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
    store.dispatch(undo(1));
  }

  restoreEdit(element, oldValue) {
    console.log('restore edit')
    element.setSettingValue(oldValue.settingName, oldValue.value, true);

    store.dispatch(undo(1));
  }

  restoreAdd(element) {
    console.log('restore add')
    element.parent.deleteChild(element, true);

    store.dispatch(undo(1));
  }
}


export default ControllerHistory;