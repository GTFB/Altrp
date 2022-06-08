/**
 * Вернет HTML  React компонента, у которого props.element = element
 * @param {FrontElement} element
 * @return {null | HTMLElement}
 */
export default function getWrapperHTMLElementByElement(element) {
  if (!element) {
    return null;
  }
  let HTMLElement = null;
  appStore.getState().elements.forEach(el => {
    if (element === el.props.element) {
      HTMLElement = el.elementWrapperRef.current;
    }
  });
  return HTMLElement;
}
