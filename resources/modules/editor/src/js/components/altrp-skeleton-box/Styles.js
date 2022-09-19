import {createGlobalStyle} from "styled-components";
import {dimensionsControllerToStyles} from "../../../../../front-app/src/js/helpers/styles";
import {connect} from "react-redux";

const Styles = createGlobalStyle`
${({element}) => {
  let elementStyles = ''
  let afterStyles = ''
  let keyFrames = ''

  let columns = Number(element.getResponsiveSetting('skeleton:columns'))
  let rows = Number(element.getResponsiveSetting('skeleton:rows'))
  if(columns && ! rows){
    rows = 1
  }

  if(columns){
    columns = Array.from(Array(columns))
    columns = columns.map(()=>'1fr')
    rows = Array.from(Array(rows))
    rows = rows.map(()=>'1fr')
    elementStyles += `

  grid-template-columns: ${columns.join(' ')};
  grid-template-rows: ${rows.join(' ')};
    `
  }
  if (!element.getResponsiveSetting('skeleton:shimmer')) {
    afterStyles += 'display:none;'
  }
  let width = element.getResponsiveSetting('skeleton:width')
  if (width) {
    if(Number(width)){
      width += 'px'
    }
    elementStyles += `width:${width};`
  }
  let height = element.getResponsiveSetting('skeleton:height')
  if (height) {
    if(Number(height)){
      height += 'px'
    }
    elementStyles += `height:${height};`
  }

  let shimmer_size = element.getResponsiveSetting('skeleton:shimmer_size')
  if (shimmer_size) {
    if(Number(shimmer_size)){
      shimmer_size += 'px'
    }
    afterStyles += `width:${shimmer_size};`
  }

  let primary_color = element.getResponsiveSetting('skeleton:primary_color')?.color || 2000
  if(primary_color){
    elementStyles += `background-color: ${primary_color};`
  }
  // let secondary_color = element.getResponsiveSetting('skeleton:secondary_color.color') || 2000
  // if(secondary_color){
  //   afterStyles += `background-image: linear-gradient(
  //       90deg,
  //       ${secondary_color} 0,
  //       ${secondary_color} 20%,
  //       ${secondary_color} 60%,
  //       ${secondary_color}
  //   );`
  // }
  let shimmer_speed = element.getResponsiveSetting('skeleton:speed')?.size || 2000

  if (shimmer_speed) {
    afterStyles += `animation-duration: ${shimmer_speed}ms;`
  }

  let radius = element.getResponsiveSetting('skeleton:radius')
  if (radius) {
    elementStyles += `${dimensionsControllerToStyles(radius, 'border-radius')}`
  }

  let shimmer_end_position = element.getResponsiveSetting('skeleton:shimmer_end_position')
  if (shimmer_end_position) {
    if(Number(shimmer_end_position)){
      shimmer_end_position += 'px'
    }
    keyFrames += `
    100% {
      transform: translateX(${shimmer_end_position});
    }`
  }

  const preview = element.getResponsiveSetting('skeleton:preview')
  const enable = element.getResponsiveSetting('skeleton:enable')
  const gap = element.getResponsiveSetting('skeleton:gap')

  const elementId = element.getId()

  const styles =  `
  ${preview && enable ? `` : `#editor-content .altrp-element${elementId} > .altrp-skeleton-box{display:none;}`}
    ${elementStyles ? `.altrp-element${elementId} > .altrp-skeleton-box,
    .altrp-element${elementId} > .altrp-skeleton-box > .altrp-skeleton-box__item
    {
      ${elementStyles}
      ${gap ? `gap:${gap};` : ''}
    }
    .altrp-element${elementId} > .altrp-skeleton-box > .altrp-skeleton-box__item{
      height: auto;
    }
    ${columns ? `
    .altrp-element${elementId} > .altrp-skeleton-box{
      background-color: transparent;
    }
    ` : ''}
    ` : ''}
    ${afterStyles ? `.altrp-element${elementId} > .altrp-skeleton-box::after,
    .altrp-element${elementId} > .altrp-skeleton-box > .altrp-skeleton-box__item::after{
      ${afterStyles}
      ${keyFrames ? `animation-name: shimmer${elementId};` : ''}

  }` : ''}
  ${keyFrames ?
    `
  @keyframes shimmer${elementId} {
    ${keyFrames}
  }
    ` : ''
  }
  `;
  return styles

}}
`
export default connect(state=>{
  return {currentScreen: state.currentScreen}
})(Styles)
