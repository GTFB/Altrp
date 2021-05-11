import {getResponsiveSetting} from "../helpers";

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

export function shadowControllerToStyles(data) {
  if(data) {
    let {type, offsetX, offsetY, blurRadius, spreadRadius, color } = data;
    return `box-shadow: ${type} ${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius} ${color} !important;`;
  }
}

/**
 * Преобразует объект, который сохраняет контроллер Color, в строку css для вставки в styled-компонент
 * @param {{}} data
 * @return {string}
 */
export function backgroundColorControllerToStyles(data, pseudoClass) {
  let styles = '';
  if (_.isEmpty(data)) {
    return styles;
  }

  if (data) {
    let { colorPickedHex } = data;

    if (pseudoClass !== undefined) {
      return `&:${pseudoClass} {background-color: ${colorPickedHex};} `;
    }

    return `background-color: ${colorPickedHex}; `;

  }

  return styles;
}

export function gradientControllerToStyles(data) {
  let styles = '';
  if (_.isEmpty(data)) {
    return styles;
  }

  if (data.isWithGradient) {
    let { angle, firstColor, firstPoint, secondColor, secondPoint } = data;

    return `background-image: linear-gradient(${angle}deg, ${firstColor} ${firstPoint}%, ${secondColor} ${secondPoint}%); `;
  }

  return styles;
}

/**
 * Преобразует объект, который сохраняет контроллер Filters, в строку css для вставки в styled-компонент
 * @param {{}} data
 * @return {string}
 */

export function filtersControllerToStyles(data) {
  let styles = '';
  if (_.isEmpty(data)) {
    return styles;
  }

  let { blur, brightness, contrast, hue, saturate } = data;

  return `& .altrp-image {filter: blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) hue-rotate(${hue}deg);} `;

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
    lineHeightUnit,
  } = data;
  if(decoration){
    styles += `text-decoration:${decoration};`;
  }
  if(transform){
    styles += `text-transform:${transform};`;
  }
  if(spacing){
    styles += `letter-spacing:${spacing}px;`;
  }
  if(lineHeight){
    styles += `line-height:${lineHeightUnit ? (lineHeight + lineHeightUnit) : lineHeight};`;
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

/**
 * Преобразует объект, который сохраняет контроллер color, в строку css для вставки в styled-компонент
 * @return {string}
 * @param {{}} controller
 * @param {string} style
 */
export function colorStyled(controller, style) {
  if(controller) {
    if(controller.color) {
      return `${style}: ${controller.color};`
    } else return "";
  } else return "";
}

/**
 * Преобразует объект, который сохраняет контроллер dimensions, в строку css для вставки в styled-компонент
 * @return {string}
 * @param {{}} controller
 * @param {string} style
 */
export function dimensionsStyled(controller, style) {
  if(controller) {
    const unit = controller.unit || "px";
    const left = controller.left || 0;
    const right = controller.right || 0;
    const bottom = controller.bottom || 0;
    const top = controller.top || 0;

    if(controller.left || controller.right || controller.bottom || controller.top) {
      return `${style}: ${top + unit} ${right + unit} ${bottom + unit} ${left + unit};`
    } else return "";
  }
};


/**
 * Преобразует объект, который сохраняет контроллер gradient, в строку css для вставки в styled-компонент
 * @return {string}
 * @param {{}} controller
 */
export function gradientStyled(controller) {
  if(controller.isWithGradient) {
    return `background-image: ${controller.value};`;
  } else {
    return ""
  };
}

/**
 * проверяет наличичие значения select или number
 * @return {string}
 * @param {string} controller
 */
export function defaultStyled(controller) {
  if(controller) {
    return controller
  } else {
    return ""
  }
}

/**
 * проверяет наличичие значения slider
 * @return {string}
 * @param {{}} controller
 */
export function sliderStyled(controller) {
  if(controller) {
    if(controller.size) {
      const unit = controller.unit || "px";
      return controller.size + unit
    } else return "";
  } else return "";
}

/**
 * проверяет наличичие значения slider
 * @return {string}
 * @param {{}} controller
 */
export function shadowStyled(controller = {}) {
  const type = controller.type || "";
  const horizontal = controller.horizontal || 0;
  const vertical = controller.vertical || 0;
  const blur = controller.blur || 0;
  const spread = controller.spread || 0;
  const color = controller.color || "";
  return `box-shadow: ${type} ${horizontal}px ${vertical}px ${blur}px ${spread} ${color};`;
}

/**
 * принимает настройки виджета settings и принимает массив стилей для преобразования в строку css для styled-components
 * @return {string}
 * @param {[]} styles - массив стилей
 * @param {{}} settings - настройки виджета
 */
export function styledString(styles, settings) {
  let stringStyles = "";

  styles.forEach(style => {
    if(_.isString(style)) {
      if(style !== "}") {
        if(style.split('')[0] === "." || style.split('')[0] === "&") {
          stringStyles += `${style} {`;
        } else {
          stringStyles += `& .${style} {`
        }
      } else {
        stringStyles += `}`
      }
    } else {
      if(_.isArray(style)) {
        const state = style[3] || null;
        const variable = getResponsiveSetting(settings, style[1], state)
        switch (style[2]) {
          case "dimensions":
            stringStyles += dimensionsStyled(variable, style[0]);
            break;
          case "color":
            stringStyles += colorStyled(variable, style[0]);
            break;
          case "gradient":
            stringStyles += gradientStyled(variable);
            break;
          case "typographic":
            stringStyles += typographicControllerToStyles(variable);
            break;
          case "slider":
            stringStyles += `${style[0]}: ${sliderStyled(variable)};`
            break;
          case "shadow":
            stringStyles += shadowStyled(variable)
          default:
            stringStyles += `${style[0]}: ${defaultStyled(variable)};`
        }
      }

      if(_.isFunction(style)) {
        stringStyles += style()
      }
    }
  })

  return stringStyles
}