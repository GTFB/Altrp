import getOffsetSum from "./get-offset-sum";

/**
 *
 * @param {HTMLElement} element
 * @return {boolean}
 */
export default function checkAppearBottomElement(element){
  const {top} = getOffsetSum(element)
  const bottomOffset = top + element.offsetHeight;
  const scrollTop = document.documentElement.scrollTop
  return (scrollTop + window.innerHeight) > bottomOffset
}
