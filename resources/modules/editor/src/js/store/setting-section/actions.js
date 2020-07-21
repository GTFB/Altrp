export const SET_ACTIVE_SECTION = "SET_ACTIVE_SECTION";

export function setActiveSection(elementName, tab, sectionID) {
  return {
    type: SET_ACTIVE_SECTION,
    elementName,
    tab,
    sectionID
  }
}
