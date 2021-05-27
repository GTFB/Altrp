import {ADD_MENU, } from './actions'
import {mbParseJSON} from "../../helpers";

const defaultMenus = window.altrpMenus;
/**
 *
 * @param {[]} menus
 * @param {{
 *  components: {},
 *  type: string
 * }}  action
 */
export function menusReducer(menus = defaultMenus, action) {
  switch (action.type) {
    case ADD_MENU:{
      if(menus.find(menu=>menu.guid === action.menu.guid)){
        return menus;
      }
      menus = [...menus];
      menus.push(action.menu)
    }break;
  }

  return menus;
}
