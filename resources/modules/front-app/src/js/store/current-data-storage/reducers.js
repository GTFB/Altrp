import {CHANGE_CURRENT_DATASOURCE, CLEAR_CURRENT_DATASOURCE} from './actions'
import AltrpModel from "../../../../../editor/src/js/classes/AltrpModel";

const defaultDataStorage = {
  
};

export function currentDataStorageReducer(dataStorage, action) {
  dataStorage = dataStorage || new AltrpModel(defaultDataStorage);
  switch (action.type) {
    case CHANGE_CURRENT_DATASOURCE:{
      let data = action.data;
      dataStorage.setProperty(action.dataStorageName, data);
      dataStorage = _.cloneDeep(dataStorage);
    }break;
    case CLEAR_CURRENT_DATASOURCE:{
      dataStorage = {};
    }break;
  }
  if(dataStorage instanceof AltrpModel){
    return dataStorage;
  }
  return new AltrpModel(dataStorage);
}