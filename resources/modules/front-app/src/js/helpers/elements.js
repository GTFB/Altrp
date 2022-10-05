/**
 *
 * @param {HTMLElement} element
 * @param {{} | HTMLElement}scrollbars
 * @return {boolean}
 */
export function checkElementInViewBox(element, scrollbars){
  let view;
  if(scrollbars instanceof HTMLElement || scrollbars instanceof HTMLHtmlElement){
    view = scrollbars;
  } else {
    view = scrollbars.view;
  }
  if(! element || ! view){
    return false;
  }
  // while (element = element.parentNode) {
  //   if (x.id == "a") console.log("FOUND");
  // }
  if(! view.contains(element)){
    return false
  }
  let offsetTop = getOffsetTopInElement(element, view);
  if(offsetTop === false){
    return false
  }
  let scrollTop = 0;
  if(scrollbars.getScrollTop){
    scrollTop = scrollbars.getScrollTop();
  } else {
    scrollTop = view.scrollTop;
  }
  console.log(offsetTop);
  console.log(scrollTop ,view.offsetHeight );
  return offsetTop < (scrollTop + view.offsetHeight + 150);
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
      return offsetTop;
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
  if (rule.cssText?.includes('background-clip: text;')) return rule.cssText.replace('background-clip: text;', '-webkit-background-clip: text;')
  return rule.cssText || ''
}
