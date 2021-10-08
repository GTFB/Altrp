import { CHANGE_CURRENT_PAGE, CHANGE_CURRENT_PAGE_PROPERTY } from "./actions";
import AltrpModel from "../../../../../editor/src/js/classes/AltrpModel";
import convertQueryParamsToObject from "../../functions/convert-query-params-to-object";

if (typeof location === "undefined") {
  global.location = {};
}

const defaultPage = {
  url: location?.href || "",
  title: window?.currentPage?.title || "",
  params: convertQueryParamsToObject(document.location.search),
};

export function currentPageReducer(page, action) {
  page = page || defaultPage;
  switch (action.type) {
    case CHANGE_CURRENT_PAGE:
      {
        page = action.page;
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
