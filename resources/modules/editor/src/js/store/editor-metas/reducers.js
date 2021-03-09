import {SET_EDITOR_META} from "./actions";
import AltrpMeta from "../../classes/AltrpMeta";

const defaultMetaStore = {};

export function editorMetasReducer(state, action) {
  state = state || defaultMetaStore;
  switch (action.type) {
    case SET_EDITOR_META:{
      state = {
        ...state,
      };
      if(action.metaName){
        state[action.metaName] = AltrpMeta.clone(action.meta);
      }
    }break;
  }
  return state;
}
