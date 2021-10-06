import {CHANGE_CURRENT_MODEL} from './actions'
import AltrpModel from "../../../../../editor/src/js/classes/AltrpModel";

const defaultModel =  {...window.model_data};
defaultModel.altrpModelUpdated = true

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
