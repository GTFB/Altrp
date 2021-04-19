/**
 *
 * @param {HTMLElement} element
 * @param scrollbars
 * @return {boolean}
 */
export function checkElementInViewBox(element, scrollbars){
  if(! element || ! scrollbars.view){
    return false;
  }
  // while (element = element.parentNode) {
  //   if (x.id == "a") console.log("FOUND");
  // }
  if(! scrollbars.view.contains(element)){
    return false
  }
  // console.log(element);
  // console.log(scrollbars.view);
  let offsetTop = getOffsetTopInElement(element, scrollbars.view);
  if(offsetTop === false){
    return false
  }
  return offsetTop < (scrollbars.getScrollTop() + scrollbars.view.offsetHeight + 50);
}

/**
 * Высчитать положение относительно одно из предков
 * @param {HTMLElement} element
 * @param {HTMLElement} targetElement
 * @return {*}
 */
export function getOffsetTopInElement(element, targetElement){
  if(! element || ! element.offsetParent || ! targetElement || ! targetElement.contains(element)){
    return false
  }
  let offsetTop = 0;
  do{
    if(! element){
      return false;
    }
    offsetTop += element.offsetTop;
    // console.log(element.offsetTop);
  } while((element = element.offsetParent) !== targetElement);
  return offsetTop;
}

export function getSheet(tag, _document) {
  if (tag.sheet) {
    return tag.sheet;
  } // Avoid Firefox quirk where the style element might not have a sheet property


  let   styleSheets = _document.styleSheets;

  for (let  i = 0, l = styleSheets.length; i < l; i++) {
    let  sheet = styleSheets[i];

    if (sheet.ownerNode === tag) {
      return sheet;
    }
  }

  return undefined;
}

export function stringifyStylesheet (stylesheet) {
  return stylesheet.cssRules
      ? Array.from(stylesheet.cssRules)
          .map(rule => stringifyRule(rule))
          .join('')
      : ''
}

export  function stringifyRule(rule) {
  return rule.cssText || ''
}