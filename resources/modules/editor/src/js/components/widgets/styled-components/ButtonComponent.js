import styled from "styled-components";
import { getResponsiveSetting } from "../../../../../../front-app/src/js/helpers";
import {
  simplePropertyStyled,
  borderWidthStyled,
  colorPropertyStyled,
  dimensionsControllerToStyles,
  typographicControllerToStyles,
  sizeStyled,
  opacityStyled,
  gradientStyled,
  backgroundImageControllerToStyles,
  shadowControllerToStyles,
  backgroundCreativeLinkStyled,
} from "../../../../../../front-app/src/js/helpers/styles";

export default styled.div`

  && .altrp-element,
  && .altrp-dropbar {

    ${props => {

      const { settings } = props;
      let styles = '';

      let alignItems;

      //Получаем значения align-items из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        alignItems = getResponsiveSetting(settings, 'button_alignment');
      }

      if (alignItems) {
        styles += simplePropertyStyled(alignItems, 'align-items');
      }

      return styles;

    }
    }
  } 

  && .altrp-btn {

    ${props => {

      const { settings } = props;
      let styles = '';

      let flexDirection, margin, padding, zIndex, opacity, backgroundColor, gradient, borderType, borderWidth, borderColor, borderRadius, boxShadow, typographic, color;
      let transitionProperty, transitionDuration, transitionTiming, transitionDelay;

      //Получаем значения flex-direction из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        flexDirection = getResponsiveSetting(settings, 'button_icon_position');
      }

      if (flexDirection) {
        styles += simplePropertyStyled(flexDirection, 'flex-direction');
      }

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'position_margin');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'position_padding');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения z-index из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        zIndex = getResponsiveSetting(settings, 'position_z_index');
      }

      if (zIndex) {
        styles += simplePropertyStyled(zIndex, 'z-index');
      }

      //Получаем значения opacity из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        opacity = getResponsiveSetting(settings, 'position_opacity');
      }

      if (opacity) {
        styles += opacityStyled(opacity);
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'background_color');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения gradient из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        gradient = getResponsiveSetting(settings, 'gradient');
      }

      if (gradient) {
        styles += gradientStyled(gradient);
      }

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'border_type');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'border_width');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'border_color');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'border_radius');
      }

      if (borderRadius) {
        styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
      }

      //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        boxShadow = getResponsiveSetting(settings, 'style_background_shadow');
      }

      if (boxShadow) {
        styles += shadowControllerToStyles(boxShadow);
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'font_typographic');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'font_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения transition-property из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        transitionProperty = getResponsiveSetting(settings, 'button_transition_property');
      }

      if (transitionProperty) {
        styles += simplePropertyStyled(transitionProperty, 'transition-property');
      }

      //Получаем значения transition-duration в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        transitionDuration = getResponsiveSetting(settings, 'button_transition_duration');
      }

      if (transitionDuration) {
        styles += sizeStyled(transitionDuration, 'transition-duration');
      }

      //Получаем значения transition-timing-function из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        transitionTiming = getResponsiveSetting(settings, 'button_transition_timing');
      }

      if (transitionTiming) {
        styles += simplePropertyStyled(transitionTiming, 'transition-timing-function');
      }

      //Получаем значения transition-delay в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        transitionDelay = getResponsiveSetting(settings, 'button_transition_delay');
      }

      if (transitionDelay) {
        styles += sizeStyled(transitionDelay, 'transition-delay');
      } 

      return styles;

    }
    }
  } 

  && .altrp-btn:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let flexDirection, margin, padding, zIndex, opacity, backgroundColor, gradient, borderType, borderWidth, borderColor, borderRadius, boxShadow, typographic, color;
      let transitionProperty, transitionDuration, transitionTiming, transitionDelay;

      //Получаем значения flex-direction из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        flexDirection = getResponsiveSetting(settings, 'button_icon_position', ':hover');
      }

      if (flexDirection) {
        styles += simplePropertyStyled(flexDirection, 'flex-direction');
      }

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'position_margin', ':hover');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'position_padding', ':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения z-index из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        zIndex = getResponsiveSetting(settings, 'position_z_index', ':hover');
      }

      if (zIndex) {
        styles += simplePropertyStyled(zIndex, 'z-index');
      }

      //Получаем значения opacity из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        opacity = getResponsiveSetting(settings, 'position_opacity', ':hover');
      }

      if (opacity) {
        styles += opacityStyled(opacity);
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'background_color', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения gradient из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        gradient = getResponsiveSetting(settings, 'gradient', ':hover');
      }

      if (gradient) {
        styles += gradientStyled(gradient);
      }

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'border_type', ':hover');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'border_width', ':hover');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'border_color', ':hover');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'border_radius', ':hover');
      }

      if (borderRadius) {
        styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
      }

      //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        boxShadow = getResponsiveSetting(settings, 'style_background_shadow', ':hover');
      }

      if (boxShadow) {
        styles += shadowControllerToStyles(boxShadow);
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'font_typographic', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'font_color', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения transition-property из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        transitionProperty = getResponsiveSetting(settings, 'button_transition_property', ':hover');
      }

      if (transitionProperty) {
        styles += simplePropertyStyled(transitionProperty, 'transition-property');
      }

      //Получаем значения transition-duration в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        transitionDuration = getResponsiveSetting(settings, 'button_transition_duration', ':hover');
      }

      if (transitionDuration) {
        styles += sizeStyled(transitionDuration, 'transition-duration');
      }

      //Получаем значения transition-timing-function из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        transitionTiming = getResponsiveSetting(settings, 'button_transition_timing', ':hover');
      }

      if (transitionTiming) {
        styles += simplePropertyStyled(transitionTiming, 'transition-timing-function');
      }

      //Получаем значения transition-delay в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        transitionDelay = getResponsiveSetting(settings, 'button_transition_delay', ':hover');
      }

      if (transitionDelay) {
        styles += sizeStyled(transitionDelay, 'transition-delay');
      }

      return styles;

    }
    }
  } 

  && .altrp-btn:after,
  && .altrp-btn:before {

    ${props => {

      const { settings } = props;
      let styles = '';

      let transitionDuration, color, backgroundColor;

      //Получаем значения transition-duration в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        transitionDuration = getResponsiveSetting(settings, 'creative_link_controller');
      }

      if (transitionDuration) {
        styles += sizeStyled(transitionDuration, 'transition-duration');
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'creative_link_controller');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'creative_link_controller');
      }

      if (backgroundColor) {
        styles += backgroundCreativeLinkStyled(backgroundColor);
      }

      return styles;

    }
    }
  } 

  && .altrp-btn:hover::after,
  && .altrp-btn:hover::before {

    ${props => {

      const { settings } = props;
      let styles = '';

      let transitionDuration, color, backgroundColor;

      //Получаем значения transition-duration в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        transitionDuration = getResponsiveSetting(settings, 'creative_link_controller', ':hover');
      }

      if (transitionDuration) {
        styles += sizeStyled(transitionDuration, 'transition-duration');
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'creative_link_controller', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'creative_link_controller', ':hover');
      }

      if (backgroundColor) {
        styles += backgroundCreativeLinkStyled(backgroundColor);
      }

      return styles;

    }
    }
  } 

  && .altrp-background-image {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundImage, backgroundPosition, backgroundAttachment, backgroundRepeat, backgroundSizeInUnits, backgroundSize;

      //Получаем значения background-image из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundImage = getResponsiveSetting(settings, 'background_image');
      }

      if (backgroundImage) {
        styles += backgroundImageControllerToStyles(backgroundImage);
      }

      //Получаем значения background-position из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundPosition = getResponsiveSetting(settings, 'background_position');
      }

      if (backgroundPosition) {
        styles += simplePropertyStyled(backgroundPosition, 'background-position');
      }

      //Получаем значения background-attachment из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundAttachment = getResponsiveSetting(settings, 'background_attachment');
      }

      if (backgroundAttachment) {
        styles += simplePropertyStyled(backgroundAttachment, 'background-attachment');
      }

      //Получаем значения background-repeat из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundRepeat = getResponsiveSetting(settings, 'background_repeat');
      }

      if (backgroundRepeat) {
        styles += simplePropertyStyled(backgroundRepeat, 'background-repeat');
      }

      //Получаем значения background-size в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundSizeInUnits = getResponsiveSetting(settings, 'background_image_width');
      }

      if (backgroundSizeInUnits) {
        styles += sizeStyled(backgroundSizeInUnits, 'background-size');
      }

      //Получаем значения background-size из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundSize = getResponsiveSetting(settings, 'background_size');
      }

      if (backgroundSize) {
        styles += simplePropertyStyled(backgroundSize, 'background-size');
      }

      return styles;

    }
    }
  } 

  && .altrp-background-image:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundImage, backgroundPosition, backgroundAttachment, backgroundRepeat, backgroundSizeInUnits, backgroundSize;

      //Получаем значения background-image из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundImage = getResponsiveSetting(settings, 'background_image', ':hover');
      }

      if (backgroundImage) {
        styles += backgroundImageControllerToStyles(backgroundImage);
      }

      //Получаем значения background-position из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundPosition = getResponsiveSetting(settings, 'background_position', ':hover');
      }

      if (backgroundPosition) {
        styles += simplePropertyStyled(backgroundPosition, 'background-position');
      }

      //Получаем значения background-attachment из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundAttachment = getResponsiveSetting(settings, 'background_attachment', ':hover');
      }

      if (backgroundAttachment) {
        styles += simplePropertyStyled(backgroundAttachment, 'background-attachment');
      }

      //Получаем значения background-repeat из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundRepeat = getResponsiveSetting(settings, 'background_repeat', ':hover');
      }

      if (backgroundRepeat) {
        styles += simplePropertyStyled(backgroundRepeat, 'background-repeat');
      }

      //Получаем значения background-size в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundSizeInUnits = getResponsiveSetting(settings, 'background_image_width', ':hover');
      }

      if (backgroundSizeInUnits) {
        styles += sizeStyled(backgroundSizeInUnits, 'background-size');
      }

      //Получаем значения background-size из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundSize = getResponsiveSetting(settings, 'background_size', ':hover');
      }

      if (backgroundSize) {
        styles += simplePropertyStyled(backgroundSize, 'background-size');
      }

      return styles;

    }
    }
  } 

  && .altrp-btn .altrp-btn-icon {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding;

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'icon_padding');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      return styles;

    }
    }
  } 

  && .altrp-btn:hover .altrp-btn-icon {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding;

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'icon_padding', ':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      return styles;

    }
    }
  } 

  && .altrp-btn .altrp-btn-icon path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconFill;
  
      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles 
  
      if (settings !== undefined) {
        iconFill = getResponsiveSetting(settings, 'icon_color');
      }
  
      if (iconFill) {
        styles += colorPropertyStyled(iconFill, 'fill');
      }

      return styles;

    }
    }
  } 

  && .altrp-btn:hover .altrp-btn-icon path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconFill;
  
      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles 
  
      if (settings !== undefined) {
        iconFill = getResponsiveSetting(settings, 'icon_color', ':hover');
      }
  
      if (iconFill) {
        styles += colorPropertyStyled(iconFill, 'fill');
      }

      return styles;

    }
    }
  } 

  && .altrp-btn .altrp-btn-icon svg {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundColor;

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'icon_color_background');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      return styles;

    }
    }
  } 

  && .altrp-btn:hover .altrp-btn-icon svg {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundColor;

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'icon_color_background', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      return styles;

    }
    }
  } 

  && .altrp-btn .altrp-btn-icon,
  && .altrp-btn .altrp-btn-icon svg,
  && .altrp-btn .altrp-btn-icon img {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconSize;

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles 

      if (settings !== undefined) {
        iconSize = getResponsiveSetting(settings, 'icon_size');
      }

      if (iconSize) {
        styles += iconSizeStyled(iconSize);
      }

      return styles;

    }
    }
  } 

  && .altrp-btn:hover .altrp-btn-icon,
  && .altrp-btn:hover .altrp-btn-icon svg,
  && .altrp-btn:hover .altrp-btn-icon img {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconSize;

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles 

      if (settings !== undefined) {
        iconSize = getResponsiveSetting(settings, 'icon_size', ':hover');
      }

      if (iconSize) {
        styles += iconSizeStyled(iconSize);
      }

      return styles;

    }
    }
  } 

  && .altrp-dropbar-btn-containter {

    ${props => {

      const { settings } = props;
      let styles = '';

      let boxShadow;

      //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        boxShadow = getResponsiveSetting(settings, 'box_shadow_dropbar_content_style');
      }

      if (boxShadow) {
        styles += shadowControllerToStyles(boxShadow);
      }

      return styles;

    }
    }
  } 

  && .altrp-dropbar-btn-containter:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let boxShadow;

      //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        boxShadow = getResponsiveSetting(settings, 'box_shadow_dropbar_content_style', ':hover');
      }

      if (boxShadow) {
        styles += shadowControllerToStyles(boxShadow);
      }      

      return styles;

    }
    }
  } 

  && img {
    max-width: 100%;
  }

`;