export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

export function setCurrentPage(pageData){
  return {
    type: SET_CURRENT_PAGE,
    pageData
  }
}
