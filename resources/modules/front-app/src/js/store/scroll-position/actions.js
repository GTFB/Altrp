
export const SET_SCROLL_TOP = "SET_SCROLL_TOP";
/**
 *
 * @param {{
 *  top: int
 * }} payload
 * @return {{type: string, payload: {}}}
 */
export const setScrollValue = payload => {
  if(payload.top) {

    if(window.pageUpdater){
      window.pageUpdater.startUpdating();
    }
  }
  return {
    type: SET_SCROLL_TOP,
    payload
  };
};