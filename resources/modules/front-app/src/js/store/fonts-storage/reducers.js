import {ADD_FONT, REMOVE_FONT} from './actions'
import AltrpModel from "../../../../../editor/src/js/classes/AltrpModel";

const defaultFontsStorage = new AltrpModel({
  
});
/**
 *
 * @param {AltrpModel} fontsStorage
 * @param {{}}  action
 *   {
 *     type: {string},
 *     metaValue: {},
 *     metaName: {string},
 *   }
 */
export function fontsReducer(fontsStorage = defaultFontsStorage, action) {
  switch (action.type) {
    case ADD_FONT:{
      const{
        elementId,
        controllerName,
        fontName,
      } = action;
      fontsStorage.setProperty(`${elementId}_${controllerName}`, fontName);
      fontsStorage = _.clone(fontsStorage);
    }break;
    case REMOVE_FONT:{
      const{
        elementId,
        controllerName,
      } = action;
      fontsStorage.unsetProperty(`${elementId}_${controllerName}`);
      fontsStorage = _.clone(fontsStorage);
    }break;
  }

  return fontsStorage;
}
