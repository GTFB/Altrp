export const CHANGE_CURRENT_PAGE = "CHANGE_CURRENT_PAGE";
export const CHANGE_CURRENT_PAGE_PROPERTY = "CHANGE_CURRENT_PAGE_PROPERTY";

export function changeCurrentPage(pageData) {
  return {
    type: CHANGE_CURRENT_PAGE,
    pageData: pageData || {}
  };
}

export function changeCurrentPageProperty(propertyName, value) {

  return {
    type: CHANGE_CURRENT_PAGE_PROPERTY,
    propertyName,
    value,
  };
}

