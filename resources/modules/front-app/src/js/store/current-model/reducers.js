import {CHANGE_CURRENT_MODEL} from './actions'
import AltrpModel from "../../../../../editor/src/js/classes/AltrpModel";

const defaultModel = {
  
};

export function currentModelReducer(model, action) {
  model = model || defaultModel;
  switch (action.type) {
    case CHANGE_CURRENT_MODEL:{
      model = action.model;
    }break;
  }
  if(model instanceof AltrpModel){
    return model;
  }
  return new AltrpModel(model);
}