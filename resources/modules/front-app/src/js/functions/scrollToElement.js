import {getOffsetTopInElement} from "../helpers/elements";

/**
 * Скроллит к элементу
 * @param {{} | HTMLElement}scrollbars
 * @param {{}}element
 */
export default function scrollToElement(scrollbars, element, spacing=0) {
  let { container } = scrollbars;
  if(scrollbars instanceof HTMLElement){
    container = scrollbars;
    let scroll = getOffsetTopInElement(element, scrollbars);
    if(scroll){
      scrollbars.scrollTop = scroll;
    }

  }
  if(scrollbars instanceof Window){
    container = scrollbars;
  }
  /**
   * @member {HTMLElement} container
   */
  if (!container) {
    return;
  }
  if (!_.isFunction(scrollbars.scrollTop) && !_.isFunction(scrollbars.scrollTo)) {
    return;
  }


  let parent = element.offsetParent;
  let top = element.offsetTop;

  while (parent !== container || parent !== document.body) {
    if (! parent) {
      /**
       * ушли в самый корень ДОМ и контейнер не встретился
       */
      break;
    }
    top += parent.offsetTop;
    parent = parent.offsetParent;
  }
  if(_.isString(spacing)){
    spacing = Number(spacing)
  }
  if(spacing){
    top += spacing
  }
  /**
   * не получили каеое-либо значение
   */
  if (! top) {
    return;
  }


  console.log(scrollbars.scrollTo);
  console.log(top);
  scrollbars.scrollTop && scrollbars.scrollTop(top);
  scrollbars.scrollTo && scrollbars.scrollTo({
    top,
    left: 0,
    behavior: 'smooth',
  });
}
