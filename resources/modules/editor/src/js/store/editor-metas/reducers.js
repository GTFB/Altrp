import {SET_EDITOR_META} from "./actions";
import AltrpMeta from "../../classes/AltrpMeta";

const defaultMetaStore = {
  altrp_themes: new AltrpMeta('altrp_themes', {
    currentTheme: altrp?.altrpThemes[0]?.name,
    altrpThemes: altrp?.altrpThemes
} )
};

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
