import {SET_ACE} from "./actions";

const defaultState = {
  AceEditor: null
};

export function aceEditorReducer(state, action) {
  state = state || defaultState;
  switch (action.type){
    case SET_ACE:{
      state = {
        AceEditor: action.AceEditor
      };
    }break;
  }
  return state;
}