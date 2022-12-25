import {CHANGE_FORM_FIELD_VALUE, CLEAR_FORM_FIELD_VALUE} from './actions'

const defaultState = {

};

export function formsStoreReducer(state, {type, formId, fieldName, value, changedField}) {
  state = state || defaultState;
  switch (type) {
    case CHANGE_FORM_FIELD_VALUE:{
      if(_.get(state, [formId, fieldName]) !== value){
        state = _.cloneDeep(state);
        state.changedField = changedField;
        _.set(state, [formId, fieldName], value);
      }
    }break;
    case CLEAR_FORM_FIELD_VALUE:{
      if(formId){
        console.log(...arguments);
        state = _.cloneDeep(state);
        _.set(state, [formId], {});
      } else {
        state = {};
      }
    }break;
  }
  return state;
}
