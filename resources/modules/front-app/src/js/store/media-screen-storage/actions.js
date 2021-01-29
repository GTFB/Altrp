export const SET_CURRENT_SCREEN = 'SET_CURRENT_SCREEN';

/**
 * Меняем текущий экран из списка CONSTANTS.SCREENS
 *
 */
export function setCurrentScreen(screen){
  return {
    type: SET_CURRENT_SCREEN,
    screen,
  };
}

