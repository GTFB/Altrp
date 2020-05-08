import {SET_MODAL_SETTINGS, TOGGLE_MODAL} from "./actions";

const defaultState = {
  fields: [],
  active: false,
  title: 'Modal',
  submitButton: 'Submit',
  submit: function(data){
    console.log(data);
  },
  success: (res)=>{
    console.log(res);
  }
};

export function modalSettingsReducer(state, action) {
  state = state || defaultState;

  switch (action.type){
    case SET_MODAL_SETTINGS:{
      state = {
        fields: action.fields,
        title: action.title || defaultState.title,
        submit: action.submit || defaultState.submit,
        submitButton: action.submitButton || defaultState.submitButton,
        success: action.success || defaultState.success,
        active: state.active,
      };
    }break;
    case TOGGLE_MODAL:{
      state = {
        ...state,
        active: ! state.active,
      };
    }break;
  }
  return state;
}