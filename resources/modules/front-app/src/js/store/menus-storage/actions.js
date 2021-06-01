export const ADD_MENU = 'ADD_MENU';
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
