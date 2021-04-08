const ALIGN_ITEMS = [
  {
    verticalAlignValues :  [
      'super',
      'top',
      'text-top',
    ],
    alignItemsValue: 'flex-start',
  },
  {
    verticalAlignValues :  [
      'middle',
    ],
    alignItemsValue: 'center',
  },
  {
    verticalAlignValues :  [
      'baseline',
    ],
    alignItemsValue: 'baseline',
  },
  {
    verticalAlignValues :  [
      'sub',
      'bottom',
      'text-bottom',
    ],
    alignItemsValue: 'flex-end',
  },
];

/**
 * Преобразейт значение css-свойства vertical-align в align-items
 * @param {string} verticalAlignValue
 * @return {string}
 */
export function verticalAlignToAlignItems(verticalAlignValue){
  let alignItemsValue = '';
  ALIGN_ITEMS.forEach(items=>{
    if(items.verticalAlignValues.indexOf(verticalAlignValue) !== -1){
      alignItemsValue = items.alignItemsValue;
    }
  });
  return alignItemsValue;
}

/**
 * Преобразует объект, который сохраняет контроллер dimension, в строку css  для вставки в styled-компонент
 * @param {{}} data
 * @param {string} styleProperty - padding|margin|border-radius
 * @return {string}
 */
export function dimensionsControllerToStyles(data = {}, styleProperty = 'padding'){
  let styles = '';
  if(_.isEmpty(data)){
    return styles;
  }
  const {unit = 'px', left, right, top, bottom,} = data;
  switch(styleProperty){
    case 'border-width':{
      if(left){
        styles += `border-left-width:${left}${unit};`;
      }
      if(right){
        styles += `border-right-width:${right}${unit};`;
      }
      if(top){
        styles += `border-top-width:${top}${unit};`;
      }
      if(bottom){
        styles += `border-bottom-width:${bottom}${unit};`;
      }

    }break;
    default:{
      if(left){
        styles += `${styleProperty}-left:${left}${unit};`;
      }
      if(right){
        styles += `${styleProperty}-right:${right}${unit};`;
      }
      if(top){
        styles += `${styleProperty}-top:${top}${unit};`;
      }
      if(bottom){
        styles += `${styleProperty}-bottom:${bottom}${unit};`;
      }
    }break;
  }
  return styles;
}

export function shadowControllerToStyles(data = {}) {
  let {type, offsetX, offsetY, blurRadius, spreadRadius, color } = data;
  return `box-shadow: ${type} ${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius} ${color} !important;`;
}
/**
 * Преобразует объект, который сохраняет контроллер typographic, в строку css для вставки в styled-компонент
 * @param {{}} data
 * @return {string}
 */
export function typographicControllerToStyles(data = {}){
  let styles = '';
  if(_.isEmpty(data)){
    return styles;
  }
  const {
    family,
    size,
    lineHeight,
    spacing,
    style,
    transform,
    weight,
    decoration,
    sizeUnit,
  } = data;
  if(decoration){
    styles += `text-decoration:${decoration};`;
  }
  if(transform){
    styles += `text-transform:${transform};`;
  }
  if(spacing){
    styles += `letter-spacing:${spacing};`;
  }
  if(lineHeight){
    styles += `line-height:${lineHeight};`;
  }
  if(weight){
    styles += `font-weight:${weight};`;
  }
  if(style){
    styles += `font-style:${style};`;
  }
  if(size){
    styles += `font-size:${size ? (size + (sizeUnit || 'px')) : ''};`;
  }
  if(! _.isEmpty(family)){
    styles += `font-family:${family};`;
  }
  return styles;
}