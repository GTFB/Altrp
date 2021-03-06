import {SET_CURRENT_SCREEN} from './actions'
import CONSTANTS from "../../../../../editor/src/js/consts";

const defaultScreen = CONSTANTS.SCREENS.find(screen=>{
  if(! screen.fullMediaQuery){
    return false;
  }
  let query = screen.fullMediaQuery;
  query = query.replace('@media', '');
  return window.matchMedia(query).matches;
}) || CONSTANTS.SCREENS[0];


export function mediaScreenReducer(currentScreen, action) {
  currentScreen = currentScreen || defaultScreen;
  switch (action.type) {
    case SET_CURRENT_SCREEN:{
      currentScreen = action.screen;
    }
      break;
  }
  return currentScreen;
}