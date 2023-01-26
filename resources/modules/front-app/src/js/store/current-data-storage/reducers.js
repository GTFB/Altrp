import {
  CHANGE_CURRENT_DATASOURCE,
  CLEAR_CURRENT_DATASOURCE,
  SET_CURRENT_DATASOURCE_LOADED,
  SET_CURRENT_DATASOURCE_LOADING, UPDATE_WITH_DEFAULT
} from './actions'
import AltrpModel from "../../../../../editor/src/js/classes/AltrpModel";
import {setAltrpIndex} from "../../helpers";

const defaultDataStorage = {
  ...window.altrpPreloadedDatasources
};

export function currentDataStorageReducer(dataStorage, action) {
  dataStorage = dataStorage || new AltrpModel(defaultDataStorage);
  switch (action.type) {
    case UPDATE_WITH_DEFAULT :{
      dataStorage = new AltrpModel({
        ...window.altrpPreloadedDatasources
      })
    }break;
    case CHANGE_CURRENT_DATASOURCE:{
      let data = action.data;
      if(_.isArray(data)){
        setAltrpIndex(data);
      }
      dataStorage = _.cloneDeep(dataStorage);
      dataStorage.setProperty(action.dataStorageName, data);

      if(action.options) {
        dataStorage.setProperty(`_options.${action.dataStorageName}`, action.options)
      }
    }break;
    case CLEAR_CURRENT_DATASOURCE:{
      dataStorage = new AltrpModel({});
      dataStorage.setProperty('currentDataStorageLoaded', false);
    }break;
    case SET_CURRENT_DATASOURCE_LOADED:{
      dataStorage = _.cloneDeep(dataStorage);
      dataStorage.setProperty('currentDataStorageLoaded', true);
    }break;
    case SET_CURRENT_DATASOURCE_LOADING:{
      dataStorage = _.cloneDeep(dataStorage);
      dataStorage.setProperty('currentDataStorageLoaded', false);
    }break;
  }
  if(dataStorage instanceof AltrpModel){
    return dataStorage;
  }
  return new AltrpModel(dataStorage);
}
