export const ADD_MENU = 'ADD_MENU';
export const ADD_MENUS = 'ADD_MENUS';
/**
 *
 * @param {{}} menu
 * @return {{}} -
 *   {
 *     type: {string},
 *     menu: {},
 *   }
 */
export function addMenu(menu) {
  return {
    type: ADD_MENU,
    menu,
  };
}

/**
 *
 * @param {[{}]} menus
 * @return {{}} -
 *   {
 *     type: {string},
 *     menu: {},
 *   }
 */
export function addMenus(menus) {
  return {
    type: ADD_MENUS,
    menus,
  };
}
