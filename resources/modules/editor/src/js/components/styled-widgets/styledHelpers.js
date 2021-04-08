// gradientController.isWithGradient

import {getResponsiveSetting} from "../../../../../front-app/src/js/helpers";
import {isArray} from "leaflet/src/core/Util";

export function dimensionsStyled(controller, style) {
  const unit = controller.unit || "px";
  const left = controller.left || 0;
  const right = controller.right || 0;
  const bottom = controller.bottom || 0;
  const top = controller.top || 0;

  if(controller.left || controller.right || controller.bottom || controller.top) {
    return `${style}: ${top + unit} ${right + unit} ${bottom + unit} ${left + unit};`
  } else return "";
};

export function colorStyled(controller, style) {
  if(controller) {
    if(controller.color) {
      return `${style}: ${controller.color};`
    } else return "";
  } else return "";
}

export function gradientStyled(controller) {
  if(controller.isWithGradient) {
    return `background-image: ${controller.value};`;
  } else {
    return ""
  };
}

export function typographicStyled(controller) {
  let typographic = "";

  if(controller) {
    if(controller.family) {
      typographic += `font-family: ${controller.family};`
    };

    if(controller.size) {
      const unit = controller.sizeUnit || "px";
      typographic += `font-size: ${controller.size + unit};`
    };

    if(controller.weight) {
     typographic += `font-weight: ${controller.weight};`
    }

    if(controller.transform) {
      typographic += `text-transform: ${controller.transform};`
    };

    if(controller.style) {
      typographic += `font-style: ${controller.style};`
    };

    if(controller.decoration) {
      typographic += `text-decoration: ${controller.decoration};`
    };

    if(controller.lineHeight) {
      typographic += `line-height: ${controller.lineHeight};`
    };

    if(controller.spacing) {
      typographic += `letter-spacing: ${controller.spacing}px;`
    };

    return typographic
  }

  return typographic
}

export function defaultStyled(controller) {
  if(controller) {
    return controller
  } else {
    return ""
  }
}

export function sliderStyled(controller) {
  if(controller) {
    if(controller.size) {
      const unit = controller.unit || "px";
      return controller.size + unit
    } else return "";
  } else return "";
}

export function styledString(styles, settings) {
  let stringStyles = "";

  styles.forEach(style => {
    if(_.isString(style)) {
      if(style !== "}") {
        stringStyles += `& .${style} {`
      } else {
        stringStyles += `}`
      }
    } else {
      if(_.isArray(style)) {
        const variable = getResponsiveSetting(settings, style[1])
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
            stringStyles += typographicStyled(variable);
            break;
          case "slider":
            stringStyles += `${style[0]}: ${sliderStyled(variable)};`
            break;
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