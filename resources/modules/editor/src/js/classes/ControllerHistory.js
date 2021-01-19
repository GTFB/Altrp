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
          this.restoreDelete(restoreElement.data.element, restoreElement.data.parent, 2);
          break;
        case 'EDIT':
          this.restoreEdit(); 
          break;
      }
    }
  }

  restoreDelete(element, parent, elementIndex) {
    console.log(parent)
    parent.appendChild(element);
    console.log('restoreDelete')
    store.dispatch(deleteLastHistoryStoreItems(2))
  }

  restoreEdit(element, oldValue) {
    // element.setSettings(oldValue)

    store.dispatch(deleteLastHistoryStoreItems(2))
  }

  restoreAdd(element) {
    element.deleteThisElement();

    store.dispatch(deleteLastHistoryStoreItems(2));
  }
}


export default ControllerHistory;