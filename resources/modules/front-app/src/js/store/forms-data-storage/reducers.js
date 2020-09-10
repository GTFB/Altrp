import {CHANGE_FORM_FIELD_VALUE} from './actions'

const defaultState = {

};

export function formsStoreReducer(state, {type, formId, fieldName, value}) {
  state = state || defaultState;
  switch (type) {
    case CHANGE_FORM_FIELD_VALUE:{
      if(_.get(state, [formId, fieldName]) !== value){
        state = _.cloneDeep(state);
        _.set(state, [formId, fieldName], value);
      }

    }break;
  }
  return state;
}