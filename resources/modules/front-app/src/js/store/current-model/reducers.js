import {CHANGE_CURRENT_MODEL} from './actions'
import AltrpModel from "../../../../../editor/src/js/classes/AltrpModel";

let defaultModel =  {...window.model_data};
defaultModel.altrpModelUpdated = true
if(_.isObject(window.route_args)){
  defaultModel = {
    ...defaultModel,
    ...window.route_args
  }
}

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
