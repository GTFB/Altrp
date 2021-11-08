import getOffsetSum from "./get-offset-sum";

/**
 *
 * @param {HTMLElement} element
 * @return {boolean}
 */
export default function checkAppearTopElement(element){
  const {top} = getOffsetSum(element)
  const scrollTop = document.documentElement.scrollTop
  return (scrollTop + window.innerHeight) > top
}
