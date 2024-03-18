import { SET_AREAS,} from "./actions";

let defaultAreas = [];
if(window['h-altrp']){
  defaultAreas = window.page_areas.map(a=>  window.altrpHelpers.Area.areaFactory(a));
}
export function areasReducer(areas, action) {
  areas = areas || defaultAreas;
  switch (action.type) {
    case SET_AREAS: {
      areas = action.areas;
    }
    break;
  }
  return areas;
}
