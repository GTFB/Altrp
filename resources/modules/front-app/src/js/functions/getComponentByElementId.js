
/**
 * Вернет HTML  React компонент, у которого elementWrapperRef.current.id = elementId
 * @param {string} elementId
 * @return {null | HTMLElement}
 */
export default function getComponentByElementId(elementId = "") {
  let component = null;
  if (!elementId || !elementId.trim()) {
    return component;
  }
  elementId = elementId.trim();
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
      component = el;
    }
  });
  return component;
}
