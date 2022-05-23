import animationStyles from "../helpers/animations/animations-styles";


const {getResponsiveSetting} = window.altrpHelpers
/**
 * Render styles to animations via styled component
 * @param {{}} settings
 * @param {string} elementId
 */
const EntranceAnimationsStyles = createGlobalStyle`${({settings, elementId, })=>{
  const entranceAnimationType = getResponsiveSetting(settings, 'en_an');
  const overflowHiddenContainer = getResponsiveSetting(settings, 'en_a_switcher')
  const animationsMemo = window.animationsMemo || [];

  let styles =  `.altrp-element${elementId} .dynamic-animation {
  animation-duration:${_.get(getResponsiveSetting(settings, 'en_a_duration'), 'size', 400)}ms;`
  // if(_.get(getResponsiveSetting(settings, 'en_a_delay'), 'size')){
  //   styles +=`animation-delay:${_.get(getResponsiveSetting(settings, 'en_a_delay'), 'size')}ms;`
  // }
  styles += `}`;

  if (!overflowHiddenContainer) {
    styles += `.altrp-section {
      overflow: visible !important;
    }`
  }
  if(animationStyles[entranceAnimationType] && animationsMemo.indexOf(entranceAnimationType) === -1){
    animationsMemo.push(entranceAnimationType)
    styles += animationStyles[entranceAnimationType];
  }
  return styles;
}}`

export default EntranceAnimationsStyles

