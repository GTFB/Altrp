import { CHANGE_CURRENT_PAGE, CHANGE_CURRENT_PAGE_PROPERTY } from "./actions";
import AltrpModel from "../../../../../editor/src/js/classes/AltrpModel";
import convertQueryParamsToObject from "../../functions/convert-query-params-to-object";

if (typeof location === "undefined") {
  global.location = {};
}
let params = window?.__altrp_settings__?.page_params
if( ! params){
  params= convertQueryParamsToObject(document?.location?.search);
}
let hashParams = {};
if(document?.location?.hash && document?.location?.hash.indexOf('=') !== -1){
  hashParams = convertQueryParamsToObject(document?.location?.hash)
}
const defaultPage = {
  url: location?.href || "",
  title: window?.currentPage?.title || "",
  hash:document?.location?.hash,
  params,
  hashParams,
};

export function currentPageReducer(page, action) {
  page = page || defaultPage;
  switch (action.type) {
    case CHANGE_CURRENT_PAGE:
      {
        page = action.pageData;
      }
      break;
    case CHANGE_CURRENT_PAGE_PROPERTY:
      {
        page = _.clone(page);
        page.setProperty(action.propertyName, action.value);
      }
      break;
  }

  if (page instanceof AltrpModel) {
    return page;
  }
  return new AltrpModel(page);
}
