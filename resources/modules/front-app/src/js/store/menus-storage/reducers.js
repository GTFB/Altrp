import {ADD_MENU, ADD_MENUS} from './actions'
import {mbParseJSON} from "../../helpers";

let menusJSON =  window.__altrp_settings__?.altrpMenus || [];

menusJSON = menusJSON.map(menu => {
  menu.children = mbParseJSON(menu.children);

  return menu;
})

const defaultMenus = menusJSON;
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
    case ADD_MENUS:{
      menus = [...action.menus];
    }break;
  }

  return menus;
}
