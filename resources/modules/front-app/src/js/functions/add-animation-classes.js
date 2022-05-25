import elementInViewport from "../helpers/functions/element-in-viewport";
import delay from "../functions/delay";

/**
 *
 */
export default function addAnimationClasses (){
  const elements = document.querySelectorAll('[data-enter-animation-type]:not(.altrp-an)')
  _.each(elements, /** @param {HTMLElement} element */element=>{
    const entranceAnimationType = element.getAttribute('data-enter-animation-type')
    if(! elementInViewport(element) || ! entranceAnimationType){
      return
    }
    const animationDelay = element.getAttribute('data-enter-animation-delay');
    if(animationDelay){
      delay(animationDelay).then(()=>{
        element.classList.add('altrp-an')
        element.classList.add(`altrp-an_${entranceAnimationType}`)
        element.classList.remove('altrp-invisible');
      })
    }
  })
}
