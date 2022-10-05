import {
  sliderStyled,
  styledString,
  colorPropertyStyled,
  gradientStyled,
  backgroundImageControllerToStyles,
  simplePropertyStyled,
  borderWidthStyled,
  sizeStyled,
  shadowControllerToStyles,
  typographicControllerToStyles,
  iconSizeStyled,
  dimensionsControllerToStyles,
} from "../../../../../../front-app/src/js/helpers/styles";
import {getResponsiveSetting} from"../../../../../../front-app/src/js/helpers";

export function btnStyles(settings) {
  return [
    "altrp-btn-wrapper",

    ["align-items", "button_alignment"],

    "}",

    "altrp-btn",
    // ["flex-direction", "button_icon_position"],
    ["justify-content", "content_alignment"],
    ["margin", "position_margin", "dimensions"],
    ["padding", "position_padding", "dimensions"],
    ["z-index", "position_z_index"],
    ["transition-property", "button_transition_property"],
    () => {
      const value = getResponsiveSetting(settings, "button_transition_duration");

      if(value) {
        return `transition-duration: ${value.size}s;`;
      } else {
        return ''
      }
    },
    ["transition-timing-function", "button_transition_timing"],
    () => {
      const value = getResponsiveSetting(settings, "button_transition_delay");

      if (value) {
        return `transition-delay: ${value.size}s;`;
      } else {
        return ''
      }
    },
    () => {
      const value = getResponsiveSetting(settings, "position_opacity");

      if (value && value?.size) {
        return `opacity: ${value.size};`
      } else {
        return ''
      }
    },
    () => {
      const borderGradient = getResponsiveSetting(settings, "button_style_border_gradient_custom");
      const backgroundColor = getResponsiveSetting(settings, "background_color");
      const gradient = getResponsiveSetting(settings, "gradient");
      if (borderGradient) {
        let bg = backgroundColor?.color ? backgroundColor.color : 'rgba(52, 59, 76, 1)'
        let textareaText = getResponsiveSetting(settings, 'button_style_gradient_text')?.replace(/;/g, '') || ''
        return `background: ${gradient?.isWithGradient ? gradient.value.replace(/;/g, '') : `linear-gradient(${bg},${bg})`} padding-box, ${textareaText} border-box; border-color: transparent;`;
      }
    },
    () => {
      const borderGradient = getResponsiveSetting(settings, "button_style_border_gradient_custom");
      const backgroundColor = getResponsiveSetting(settings, "background_color");
      if (backgroundColor && !borderGradient) {
        return colorPropertyStyled(backgroundColor, 'background');
      }
    },
    () => {
      const borderGradient = getResponsiveSetting(settings, "button_style_border_gradient_custom");
      const gradient = getResponsiveSetting(settings, "gradient");
      if (gradient && !borderGradient) {
        return gradientStyled(gradient);
      }
    },
    () => {
      const borderGradient = getResponsiveSetting(settings, "button_style_border_gradient_custom");
      const borderColor = getResponsiveSetting(settings, "border_color");
      if (borderColor && !borderGradient) {
        return colorPropertyStyled(borderColor, 'border-color');
      }
    },
    // ["background-color", "background_color", "color"],
    // ["", "gradient", "gradient"],
    ["", "background_image", "media"],
    ["border-style", "border_type"],
    ["border-width", "border_width", "dimensions"],
    // ["border-color", "border_color", "color"],
    ["border-radius", "border_radius", "dimensions"],
    ["", "style_background_shadow", "shadow"],
    ["", "font_typographic", "typographic"],
    ["color", "font_color", "color"],

    "&:hover",
    () => {
      const value = getResponsiveSetting(settings, "position_opacity", ':hover');

      if (value && value?.size) {
        return `opacity: ${value.size};`
      } else {
        return ''
      }
    },
    () => {
      const borderGradient = getResponsiveSetting(settings, "button_style_border_gradient_custom", ':hover');
      const backgroundColor = getResponsiveSetting(settings, "background_color", ':hover');
      const gradient = getResponsiveSetting(settings, "gradient", ':hover');
      if (borderGradient) {
        let bg = backgroundColor?.color ? backgroundColor.color : 'rgba(52, 59, 76, 1)'
        let textareaText = getResponsiveSetting(settings, 'button_style_gradient_text', ':hover')?.replace(/;/g, '') || ''
        return `background: ${gradient?.isWithGradient ? gradient.value.replace(/;/g, '') : `linear-gradient(${bg},${bg})`} padding-box, ${textareaText} border-box; border-color: transparent;`;
      }
    },
    () => {
      const borderGradient = getResponsiveSetting(settings, "button_style_border_gradient_custom", ':hover');
      const backgroundColor = getResponsiveSetting(settings, "background_color", ':hover');
      if (backgroundColor && !borderGradient) {
        return colorPropertyStyled(backgroundColor, 'background');
      }
    },
    () => {
      const borderGradient = getResponsiveSetting(settings, "button_style_border_gradient_custom", ':hover');
      const gradient = getResponsiveSetting(settings, "gradient", ':hover');
      if (gradient && !borderGradient) {
        return gradientStyled(gradient);
      }
    },
    () => {
      const borderGradient = getResponsiveSetting(settings, "button_style_border_gradient_custom", ':hover');
      const borderColor = getResponsiveSetting(settings, "border_color", ':hover');
      if (borderColor && !borderGradient) {
        return colorPropertyStyled(borderColor, 'border-color');
      }
    },
    ["margin", "position_margin", "dimensions", ":hover"],
    ["padding", "position_padding", "dimensions", ":hover"],
    // ["background-color", "background_color", "color", ":hover"],
    // ["", "gradient", "gradient", ":hover"],
    ["border-style", "border_type", "", ":hover"],
    ["border-width", "border_width", "dimensions", ":hover"],
    // ["border-color", "border_color", "color", ":hover"],
    ["border-radius", "border_radius", "dimensions", ":hover"],
    ["", "style_background_shadow", "shadow", ":hover"],
    ["color", "font_color", "color", ":hover"],
    ["", "background_image", "media", ":hover"],

    "& .altrp-btn-icon",
    // ["width", "icon_size", "slider", ":hover"],
    // ["height", "icon_size", "slider", ":hover"],

    "& svg",
    ["background-color", "icon_color_background", "color", ":hover"],
    ["width", "icon_size", "slider", ":hover"],
    ["height", "icon_size", "slider", ":hover"],
    "}",

    "& img",
    ["width", "icon_size", "slider", ":hover"],
    ["icon_size", "slider", ":hover"],
    "}",

    "& path",
    ["fill", "icon_color", "color", ":hover"],
    ["stroke", "icon_color_stroke", "color", ":hover"],
    "}",
    "}",
    "}",
  "&.state-disabled",
    () => {
      const value = getResponsiveSetting(settings, "position_opacity", '.state-disabled');

      if (value && value?.size) {
        return `opacity: ${value.size};`
      } else {
        return ''
      }
    },
    ["background-color", "background_color", "color", ".state-disabled"],
    ["", "gradient", "gradient", ".state-disabled"],
    ["border-style", "border_type", "", ".state-disabled"],
    ["border-width", "border_width", "dimensions", ".state-disabled"],
    ["border-color", "border_color", "color", ".state-disabled"],
    ["border-radius", "border_radius", "dimensions", ".state-disabled"],
    ["", "style_background_shadow", "shadow", ".state-disabled"],
    ["color", "font_color", "color", ".state-disabled"],
    ["", "background_image", "media", ".state-disabled"],

    "& .altrp-btn-icon",
    // ["width", "icon_size", "slider", ":hover"],
    // ["height", "icon_size", "slider", ":hover"],

    "& svg",
    ["background-color", "icon_color_background", "color", ".state-disabled"],
    ["width", "icon_size", "slider", ".state-disabled"],
    ["height", "icon_size", "slider", ".state-disabled"],
    "}",

    "& img",
    ["width", "icon_size", "slider", ".state-disabled"],
    ["icon_size", "slider", ".state-disabled"],
    "}",

    "& path",
    ["fill", "icon_color", "color", ".state-disabled"],
    ["stroke", "icon_color_stroke", "color", ".state-disabled"],
    "}",
    "}",
    "}",

    "& .altrp-btn-icon",
    ["padding", "icon_padding", "dimensions"],
    // ["width", "icon_size", "slider"],
    // ["height", "icon_size", "slider"],

    "& svg",
    ["background-color", "icon_color_background", "color"],
    ["width", "icon_size", "slider"],
    ["height", "icon_size", "slider"],
    "}",

    "& img",
    ["width", "icon_size", "slider"],
    ["height", "icon_size", "slider"],
    ["icon_size", "slider"],
    "}",

    "& path",
    ["fill", "icon_color", "cbackground_positionolor"],
    ["stroke", "icon_color_stroke", "color"],
    "}",
    "}",

    "}",

    "altrp-background-image_btn",
    ["background-position", "background_position", "simplePropertyStyled"],
    ["background-attachment", "background_attachment"],
    ["background-repeat", "background_repeat"],
    () => {
      const backgroundSizeInUnit = getResponsiveSetting(settings, "background_image_width");
      const backgroundSize = getResponsiveSetting(settings, "background_size");

      if (backgroundSizeInUnit && backgroundSize === "") {
        return sizeStyled(backgroundSizeInUnit, 'background-size');
      } else {
        return '';
      }
    },

    () => {
      const backgroundSize = getResponsiveSetting(settings, "background_size");

      if (backgroundSize !== "") {
        return simplePropertyStyled(backgroundSize, "background-size");
      } else {
        return '';
      }
    },
    // ["background-size", "background_size"],

    "}",

    "altrp-background-image_btn:hover",
    ["background-position", "background_position", "simplePropertyStyled", ":hover"],
    ["background-attachment", "background_attachment", "", ":hover"],
    ["background-repeat", "background_repeat", "", ":hover"],
    () => {
      const backgroundSizeInUnit = getResponsiveSetting(settings, "background_image_width", ":hover");
      const backgroundSize = getResponsiveSetting(settings, "background_size", ":hover");

      if (backgroundSizeInUnit && backgroundSize === "") {
        return sizeStyled(backgroundSizeInUnit, 'background-size');
      } else {
        return '';
      }
    },
    () => {
      const backgroundSize = getResponsiveSetting(settings, "background_size", ":hover");

      if (backgroundSize !== "") {
        return simplePropertyStyled(backgroundSize, "background-size");
      } else {
        return '';
      }
    },
    // ["background-size", "background_size", "", ":hover"],

    "}",

    "altrp-btn .altrp-btn-icon-right",
    ['padding', 'icon_padding_right', 'dimensions'],
    ['margin', 'icon_margin_right', 'dimensions'],
    () => {
      const iconRightSizeBtn = getResponsiveSetting(settings, 'icon_size_right');

      if (iconRightSizeBtn) {
        return iconSizeStyled(iconRightSizeBtn);
      }
    },

    "}",

    "altrp-btn .altrp-btn-icon-right svg",
    () => {
      const iconRightSizeBtn = getResponsiveSetting(settings, 'icon_size_right');
      if (iconRightSizeBtn) {
        return 'width: 100%; height: 100%;'
      }
    },
    "}",

    "altrp-btn:hover .altrp-btn-icon-right",
    ['padding', 'icon_padding_right', 'dimensions', ':hover'],
    ['margin', 'icon_margin_right', 'dimensions', ':hover'],
    () => {
      const iconRightSizeBtn = getResponsiveSetting(settings, 'icon_size_right', ':hover');

      if (iconRightSizeBtn) {
        return  iconSizeStyled(iconRightSizeBtn);
      }
    },

    "}",

    "altrp-btn:hover .altrp-btn-icon-right svg",
    () => {
      const iconRightSizeBtn = getResponsiveSetting(settings, 'icon_size_right', ':hover');
      if (iconRightSizeBtn) {
        return 'width: 100%; height: 100%;'
      }
    },
    "}",

    "altrp-btn .altrp-btn-icon-left",
    ['padding', 'icon_padding_left', 'dimensions'],
    ['margin', 'icon_margin_left', 'dimensions'],
    () => {
      const iconLeftSizeBtn = getResponsiveSetting(settings, 'icon_size_left');

      if (iconLeftSizeBtn) {
        return iconSizeStyled(iconLeftSizeBtn);
      }
    },

    "}",

    "altrp-btn .altrp-btn-icon-left svg",
    () => {
      const iconLeftSizeBtn = getResponsiveSetting(settings, 'icon_size_left');
      if (iconLeftSizeBtn) {
        return 'width: 100%; height: 100%;'
      }
    },
    "}",

    "altrp-btn:hover .altrp-btn-icon-left",
    ['padding', 'icon_padding_left', 'dimensions', ':hover'],
    ['margin', 'icon_margin_left', 'dimensions', ':hover'],
    () => {
      const iconLeftSizeBtn = getResponsiveSetting(settings, 'icon_size_left', ':hover');

      if (iconLeftSizeBtn) {
        return iconSizeStyled(iconLeftSizeBtn);
      }
    },

    "}",

    "altrp-btn:hover .altrp-btn-icon-left svg",
    () => {
      const iconLeftSizeBtn = getResponsiveSetting(settings, 'icon_size_left', ':hover');
      if (iconLeftSizeBtn) {
        return 'width: 100%; height: 100%;'
      }
    },
    "}",

    "altrp-btn .altrp-btn-icon-top",
    ['padding', 'icon_padding_top', 'dimensions'],
    ['margin', 'icon_margin_top', 'dimensions'],
    () => {
      const iconTopSizeBtn = getResponsiveSetting(settings, 'icon_size_top');

      if (iconTopSizeBtn) {
        return iconSizeStyled(iconTopSizeBtn);
      }
    },

    "}",

    "altrp-btn .altrp-btn-icon-top svg",
    () => {
      const iconTopSizeBtn = getResponsiveSetting(settings, 'icon_size_top');
      if (iconTopSizeBtn) {
        return 'width: 100%; height: 100%;'
      }
    },
    "}",

    "altrp-btn:hover .altrp-btn-icon-top",
    ['padding', 'icon_padding_top', 'dimensions', ':hover'],
    ['margin', 'icon_margin_top', 'dimensions', ':hover'],
    () => {
      const iconTopSizeBtn = getResponsiveSetting(settings, 'icon_size_top', ':hover');

      if (iconTopSizeBtn) {
        return iconSizeStyled(iconTopSizeBtn);
      }
    },

    "}",

    "altrp-btn:hover .altrp-btn-icon-top svg",
    () => {
      const iconTopSizeBtn = getResponsiveSetting(settings, 'icon_size_top', ':hover');
      if (iconTopSizeBtn) {
        return 'width: 100%; height: 100%;'
      }
    },
    "}",

    "altrp-btn .altrp-btn-icon-bottom",
    ['padding', 'icon_padding_bottom', 'dimensions'],
    ['margin', 'icon_margin_bottom', 'dimensions'],
    () => {
      const iconBottomSizeBtn = getResponsiveSetting(settings, 'icon_size_bottom');

      if (iconBottomSizeBtn) {
        return iconSizeStyled(iconBottomSizeBtn);
      }
    },

    "}",

    "altrp-btn .altrp-btn-icon-bottom svg",
    () => {
      const iconBottomSizeBtn = getResponsiveSetting(settings, 'icon_size_bottom');
      if (iconBottomSizeBtn) {
        return 'width: 100%; height: 100%;'
      }
    },
    "}",

    "altrp-btn:hover .altrp-btn-icon-bottom",
    ['padding', 'icon_padding_bottom', 'dimensions', ':hover'],
    ['margin', 'icon_margin_bottom', 'dimensions', ':hover'],
    () => {
      const iconBottomSizeBtn = getResponsiveSetting(settings, 'icon_size_bottom', ':hover');

      if (iconBottomSizeBtn) {
        return iconSizeStyled(iconBottomSizeBtn);
      }
    },

    "}",

    "altrp-btn:hover .altrp-btn-icon-bottom svg",
    () => {
      const iconBottomSizeBtn = getResponsiveSetting(settings, 'icon_size_bottom', ':hover');
      if (iconBottomSizeBtn) {
        return 'width: 100%; height: 100%;'
      }
    },
    "}",
  ]
}

/**
 * @return {string}
 */

export default function ButtonComponent(settings) {

  const styles = [

    ...btnStyles(settings)
  ];

  let stylesInString = '';

  stylesInString += `& .altrp-btn.active {`;

  const backgroundColorActive = getResponsiveSetting(settings, 'background_color', '.active');
  if (backgroundColorActive) {
    stylesInString += colorPropertyStyled(backgroundColorActive, 'background-color');
  }

  const gradientActive = getResponsiveSetting(settings, "gradient", '.active');

  if (gradientActive) {
    stylesInString += gradientStyled(gradientActive);
  }

  const backgroundImageActive = getResponsiveSetting(settings, "background_image", '.active');

  if (backgroundImageActive) {
    stylesInString += backgroundImageControllerToStyles(backgroundImageActive);
  }

  const borderTypeActive = getResponsiveSetting(settings, "border_type", '.active');

  if (borderTypeActive) {
    stylesInString += simplePropertyStyled(borderTypeActive, "border-style");
  }

  const borderWidthActive = getResponsiveSetting(settings, "border_width", '.active');

  if (borderWidthActive) {
    stylesInString += borderWidthStyled(borderWidthActive);
  }

  const borderColorActive = getResponsiveSetting(settings, "border_color", '.active');

  if (borderColorActive) {
    stylesInString += colorPropertyStyled(borderColorActive, "border-color");
  }

  const borderRadiusActive = getResponsiveSetting(settings, "border_radius", '.active');

  if (borderRadiusActive) {
    stylesInString += sizeStyled(borderRadiusActive, "border-radius");
  }

  const boxShadowActive = getResponsiveSetting(settings, 'style_background_shadow', '.active');

  if (boxShadowActive) {
    stylesInString += shadowControllerToStyles(boxShadowActive);
  }

  const typographicActive = getResponsiveSetting(settings, "font_typographic", '.active');

  if (typographicActive) {
    stylesInString += typographicControllerToStyles(typographicActive);
  }

  const colorActive = getResponsiveSetting(settings, 'font_color', '.active');

  if (colorActive) {
    stylesInString += colorPropertyStyled(colorActive, 'color');
  }

  stylesInString += `} `;

  stylesInString += `& .altrp-btn.active svg {`;

  const backgroundColorSvgActive = getResponsiveSetting(settings, 'icon_color_background', '.active');

  if (backgroundColorSvgActive) {
    stylesInString += colorPropertyStyled(backgroundColorSvgActive, 'background-color');
  }

  stylesInString += `} `;

  stylesInString += `& .altrp-btn.active path {`;

  const fillColorSvgActive = getResponsiveSetting(settings, 'icon_color', '.active');

  if (fillColorSvgActive) {
    stylesInString += colorPropertyStyled(fillColorSvgActive, 'fill');
  }

  const strokeColorSvgActive = getResponsiveSetting(settings, 'icon_color_stroke', '.active');

  if (strokeColorSvgActive) {
    stylesInString += colorPropertyStyled(strokeColorSvgActive, 'stroke');
  }

  stylesInString += `} `;

  stylesInString += `& .altrp-btn svg {`;

  const backgroundColorSvg = getResponsiveSetting(settings, 'icon_color_background');

  if (backgroundColorSvg) {
    stylesInString += colorPropertyStyled(backgroundColorSvg, 'background-color');
  }

  stylesInString += `} `;

  stylesInString += `& .altrp-btn:hover svg {`;

  const backgroundColorSvgHover = getResponsiveSetting(settings, 'icon_color_background', ':hover');

  if (backgroundColorSvgHover) {
    stylesInString += colorPropertyStyled(backgroundColorSvgHover, 'background-color');
  }

  stylesInString += `} `;

  stylesInString += `& .altrp-btn path {`;

  const fillColorSvg = getResponsiveSetting(settings, 'icon_color');

  if (fillColorSvg) {
    stylesInString += colorPropertyStyled(fillColorSvg, 'fill');
  }

  const strokeColorSvg = getResponsiveSetting(settings, 'icon_color_stroke');

  if (strokeColorSvg) {
    stylesInString += colorPropertyStyled(strokeColorSvg, 'stroke');
  }

  stylesInString += `} `;

  stylesInString += `& .altrp-btn:hover path {`;

  const fillColorSvgHover = getResponsiveSetting(settings, 'icon_color', ':hover');

  if (fillColorSvgHover) {
    stylesInString += colorPropertyStyled(fillColorSvgHover, 'fill');
  }

  const strokeColorSvgHover = getResponsiveSetting(settings, 'icon_color_stroke', ':hover');

  if (strokeColorSvgHover) {
    stylesInString += colorPropertyStyled(strokeColorSvgHover, 'stroke');
  }

  stylesInString += `} `;

  stylesInString += styledString(styles, settings);

  return stylesInString;
}
