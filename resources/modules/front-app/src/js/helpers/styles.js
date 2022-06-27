import getResponsiveSetting from "../functions/getResponsiveSetting";

const ALIGN_ITEMS = [
  {
    verticalAlignValues: ["super", "top", "text-top"],
    alignItemsValue: "flex-start"
  },
  {
    verticalAlignValues: ["middle"],
    alignItemsValue: "center"
  },
  {
    verticalAlignValues: ["baseline"],
    alignItemsValue: "baseline"
  },
  {
    verticalAlignValues: ["sub", "bottom", "text-bottom"],
    alignItemsValue: "flex-end"
  }
];

/**
 * Преобразейт значение css-свойства vertical-align в align-items
 * @param {string} verticalAlignValue
 * @return {string}
 */
export function verticalAlignToAlignItems(verticalAlignValue) {
  let alignItemsValue = "";
  ALIGN_ITEMS.forEach(items => {
    if (items.verticalAlignValues.indexOf(verticalAlignValue) !== -1) {
      alignItemsValue = items.alignItemsValue;
    }
  });
  return alignItemsValue;
}

/**
 * Преобразует объект, который сохраняет контроллер dimension, в строку css  для вставки в styled-компонент
 * @param {{}} data - settings
 * @param {string} styleProperty - padding|margin|border-radius
 * @return {string}
 */
export function dimensionsControllerToStyles(
  data = {},
  styleProperty = "padding",
  declaration = ""
) {
  let styles = "";

  if (_.isEmpty(data)) {
    return styles;
  }
  const { left, top, right, bottom, unit } = data;
  switch (styleProperty) {
    case "border-width":
      {
        if (left) {
          styles += `border-left-width: ${left}${unit} ${declaration};`;
        }
        if (right) {
          styles += `border-right-width: ${right}${unit} ${declaration};`;
        }
        if (top) {
          styles += `border-top-width: ${top}${unit} ${declaration};`;
        }
        if (bottom) {
          styles += `border-bottom-width: ${bottom}${unit} ${declaration};`;
        }
      }
      break;
    case "border-radius":
      {
        if (top) {
          styles += `border-top-left-radius: ${top}${unit} ${declaration};`;
        }
        if (right) {
          styles += `border-top-right-radius: ${right}${unit} ${declaration};`;
        }
        if (bottom) {
          styles += `border-bottom-right-radius: ${bottom}${unit} ${declaration};`;
        }
        if (left) {
          styles += `border-bottom-left-radius: ${left}${unit} ${declaration};`;
        }
      }
      break;
    default:
      {
        if (left) {
          styles += `${styleProperty}-left: ${left}${unit} ${declaration};`;
        }
        if (right) {
          styles += `${styleProperty}-right: ${right}${unit} ${declaration};`;
        }
        if (top) {
          styles += `${styleProperty}-top: ${top}${unit} ${declaration};`;
        }
        if (bottom) {
          styles += `${styleProperty}-bottom: ${bottom}${unit} ${declaration};`;
        }
      }
      break;
  }

  return styles;
}

/**
 * Преобразует объект, который сохраняет контроллер box-shadow, в строку css для вставки в styled-компонент
 * @param {{}} data
 * @param {string} declaration
 * @return {string}
 */
export function shadowControllerToStyles(data, declaration="") {
  let styles = "";

  if (_.isEmpty(data)) {
    return styles;
  }

  if(data) {
    let {type = 'outline', offsetX,horizontal, offsetY, vertical, blurRadius,blur,spread, spreadRadius, color } = data;
    let returnShadow = [offsetX, horizontal, offsetY, vertical, blurRadius, blur, spread, spreadRadius].filter(elem => (
      (elem && elem !== 0)
    ));
    if(returnShadow.length !== 0) {
      styles += `box-shadow: ${type || ' '} ${offsetX || horizontal || 0}px ${offsetY || vertical || 0}px ${blurRadius || blur || 0}px ${spreadRadius || spread || 0}px ${color} ${declaration}; `;
    }
  }
  return styles;
}

/**
 * Преобразует объект, который сохраняет контроллер text-shadow, в строку css для вставки в styled-компонент
 * @param {{}} data
 * @return {string}
 */
export function textShadowControllerToStyles(data) {
  if (data) {
    const { blur, colorPickedHex, color, horizontal, opacity, vertical } = data;

    return `text-shadow: ${horizontal}px ${vertical}px ${blur}px ${color}; `;
  }

  return "";
}

/**
 * Преобразует объект, который сохраняет контроллер Color, в строку css для вставки в styled-компонент
 * @param {{}} data
 * @param {string} pseudoClass
 * @return {string}
 */
export function backgroundColorControllerToStyles(data, pseudoClass) {
  let styles = "";
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

/**
 * Преобразует объект, который сохраняет контроллер background-image, в строку css для вставки в styled-компонент
 * @param {{}} data
 * @return {string}
 */
export function backgroundImageControllerToStyles(data) {
  let styles = "";

  if (_.isEmpty(data) || data.url === null) {
    return styles;
  }

  const { url } = data;

  if(url) {
    return `background-image: url('${url}'); `;
  } else {
    return ""
  }
}

/**
 * Преобразует объект, который сохраняет контроллер Filters, в строку css сразу с селектором '& .altrp-image' для вставки в styled-компонент
 * @param {{}} data
 * @return {string}
 */

export function filtersControllerToStyles(data) {
  let styles = "";
  if (_.isEmpty(data)) {
    return styles;
  }

  let {
    blur = "0",
    brightness = "100",
    contrast = "100",
    hue = "0",
    saturate,
    saturation
  } = data;

  return `filter: blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate ||
    saturation ||
    "100"}%) hue-rotate(${hue}deg); `;
}

/**
 * Преобразует значение одного из свойств, перечисленных ниже, в строку css для вставки в styled-компонент
 * Варианты принимаемых свойств: column-count, z-index, border-style
 * @param {string} style
 * @param {string} styleProperty
 * @param {string} declaration
 * @return {string}
 */

export function simplePropertyStyled(style, styleProperty, declaration = "") {
  if (style) {

    return `${styleProperty}: ${style + declaration}; `;
  }

  return "";
}

/**
 * Преобразует значение одного из свойств, перечисленных ниже, в строку css для вставки в styled-компонент
 * Варианты принимаемых свойств: color, background-color, border-color
 * @param {{}} data
 * @param {string} styleProperty
 * @param {string} declaration
 * @return {string}
 */

export function colorPropertyStyled(data , styleProperty, declaration = "") {
  data = data || {}
  const { color } = data;

  if (color) {
    return `${styleProperty}: ${color + declaration}; `;
  }

  return "";
}

/**
 * Преобразует объект, который сохраняет значение background-color из контроллера creative_link_controller, в строку css для вставки в styled-компонент
 * @param {{}} data
 * @param {string} styleProperty
 * @return {string}
 */

export function backgroundCreativeLinkStyled(data) {
  const { backgroundPickedHex } = data;

  if (backgroundPickedHex) {
    return `background-color: ${backgroundPickedHex}; `;
  }

  return "";
}

/**
 * Преобразует объект, который сохраняет контроллер column-gap, в строку css для вставки в styled-компонент
 * @param {{}} data
 * @return {string}
 */

export function columnGapStyled(data = {}) {
  let styles = "";

  if (_.isEmpty(data)) {
    return styles;
  }

  const { size, unit } = data;

  styles = `column-gap: ${size + unit}; `;

  return styles;
}

/**
 * Преобразует объект, который сохраняет контроллер icon-size, в строку css для вставки в styled-компонент
 * @param {{}} data
 * @return {string}
 */

export function iconSizeStyled(data = {}) {
  let styles = "";

  if (_.isEmpty(data)) {
    return styles;
  }

  const { size, unit } = data;

  styles = `width: ${size + unit}; height: ${size + unit}; `;

  return styles;
}

/**
 * Преобразует объект, который сохраняет контроллер Size | Icon Left Spacing | Icon Right Spacing | Top Translate | Left Translate,
 * в строку css для вставки в styled-компонент
 * @param {{}} data
 * @param {string} property
 * @return {string}
 */

export function sizeStyled(data = {}, property) {
  let styles = "";

  if (_.isEmpty(data) || data.size === undefined) {
    return styles;
  }

  const { size, unit } = data;

  if (
    property === "transition-duration" ||
    property === "animation-duration" ||
    property === "transition-delay"
  ) {
    styles = `${property}: ${size}s; `;

    return styles;
  }

  if(size) {
    styles = `${property}: ${size + (unit || '')}; `;
  }

  return styles;
}

/**
 * Преобразует объект, который сохраняет контроллер height в строку css для вставки в styled-компонент
 * @param {{}} data
 * @return {string}
 */

export function heightCalcStyled(data = {}) {
  let styles = "";

  if (_.isEmpty(data) || data.size === undefined) {
    return styles;
  }

  const { size, unit } = data;

  styles = `height: calc${size + unit} * 2; `;

  return styles;
}

/**
 * Преобразует объект, который сохраняет контроллер Translate, в строку css для вставки в styled-компонент
 * @param {{}} data
 * @return {string}
 */

export function translateStyled(data = {}) {
  let styles = "";

  if (_.isEmpty(data) || isNaN(data.size) || !data.size) {
    return styles;
  }

  const { size, unit } = data;

  styles = `transform: ${data.function}(${size + unit}); `;

  return styles;
}

/**
 * Преобразует объект, который сохраняет контроллер transform rotate, в строку css для вставки в styled-компонент
 * @param {{}} data
 * @return {string}
 */

export function transformRotateStyled(data = {}) {
  let styles = "";

  if (_.isEmpty(data) || isNaN(data.size) || !data.size) {
    return styles;
  }

  const { size } = data;

  styles = `transform: rotate(${size}deg); `;

  return styles;
}

/**
 * Преобразует объект, который сохраняет контроллер opacity, в строку css для вставки в styled-компонент
 * @param {string} style
 * @return {string}
 */

export function opacityStyled(style) {
  if (style) {
    return `opacity: ${style.size}; `;
  } else return "";
}

/**
 * Преобразует объект, который сохраняет контроллер typographic, в строку css для вставки в styled-компонент
 * @param {{}} data
 * @return {string}
 */
export function typographicControllerToStyles(data = {}) {
  let styles = "";

  if (_.isEmpty(data)) {
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
    lineHeightUnit
  } = data;

  if (decoration) {
    styles += `text-decoration: ${decoration}; `;
  }
  if (transform) {
    styles += `text-transform: ${transform}; `;
  }
  if (spacing) {
    styles += `letter-spacing: ${spacing}px; `;
  }
  if (lineHeight) {
    styles += `line-height: ${
      lineHeightUnit ? lineHeight + lineHeightUnit : lineHeight
    }; `;
  }
  if (weight) {
    styles += `font-weight: ${weight}; `;
  }
  if (style) {
    styles += `font-style: ${style}; `;
  }
  if (size) {
    styles += `font-size: ${size ? size + (sizeUnit || "px") : ""}; `;
  }
  if (!_.isEmpty(family)) {
    styles += `font-family: ${family}; `;
  }
  return styles;
}

/**
 * Преобразует объект, который сохраняет контроллер color, в строку css для вставки в styled-компонент
 * @return {string}
 * @param {{}} controller
 * @param {string} style
 * @param {string} important
 */
export function colorStyled(controller, style) {
  if (controller) {
    if (controller.color) {
      return `${style}: ${controller.color};`;
    } else return "";
  } else return "";
}

/**
 * Преобразует объект, который сохраняет контроллер color, в строку css для вставки в styled-компонент
 * @return {string}
 * @param {{}} controller
 */
export function colorStyledSecond(controller) {
  if (controller) {
    if (controller.color) {
      return `${controller.color}`;
    } else return "";
  } else return "";
}

/**
 * Преобразует объект, который сохраняет контроллер border-width, в строку css для вставки в styled-компонент
 * @param {{}} data
 * @param {string} declaration
 * @return {string}
 */

export function borderWidthStyled(data = {}, declaration = "") {
  let styles = "";

  if (_.isEmpty(data)) {
    return styles;
  }

  const { bottom, left, right, top, unit = "px" } = data;

  if (top && top !== "") {
    styles += `border-top-width: ${top + unit + declaration}; `;
  }

  if (right && right !== "") {
    styles += `border-right-width: ${right + unit + declaration}; `;
  }

  if (bottom && bottom !== "") {
    styles += `border-bottom-width: ${bottom + unit + declaration}; `;
  }

  if (left && left !== "") {
    styles += `border-left-width: ${left + unit + declaration}; `;
  }

  return styles;
}

/**
 * Преобразует объект, который сохраняет контроллер border-width, в строку css со свойством margin-top или margin-left с таким же значением, но отритцательным
 * @param {{}} data
 * @param {string} position
 * @return {string}
 */

export function marginTopLeftStyled(data = {}, position) {
  let styles = "";

  if (_.isEmpty(data)) {
    return styles;
  }

  const { top, left, unit } = data;

  if (top && top !== "" && position === "top") {
    styles += `margin-top: -${top + unit}; `;
  }

  if (top && top !== "" && position === "left") {
    styles += `margin-left: -${left + unit}; `;
  }

  return styles;
}

/**
 * Преобразует объект, который сохраняет контроллер border-radius, в строку css для вставки в styled-компонент
 * @param {{}} data
 * @return {string}
 */

 export function borderRadiusStyled(data = {},declaration="") {
  let styles = "";

  if (_.isEmpty(data)) {
    return styles;
  }

  const { size, unit } = data;

  styles = `border-radius: ${size + unit + declaration}; `;

  return styles;
}

/**
 * Преобразует объект, который сохраняет контроллер dimensions, в строку css для вставки в styled-компонент
 * @return {string}
 * @param {{}} controller
 * @param {string} style
 * @param {string} important
 */
 export function dimensionsStyled(controller, style, important = '') {
  if (controller) {
    const unit = controller.unit || "px";
    const left = controller.left;
    const right = controller.right;
    const bottom = controller.bottom;
    const top = controller.top;

    let styles = "";

    if(controller.left) {
      switch (style) {
        case "padding":
          styles += `padding-left: ${left + unit + important};`
          break;
        case "margin":
          styles += `margin-left: ${left + unit + important};`
          break;
        case "border-radius":
          styles += `border-bottom-right-radius: ${left + unit + important};`
          break;
        case "border-width":
          styles += `border-left-width: ${left + unit + important};`
          break;
        case "position":
          styles += `left: ${left + unit + important};`
      }
    }

    if(controller.right) {
      switch (style) {
        case "padding":
          styles += `padding-right: ${right + unit + important};`
          break;
        case "margin":
          styles += `margin-right: ${right + unit + important};`
          break;
        case "border-radius":
          styles += `border-top-right-radius: ${right + unit + important};`
          break;
        case "border-width":
          styles += `border-right-width: ${right + unit + important};`
          break;
        case "position":
          styles += `right: ${right + unit + important};`
      }
    }

    if(controller.top) {
      switch (style) {
        case "padding":
          styles += `padding-top: ${top + unit + important};`
          break;
        case "margin":
          styles += `margin-top: ${top + unit + important};`
          break;
        case "border-radius":
          styles += `border-top-left-radius: ${top + unit + important};`
          break;
        case "border-width":
          styles += `border-top-width: ${top + unit + important};`
          break;
        case "position":
          styles += `top: ${top + unit + important};`
      }
    }

    if(controller.bottom) {
      switch (style) {
        case "padding":
          styles += `padding-bottom: ${bottom + unit + important};`
          break;
        case "margin":
          styles += `margin-bottom: ${bottom + unit + important};`
          break;
        case "border-radius":
          styles += `border-bottom-left-radius: ${bottom + unit + important};`
          break;
        case "border-width":
          styles += `border-bottom-width: ${bottom + unit + important};`
          break;
        case "position":
          styles += `bottom: ${bottom + unit + important};`
      }
    }

    return styles
  } else {
    return "";
  }
}

/**
 * Преобразует объект, который сохраняет контроллер gradient, в строку css для вставки в styled-компонент
 * @return {string}
 * @param {{}} controller
 */
export function gradientStyled(controller) {
  if (controller && controller.isWithGradient) {
    return `background-image: ${controller.value} `;
  } else {
    return "";
  }
}

/**
 * проверяет наличичие значения select или number
 * @return {string}
 * @param {string} controller
 */
export function defaultStyled(controller) {
  if (controller) {
    return controller;
  } else {
    return "";
  }
}

/**
 * проверяет наличичие значения slider
 * @return {string}
 * @param {{}} controller
 */
export function sliderStyled(controller) {
  if (controller) {
    if (controller.size) {
      const unit = controller.unit || "px";
      return controller.size + unit;
    } else return "";
  } else return "";
}

/**
 * проверяет наличичие значения shadow
 * @return {string}
 * @param {{}} controller
 * @param {string} important
 */
export function shadowStyled(controller = {}, important = '') {
  if (controller) {
    const type = controller.type || "";
    const horizontal = controller.horizontal || 0;
    const vertical = controller.vertical || 0;
    const blur = controller.blur || 0;
    const spread = controller.spread || 0;
    const color = controller.color || "";

    if(horizontal !== 0 || vertical !== 0 || blur !== 0 || spread !== 0) {
      return `box-shadow: ${type} ${horizontal}px ${vertical}px ${blur}px ${spread}px ${color} ${important};`;
    } else return ""
  } else return ""
}


/**
 * проверяет наличичие значения text shadow
 * @return {string}
 * @param {{}} controller
 * @param {string} important
 */
export function textShadowStyled(controller = {}, important = '') {
  if (controller) {
    const horizontal = controller.horizontal || 0;
    const vertical = controller.vertical || 0;
    const blur = controller.blur || 0;
    const color = controller.color || "";
    if (horizontal || vertical || blur || color) {
      return `text-shadow: ${horizontal}px ${vertical}px ${blur}px ${color} ${important};`;
    } else {
      return "";
    }
  } else {
    return "";
  }
}

/**
 * проверяет наличичие значения creative_media
 * @return {string}
 * @param {{}} controller
 */
export function creativeLinkStyled(controller = {}) {
  if (controller) {
    return ``;
  } else {
    return "";
  }
}

/**
 * проверяет наличичие значения media, в основном используется для background-image
 * @return {string}
 * @param {{}} controller
 */
export function mediaStyled(controller = {}) {
  if (controller?.url) {
    return `background-image: url("${controller.url}");`;
  } else {
    return "";
  }
}

/**
 * принимает настройки виджета settings и принимает массив стилей для преобразования в строку css для styled-components
 * @return {string}
 * @param {[]} styles - массив стилей
 * @param {{}} settings - настройки виджета
 * @param {{}} other - дополнительные настройки функции
 */
export function styledString(styles, settings, other={}) {
  let stringStyles = "";
  if(_.keys(settings).length !== 0) {
    styles.forEach((style, idx) => {
      if(_.isString(style)) {
        if(style !== "}") {
          if(style.split('')[0] === "." || style.split('')[0] === "&") {
            stringStyles += `${style} {`;
          } else if(style.split("")[0] === "!") {
            let styleModify = style.split("");
            styleModify.shift();
            stringStyles += `${_.join(styleModify, "")}{`
          } else {
            stringStyles += `& .${style}{`;
          }
        } else {
          stringStyles += `}`;
        }
      } else {
        if (_.isArray(style)) {
          let settingName = style[1];

          if(other.settingsPrefix) {
            settingName = other.settingsPrefix + settingName
          }

          const state = style[3] || "";
          const variable = getResponsiveSetting(
            settings,
            settingName,
            state,
          );
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
              if(sliderStyled(variable)) {
                stringStyles += `${style[0]}:${sliderStyled(variable)};`;
              }
              break;
            case "shadow":
              stringStyles += shadowStyled(variable);
              break;
            case "text-shadow":
              stringStyles += textShadowStyled(variable);
              break;
            case "media":
              stringStyles += mediaStyled(variable);
              break;
            case "creative-link":
              stringStyles += creativeLinkStyled(variable);
              break;
            default:
              if (defaultStyled(variable)) {
                stringStyles += `${style[0]}:${defaultStyled(
                  variable
                )};`;
              }
          }
        }

        if (_.isFunction(style)) {
          if(style()) {
            stringStyles += style();
          }
        }
      }
    });
  }

  return stringStyles;
}
