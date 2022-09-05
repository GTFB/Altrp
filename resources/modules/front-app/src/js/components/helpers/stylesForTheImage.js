import getResponsiveSetting from "../../functions/getResponsiveSetting";
import {
    dimensionsControllerToStyles,
    gradientStyled,
    filtersControllerToStyles,
    simplePropertyStyled,
    colorPropertyStyled,
    sizeStyled,
    opacityStyled,
    borderWidthStyled,
    backgroundImageControllerToStyles,
  } from "../../helpers/styles";


const getImageStyles = (settings,id)=>{
    let styles = '';

    let objectFit, height, width, margin, padding, zIndex, opacity, borderType, filters;
    let borderWidth, borderColor, borderRadius, transitionDuration, animationDuration, backgroundColor, backgroundColorHover, gradient;
    let justifyContent;
    let backgroundImage, backgroundPosition, backgroundAttachment, backgroundRepeat,backgroundSizeInUnit, backgroundSize;

    const parentClass = `.altrp-element${id}`;

    styles += `${parentClass} .altrp-image {`;

     //Получаем значения object-fit из контроллера, обрабатываем и добавляем в styles

     if (settings !== undefined) {
        objectFit = getResponsiveSetting(settings, 'image_fit_size');
      }

      if (objectFit) {
        styles += simplePropertyStyled(objectFit, 'object-fit');
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

      //Получаем значения filters из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        filters = getResponsiveSetting(settings, 'image_style_text_shadow');
      }

      if (filters) {
        styles += filtersControllerToStyles(filters);
      }

      //Получаем значения height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        height = getResponsiveSetting(settings, 'height_size');
      }

      if (height) {
        if(height.size !== "0") {
          styles += sizeStyled(height, 'height');

        } else {

        }
      }

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles
      //Свойство margin было убрано из Контроллера у виджета Image. Перенес сюда на всякий случай, так как были активные rules в Image.js

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
        opacity = getResponsiveSetting(settings, 'opacity_overlay');
      }

      if (opacity) {
        styles += opacityStyled(opacity);
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

      //Получаем значения transition-duration в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        transitionDuration = getResponsiveSetting(settings, 'creative_hover_controller');
      }

      if (transitionDuration) {
        styles += sizeStyled(transitionDuration, 'transition-duration');
      }

      //Получаем значения animation-duration в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        animationDuration = getResponsiveSetting(settings, 'creative_hover_controller');
      }

      if (animationDuration) {
        styles += sizeStyled(animationDuration, 'animation-duration');
      }

      styles += `} `;

  styles += `${parentClass} .state-disabled .altrp-image {`;

  //state disabled
  if (settings !== undefined) {
    objectFit = getResponsiveSetting(settings, 'image_fit_size', '.state-disabled');
  }
  if (objectFit) {
    styles += simplePropertyStyled(objectFit, 'object-fit');
  }
  if (settings !== undefined) {
    backgroundColor = getResponsiveSetting(settings, 'background_color', '.state-disabled');
  }
  if (backgroundColor) {
    styles += colorPropertyStyled(backgroundColor, 'background-color');
  }
  if (settings !== undefined) {
    gradient = getResponsiveSetting(settings, 'gradient', '.state-disabled');
  }
  if (gradient) {
    styles += gradientStyled(gradient);
  }
  if (settings !== undefined) {
    filters = getResponsiveSetting(settings, 'image_style_text_shadow', '.state-disabled');
  }
  if (filters) {
    styles += filtersControllerToStyles(filters);
  }
  if (settings !== undefined) {
    height = getResponsiveSetting(settings, 'height_size', '.state-disabled');
  }
  if (height) {
    if(height.size !== "0") {
      styles += sizeStyled(height, 'height');
    } else {

    }
  }
  if (settings !== undefined) {
    margin = getResponsiveSetting(settings, 'position_margin', '.state-disabled');
  }
  if (margin) {
    styles += dimensionsControllerToStyles(margin, 'margin');
  }
  if (settings !== undefined) {
    padding = getResponsiveSetting(settings, 'position_padding', '.state-disabled');
  }
  if (padding) {
    styles += dimensionsControllerToStyles(padding);
  }
  if (settings !== undefined) {
    zIndex = getResponsiveSetting(settings, 'position_z_index', '.state-disabled');
  }
  if (zIndex) {
    styles += simplePropertyStyled(zIndex, 'z-index');
  }
  if (settings !== undefined) {
    opacity = getResponsiveSetting(settings, 'opacity_overlay', '.state-disabled');
  }
  if (opacity) {
    styles += opacityStyled(opacity);
  }
  if (settings !== undefined) {
    borderType = getResponsiveSetting(settings, 'border_type', '.state-disabled');
  }
  if (borderType) {
    styles += simplePropertyStyled(borderType, 'border-style');
  }
  if (settings !== undefined) {
    borderWidth = getResponsiveSetting(settings, 'border_width', '.state-disabled');
  }
  if (borderWidth) {
    styles += borderWidthStyled(borderWidth);
  }
  if (settings !== undefined) {
    borderColor = getResponsiveSetting(settings, 'border_color', '.state-disabled');
  }
  if (borderColor) {
    styles += colorPropertyStyled(borderColor, 'border-color');
  }
  if (settings !== undefined) {
    borderRadius = getResponsiveSetting(settings, 'border_radius', '.state-disabled');
  }
  if (borderRadius) {
    styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
  }
  if (settings !== undefined) {
    transitionDuration = getResponsiveSetting(settings, 'creative_hover_controller', '.state-disabled');
  }
  if (transitionDuration) {
    styles += sizeStyled(transitionDuration, 'transition-duration');
  }
  if (settings !== undefined) {
    animationDuration = getResponsiveSetting(settings, 'creative_hover_controller', '.state-disabled');
  }
  if (animationDuration) {
    styles += sizeStyled(animationDuration, 'animation-duration');
  }

  styles += `} `

  //state active
  if (settings !== undefined) {
    objectFit = getResponsiveSetting(settings, 'image_fit_size', '.active');
  }
  if (objectFit) {
    styles += simplePropertyStyled(objectFit, 'object-fit');
  }
  if (settings !== undefined) {
    backgroundColor = getResponsiveSetting(settings, 'background_color', '.active');
  }
  if (backgroundColor) {
    styles += colorPropertyStyled(backgroundColor, 'background-color');
  }
  if (settings !== undefined) {
    gradient = getResponsiveSetting(settings, 'gradient', '.active');
  }
  if (gradient) {
    styles += gradientStyled(gradient);
  }
  if (settings !== undefined) {
    filters = getResponsiveSetting(settings, 'image_style_text_shadow', '.active');
  }
  if (filters) {
    styles += filtersControllerToStyles(filters);
  }
  if (settings !== undefined) {
    height = getResponsiveSetting(settings, 'height_size', '.active');
  }
  if (height) {
    if(height.size !== "0") {
      styles += sizeStyled(height, 'height');
    } else {

    }
  }
  if (settings !== undefined) {
    margin = getResponsiveSetting(settings, 'position_margin', '.active');
  }
  if (margin) {
    styles += dimensionsControllerToStyles(margin, 'margin');
  }
  if (settings !== undefined) {
    padding = getResponsiveSetting(settings, 'position_padding', '.active');
  }
  if (padding) {
    styles += dimensionsControllerToStyles(padding);
  }
  if (settings !== undefined) {
    zIndex = getResponsiveSetting(settings, 'position_z_index', '.active');
  }
  if (zIndex) {
    styles += simplePropertyStyled(zIndex, 'z-index');
  }
  if (settings !== undefined) {
    opacity = getResponsiveSetting(settings, 'opacity_overlay', '.active');
  }
  if (opacity) {
    styles += opacityStyled(opacity);
  }
  if (settings !== undefined) {
    borderType = getResponsiveSetting(settings, 'border_type', '.active');
  }
  if (borderType) {
    styles += simplePropertyStyled(borderType, 'border-style');
  }
  if (settings !== undefined) {
    borderWidth = getResponsiveSetting(settings, 'border_width', '.active');
  }
  if (borderWidth) {
    styles += borderWidthStyled(borderWidth);
  }
  if (settings !== undefined) {
    borderColor = getResponsiveSetting(settings, 'border_color', '.active');
  }
  if (borderColor) {
    styles += colorPropertyStyled(borderColor, 'border-color');
  }
  if (settings !== undefined) {
    borderRadius = getResponsiveSetting(settings, 'border_radius', '.active');
  }
  if (borderRadius) {
    styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
  }
  if (settings !== undefined) {
    transitionDuration = getResponsiveSetting(settings, 'creative_hover_controller', '.active');
  }
  if (transitionDuration) {
    styles += sizeStyled(transitionDuration, 'transition-duration');
  }
  if (settings !== undefined) {
    animationDuration = getResponsiveSetting(settings, 'creative_hover_controller', '.active');
  }
  if (animationDuration) {
    styles += sizeStyled(animationDuration, 'animation-duration');
  }

  styles += `} `;

      styles += `${parentClass} .altrp-image:hover {`;

      //Получаем значения object-fit из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        objectFit = getResponsiveSetting(settings, 'image_fit_size', ':hover');
      }

      if (objectFit) {
        styles += simplePropertyStyled(objectFit, 'object-fit');
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

      //Получаем значения filters из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        filters = getResponsiveSetting(settings, 'image_style_text_shadow', ':hover');
      }

      if (filters) {
        styles += filtersControllerToStyles(filters);
      }

      //Получаем значения height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        height = getResponsiveSetting(settings, 'height_size', ':hover');
      }

      if (height) {
        if(height.size !== "0") {
          styles += sizeStyled(height, 'height');
        }
      }

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles
      //Свойство margin было убрано из Контроллера у виджета Image. Перенес сюда на всякий случай, так как были активные rules в Image.js

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
        opacity = getResponsiveSetting(settings, 'opacity_overlay', ':hover');
      }

      if (opacity) {
        styles += opacityStyled(opacity);
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

      //Получаем значения transition-duration в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        transitionDuration = getResponsiveSetting(settings, 'creative_hover_controller', ':hover');
      }

      if (transitionDuration) {
        styles += sizeStyled(transitionDuration, 'transition-duration');
      }

      //Получаем значения animation-duration в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        animationDuration = getResponsiveSetting(settings, 'creative_hover_controller', ':hover');
      }

      if (animationDuration) {
        styles += sizeStyled(animationDuration, 'animation-duration');
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-image-container,${parentClass} .altrp-image-container a {`;

      //Получаем значения justify-content из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        justifyContent = getResponsiveSetting(settings, 'image_style_alignment');
      }

      if (justifyContent) {
        styles += 'display:flex;'
        styles += simplePropertyStyled(justifyContent, 'justify-content');
      }

      styles+="} ";
//state disabled
  styles+=`${parentClass} .state-disabled .altrp-image-container,${parentClass} .altrp-image-container a {`;
  if (settings !== undefined) {
    justifyContent = getResponsiveSetting(settings, 'image_style_alignment', '.state-disabled');
  }
  if (justifyContent) {
    styles += 'display:flex;'
    styles += simplePropertyStyled(justifyContent, 'justify-content');
  }

  styles+="} ";

  //state active
  styles+=`${parentClass} .active .altrp-image-container,${parentClass} .altrp-image-container a {`;
  if (settings !== undefined) {
    justifyContent = getResponsiveSetting(settings, 'image_style_alignment', '.active');
  }
  if (justifyContent) {
    styles += 'display:flex;'
    styles += simplePropertyStyled(justifyContent, 'justify-content');
  }

  styles+="} ";


      styles+=`${parentClass} .altrp-background-image-widget {`;

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

      //Получаем значения background-size в конкретных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundSizeInUnit = getResponsiveSetting(settings, 'background_image_width');
      }

      if (backgroundSizeInUnit) {
        styles += sizeStyled(backgroundSizeInUnit, 'background-size');
      }

      //Получаем значения background-size из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundSize = getResponsiveSetting(settings, 'background_size');
      }

      if (backgroundSize) {
        styles += simplePropertyStyled(backgroundSize, 'background-size');
      }

      styles+="} ";
//state disabled
  styles+=`${parentClass} .state-disabled .altrp-background-image-widget {`;
  if (settings !== undefined) {
    backgroundImage = getResponsiveSetting(settings, 'background_image', '.state-disabled');
  }
  if (backgroundImage) {
    styles += backgroundImageControllerToStyles(backgroundImage);
  }
  if (settings !== undefined) {
    backgroundPosition = getResponsiveSetting(settings, 'background_position', '.state-disabled');
  }
  if (backgroundPosition) {
    styles += simplePropertyStyled(backgroundPosition, 'background-position');
  }
  if (settings !== undefined) {
    backgroundAttachment = getResponsiveSetting(settings, 'background_attachment', '.state-disabled');
  }
  if (backgroundAttachment) {
    styles += simplePropertyStyled(backgroundAttachment, 'background-attachment');
  }
  if (settings !== undefined) {
    backgroundRepeat = getResponsiveSetting(settings, 'background_repeat', '.state-disabled');
  }
  if (backgroundRepeat) {
    styles += simplePropertyStyled(backgroundRepeat, 'background-repeat');
  }
  if (settings !== undefined) {
    backgroundSizeInUnit = getResponsiveSetting(settings, 'background_image_width', '.state-disabled');
  }
  if (backgroundSizeInUnit) {
    styles += sizeStyled(backgroundSizeInUnit, 'background-size');
  }
  if (settings !== undefined) {
    backgroundSize = getResponsiveSetting(settings, 'background_size', '.state-disabled');
  }
  if (backgroundSize) {
    styles += simplePropertyStyled(backgroundSize, 'background-size');
  }
  styles+="} ";

  //state disabled
  styles+=`${parentClass} .state-disabled .altrp-background-image-widget {`;
  if (settings !== undefined) {
    backgroundImage = getResponsiveSetting(settings, 'background_image', '.state-disabled');
  }
  if (backgroundImage) {
    styles += backgroundImageControllerToStyles(backgroundImage);
  }
  if (settings !== undefined) {
    backgroundPosition = getResponsiveSetting(settings, 'background_position', '.state-disabled');
  }
  if (backgroundPosition) {
    styles += simplePropertyStyled(backgroundPosition, 'background-position');
  }
  if (settings !== undefined) {
    backgroundAttachment = getResponsiveSetting(settings, 'background_attachment', '.state-disabled');
  }
  if (backgroundAttachment) {
    styles += simplePropertyStyled(backgroundAttachment, 'background-attachment');
  }
  if (settings !== undefined) {
    backgroundRepeat = getResponsiveSetting(settings, 'background_repeat', '.state-disabled');
  }
  if (backgroundRepeat) {
    styles += simplePropertyStyled(backgroundRepeat, 'background-repeat');
  }
  if (settings !== undefined) {
    backgroundSizeInUnit = getResponsiveSetting(settings, 'background_image_width', '.state-disabled');
  }
  if (backgroundSizeInUnit) {
    styles += sizeStyled(backgroundSizeInUnit, 'background-size');
  }
  if (settings !== undefined) {
    backgroundSize = getResponsiveSetting(settings, 'background_size', '.state-disabled');
  }
  if (backgroundSize) {
    styles += simplePropertyStyled(backgroundSize, 'background-size');
  }
  styles+="} ";

  //state active
  styles+=`${parentClass} .active .altrp-background-image-widget {`;
  if (settings !== undefined) {
    backgroundImage = getResponsiveSetting(settings, 'background_image', '.active');
  }
  if (backgroundImage) {
    styles += backgroundImageControllerToStyles(backgroundImage);
  }
  if (settings !== undefined) {
    backgroundPosition = getResponsiveSetting(settings, 'background_position', '.active');
  }
  if (backgroundPosition) {
    styles += simplePropertyStyled(backgroundPosition, 'background-position');
  }
  if (settings !== undefined) {
    backgroundAttachment = getResponsiveSetting(settings, 'background_attachment', '.active');
  }
  if (backgroundAttachment) {
    styles += simplePropertyStyled(backgroundAttachment, 'background-attachment');
  }
  if (settings !== undefined) {
    backgroundRepeat = getResponsiveSetting(settings, 'background_repeat', '.active');
  }
  if (backgroundRepeat) {
    styles += simplePropertyStyled(backgroundRepeat, 'background-repeat');
  }
  if (settings !== undefined) {
    backgroundSizeInUnit = getResponsiveSetting(settings, 'background_image_width', '.active');
  }
  if (backgroundSizeInUnit) {
    styles += sizeStyled(backgroundSizeInUnit, 'background-size');
  }
  if (settings !== undefined) {
    backgroundSize = getResponsiveSetting(settings, 'background_size', '.active');
  }
  if (backgroundSize) {
    styles += simplePropertyStyled(backgroundSize, 'background-size');
  }
  styles+="} ";


      styles+=`${parentClass} .altrp-background-image-widget:hover {`;

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

      //Получаем значения background-size в конкретных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundSizeInUnit = getResponsiveSetting(settings, 'background_image_width', ':hover');
      }

      if (backgroundSizeInUnit) {
        styles += sizeStyled(backgroundSizeInUnit, 'background-size');
      }

      //Получаем значения background-size из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundSize = getResponsiveSetting(settings, 'background_size', ':hover');
      }

      if (backgroundSize) {
        styles += simplePropertyStyled(backgroundSize, 'background-size');
      }

      styles+="} ";

      let aspect_ratio_size;

      if (settings !== undefined) {
        aspect_ratio_size = getResponsiveSetting(settings, 'aspect_ratio_size');
        if(Number(aspect_ratio_size) !== 0) {
            styles+= 'padding:0;';
        }
        else{
            padding = getResponsiveSetting(settings, 'position_padding');
            styles +=dimensionsControllerToStyles(padding);
        }
      }

  height = getResponsiveSetting(settings, 'height_size');
  if (height) {
    if(height.size !== "0") {
      styles += `${parentClass} .altrp-image-placeholder.altrp-image-placeholder {${sizeStyled(height, 'height')}}`
    }
  }
  height = getResponsiveSetting(settings, 'height_size');
  if (height) {
    if(height.size !== "0") {
      styles += `${parentClass} .altrp-image-placeholder.altrp-image-placeholder:hover {${sizeStyled(height, 'height',':hover')}}`
    }
  }
  height = getResponsiveSetting(settings, 'height_size', '.active');
  if (height) {
    if(height.size !== "0") {
      styles += `${parentClass} .active .altrp-image-placeholder.altrp-image-placeholder {${sizeStyled(height, 'height')}}`
    }
  }
  height = getResponsiveSetting(settings, 'height_size');
  if (height) {
    if(height.size !== "0") {
      styles += `${parentClass} .state-disabled .altrp-image-placeholder.altrp-image-placeholder {${sizeStyled(height, 'height', '.state-disabled')}}`
    }
  }

  width = getResponsiveSetting(settings, 'width_size');
  if (width) {
    if(width.size !== "0") {
      styles += `${parentClass} .altrp-image-placeholder.altrp-image-placeholder {${sizeStyled(width, 'width')}}`
    }
  }
  width = getResponsiveSetting(settings, 'width_size');
  if (width) {
    if(width.size !== "0") {
      styles += `${parentClass} .altrp-image-placeholder.altrp-image-placeholder:hover {${sizeStyled(width, 'width',':hover')}}`
    }
  }
  width = getResponsiveSetting(settings, 'width_size', '.active');
  if (width) {
    if(width.size !== "0") {
      styles += `${parentClass} .active .altrp-image-placeholder.altrp-image-placeholder {${sizeStyled(width, 'width')}}`
    }
  }
  width = getResponsiveSetting(settings, 'width_size');
  if (width) {
    if(width.size !== "0") {
      styles += `${parentClass} .state-disabled .altrp-image-placeholder.altrp-image-placeholder {${sizeStyled(width, 'width', '.state-disabled')}}`
    }
  }
      return styles;
}

export default getImageStyles;
