import {SET_COMPONENTS, } from './actions'

const defaultComponents = {};
/**
 *
 * @param {{}} components
 * @param {{
 *  components: {},
 *  type: string
 * }}  action
 */
export function componentsReducer(components = defaultComponents, action) {
  switch (action.type) {
    case SET_COMPONENTS:{
      components = action.components;
    }break;
  }

  return components;
}
