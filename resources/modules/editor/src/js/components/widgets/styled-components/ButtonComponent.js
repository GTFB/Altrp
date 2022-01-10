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
import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";

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

      if(value && value.size) {
        return `opacity: ${value.size};`
      } else {
        return ''
      }
    },
    ["background-color", "background_color", "color"],
    ["", "gradient", "gradient"],
    ["", "background_image", "media"],
    ["border-style", "border_type"],
    ["border-width", "border_width", "dimensions"],
    ["border-color", "border_color", "color"],
    ["border-radius", "border_radius", "dimensions"],
    ["", "style_background_shadow", "shadow"],
    ["", "font_typographic", "typographic"],
    ["color", "font_color", "color"],

    "&:hover",
    () => {
      const value = getResponsiveSetting(settings, "position_opacity", ':hover');

      if (value && value.size) {
        return `opacity: ${value.size};`
      } else {
        return ''
      }
    },
    ["background-color", "background_color", "color", ":hover"],
    ["", "gradient", "gradient", ":hover"],
    ["border-style", "border_type", "", ":hover"],
    ["border-width", "border_width", "dimensions", ":hover"],
    ["border-color", "border_color", "color", ":hover"],
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

      if (value && value.size) {
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
    ["icon_size", "slider"],
    "}",

    "& path",
    ["fill", "icon_color", "cbackground_positionolor"],
    ["stroke", "icon_color_stroke", "color"],
    "}",
    "}",

    "}",

    "altrp-background-image",
    ["background-position", ""],
    ["background-attachment", "background_attachment"],
    ["background-repeat", "background_repeat"],
    ["background-size", "background_image_width", "slider"],
    ["background-size", "background_size"],
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

  stylesInString += `& .altrp-btn .altrp-btn-icon-right svg, & .altrp-btn .altrp-btn-icon-right img {`;

  const paddingIconRightBtn = getResponsiveSetting(settings, 'icon_padding_right');

  if (paddingIconRightBtn) {
    stylesInString += dimensionsControllerToStyles(paddingIconRightBtn);
  }

  const iconRightSizeBtn = getResponsiveSetting(settings, 'icon_size_right');

  if (iconRightSizeBtn) {
    stylesInString += iconSizeStyled(iconRightSizeBtn);
  }

  stylesInString += `} `;

  stylesInString += `& .altrp-btn .altrp-btn-icon-left svg, & .altrp-btn .altrp-btn-icon-left img {`;

  const paddingIconLeftBtn = getResponsiveSetting(settings, 'icon_padding_left');

  if (paddingIconLeftBtn) {
    stylesInString += dimensionsControllerToStyles(paddingIconLeftBtn);
  }

  const iconLeftSizeBtn = getResponsiveSetting(settings, 'icon_size_left');

  if (iconLeftSizeBtn) {
    stylesInString += iconSizeStyled(iconLeftSizeBtn);
  }

  stylesInString += `} `;

  stylesInString += `& .altrp-btn .altrp-btn-icon-top svg, & .altrp-btn .altrp-btn-icon-top img {`;

  const paddingIconTopBtn = getResponsiveSetting(settings, 'icon_padding_top');

  if (paddingIconTopBtn) {
    stylesInString += dimensionsControllerToStyles(paddingIconTopBtn);
  }

  const iconTopSizeBtn = getResponsiveSetting(settings, 'icon_size_top');

  if (iconTopSizeBtn) {
    stylesInString += iconSizeStyled(iconTopSizeBtn);
  }

  stylesInString += `} `;

  stylesInString += `& .altrp-btn .altrp-btn-icon-bottom svg, & .altrp-btn .altrp-btn-icon-bottom img {`;

  const paddingIconBottomBtn = getResponsiveSetting(settings, 'icon_padding_bottom');

  if (paddingIconBottomBtn) {
    stylesInString += dimensionsControllerToStyles(paddingIconBottomBtn);
  }

  const iconBottomSizeBtn = getResponsiveSetting(settings, 'icon_size_bottom');

  if (iconBottomSizeBtn) {
    stylesInString += iconSizeStyled(iconBottomSizeBtn);
  }

  stylesInString += `} `;

  stylesInString += styledString(styles, settings);

  return stylesInString;
}
