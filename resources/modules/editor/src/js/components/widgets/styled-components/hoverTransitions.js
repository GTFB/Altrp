/**
 *
 * @param {{}}settings
 * @param {string} elementId
 */
import getResponsiveSetting from "../../../../../../front-app/src/js/functions/getResponsiveSetting";

export default function hoverTransitions(settings, elementId){
  let styles = ''
  let transform = ''
  let transformOrigin = ''

  if(!getResponsiveSetting(settings, 'hover-transition:enable')){
    return ''
  }
  const rotate = getResponsiveSetting(settings, 'hover-transition:rotate')
  if(rotate?.size){
    transform += ` rotateZ(${rotate.size}deg)`
  }

  const scaleX = getResponsiveSetting(settings, 'hover-transition:scale-x')
  if(scaleX){
    transform += ` scaleX(${scaleX})`
  }

  const scaleY = getResponsiveSetting(settings, 'hover-transition:scale-y')
  if(scaleY){
    transform += ` scaleY(${scaleY})`
  }

  const offsetX = getResponsiveSetting(settings, 'hover-transition:offset-x')
  if(offsetX){
    transform += ` translateX(${offsetX})`
  }

  const offsetY = getResponsiveSetting(settings, 'hover-transition:offset-y')
  if(offsetY){
    transform += ` translateY(${offsetY})`
  }

  const skewX = getResponsiveSetting(settings, 'hover-transition:skew-x')
  if(skewX){
    transform += ` skewX(${skewX})`
  }

  const skewY = getResponsiveSetting(settings, 'hover-transition:skew-y')
  if(skewY){
    transform += ` skewY(${skewY})`
  }
  const flipX = getResponsiveSetting(settings, 'hover-transition:flip-x')
  if(flipX){
    transform += ` scaleX(-1)`
  }

  const flipY = getResponsiveSetting(settings, 'hover-transition:flip-y')
  if(flipY){
    transform += ` scaleY(-1)`
  }

  let xAnchor = getResponsiveSetting(settings, 'hover-transition:x-anchor')
  let yAnchor = getResponsiveSetting(settings, 'hover-transition:y-anchor')
  if(yAnchor || xAnchor){
    yAnchor = yAnchor || 'center'
    xAnchor = xAnchor || 'center'
    transformOrigin = `${xAnchor} ${yAnchor}`
  }
  if(transform){
    styles += `
    .altrp-element${elementId}:hover > *:not(.overlay, .altrp-skeleton-box){
      transform: ${transform};
    }
    `
  }
  const duration = getResponsiveSetting(settings, 'hover-transition:duration')
  if(duration?.size){
    styles += `
    .altrp-element${elementId} > *:not(.overlay, .altrp-skeleton-box){
      transition-duration: ${duration.size}ms;
      ${transformOrigin ? `transform-origin:${transformOrigin};`: ''}
    }
    `
  }


  return styles
}
