import {CHANGE_CURRENT_DATASOURCE, CLEAR_CURRENT_DATASOURCE, SET_CURRENT_DATASOURCE_LOADED} from './actions'
import AltrpModel from "../../../../../editor/src/js/classes/AltrpModel";
import {setAltrpIndex} from "../../helpers";

const defaultDataStorage = {
  
};

export function currentDataStorageReducer(dataStorage, action) {
  dataStorage = dataStorage || new AltrpModel(defaultDataStorage);
  switch (action.type) {
    case CHANGE_CURRENT_DATASOURCE:{
      let data = action.data;
      if(_.isArray(data)){
        setAltrpIndex(data);
      }
      dataStorage = _.cloneDeep(dataStorage);
      dataStorage.setProperty(action.dataStorageName, data);
    }break;
    case CLEAR_CURRENT_DATASOURCE:{
      dataStorage = new AltrpModel({});
      dataStorage.setProperty('currentDataStorageLoaded', false);
    }break;
    case SET_CURRENT_DATASOURCE_LOADED:{
      dataStorage = _.cloneDeep(dataStorage);
      dataStorage.setProperty('currentDataStorageLoaded', true);
    }break;
  }
  if(dataStorage instanceof AltrpModel){
    return dataStorage;
  }
  return new AltrpModel(dataStorage);
}