import {ADD_RESPONSE_DATA, CLEAR_ALL_RESPONSE_DATA} from './actions'
import AltrpModel from "../../../../../editor/src/js/classes/AltrpModel";
import {setAltrpIndex} from "../../helpers";

const defaultResponsesStorage = {
  
};

export function responsesStorageReducer(responsesStorage, action) {
  responsesStorage = responsesStorage || new AltrpModel(defaultResponsesStorage);
  switch (action.type) {
    case ADD_RESPONSE_DATA:{
      let data = action.data;
      if(_.isArray(data)){
        setAltrpIndex(data);
      }
      responsesStorage = _.cloneDeep(responsesStorage);
      responsesStorage.setProperty(action.formId, data);
    }break;
    case CLEAR_ALL_RESPONSE_DATA:{
      responsesStorage = new AltrpModel({});
    }break;
  }
  if(responsesStorage instanceof AltrpModel){
    return responsesStorage;
  }
  return new AltrpModel(responsesStorage);
}