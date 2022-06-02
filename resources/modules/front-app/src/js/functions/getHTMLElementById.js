/**
 * Вернет HTML элемент React компонента, у которого id = elementId
 * @param {string} elementId
 * @return {null | HTMLElement}
 */
export default function getHTMLElementById(elementId = "") {
  let HTMLElement = null;
  if (!elementId || !elementId.trim()) {
    return HTMLElement;
  }
  elementId = elementId.trim();
  HTMLElement = document.getElementById(elementId)
  if (HTMLElement){
    return HTMLElement
  }
  appStore.getState().elements.forEach(el => {
    if (!el.elementWrapperRef.current) {
      return;
    }
    if (!el.elementWrapperRef.current.id) {
      return;
    }
    if (
      el.elementWrapperRef.current.id
        .toString()
        .split(" ")
        .indexOf(elementId) !== -1
    ) {
      HTMLElement = el.elementWrapperRef.current;
    }
  });
  return HTMLElement;
}
