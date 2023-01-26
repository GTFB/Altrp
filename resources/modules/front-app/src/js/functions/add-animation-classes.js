import elementInViewport from "../helpers/functions/element-in-viewport";
import animationStyles from "../helpers/animations/animations-styles";
import delay from "../functions/delay"

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


    const animationsMemo = (window.animationsMemo = window.animationsMemo || []);

    let styles =  `[data-altrp-id="${element.dataset.altrpId}"]{
  animation-duration:${element.getAttribute('data-enter-animation-duration') || 400}ms;`
    // if(_.get(getResponsiveSetting(settings, 'en_a_delay'), 'size')){
    //   styles +=`animation-delay:${_.get(getResponsiveSetting(settings, 'en_a_delay'), 'size')}ms;`
    // }
    styles += `}`;

    if(animationStyles[entranceAnimationType] && animationsMemo.indexOf(entranceAnimationType) === -1) {
      animationsMemo.push(entranceAnimationType)
      styles += animationStyles[entranceAnimationType];
    }
    const stylesElement = document.createElement('style')
    stylesElement.innerHTML = styles
    document.head.appendChild(stylesElement)
    element.setAttribute('data-altrp-invisible', '');
    if(animationDelay){
      delay(animationDelay).then(()=>{
        element.classList.add('altrp-an')
        element.classList.add(`altrp-an_${entranceAnimationType}`)
        element.classList.remove('altrp-invisible');
        element.removeAttribute('data-altrp-invisible');
      })
    }
  })
}
