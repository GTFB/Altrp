import store from "../store/store";
import {addNode, filterNode} from "../store/node-store/action";


class AltrpCustomizer {


  addNode = (nodeObj) => {
    store.dispatch(addNode(nodeObj))
  }

  filterNodes = (func) => {
    store.dispatch(filterNode(func))
  }
}

export default AltrpCustomizer;
