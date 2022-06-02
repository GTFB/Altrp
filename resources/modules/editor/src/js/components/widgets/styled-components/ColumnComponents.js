import {getResponsiveSetting} from "../../../../../../front-app/src/js/functions/getResponsiveSetting";
import {
  dimensionsControllerToStyles,
  simplePropertyStyled,
  borderWidthStyled,
  colorPropertyStyled,
  sizeStyled,
  gradientStyled,
  shadowStyled,
  backgroundImageControllerToStyles, dimensionsStyled,
} from "../../../../../../front-app/src/js/helpers/styles";

const ColumnComponent = (settings) => {
  let styles = "";

  let flexWrap, flexDirection, align, justifyContent, overflow, backgroundColor, gradient, zIndex, borderType, borderWidth, borderColor, borderRadius, boxShadow;
  let backgroundColorH, gradientH, borderTypeH, borderWidthH, borderColorH, borderRadiusH, boxShadowH;
  let marginBottom, marginBottomH, backgroundImage, backgroundPosition, backgroundAttachment, backgroundRepeat, backgroundSizeInUnits, backgroundSize;
  let backgroundImageH, backgroundPositionH, backgroundAttachmentH, backgroundRepeatH, backgroundSizeInUnitsH, backgroundSizeH, margin, marginH, padding, paddingH, width;

  styles += "& > .altrp-column.altrp-column-priority {";

  //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    padding = getResponsiveSetting(settings, "style_position_padding");
  }

  if (padding) {
    styles += dimensionsControllerToStyles(padding);
  }


  //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    margin = getResponsiveSetting(settings, 'style_position_margin');
  }

  if (margin) {
    styles += dimensionsControllerToStyles(margin, 'margin');
  }

  //Получаем значения flex-wrap из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    flexWrap = getResponsiveSetting(settings, 'layout_flex_wrap_content');
  }

  if (flexWrap) {
    styles += simplePropertyStyled(flexWrap, 'flex-wrap');
  }

  //Получаем значения flex-direction из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    flexDirection = getResponsiveSetting(settings, 'layout_column_direction');
  }

  if (flexDirection) {
    styles += simplePropertyStyled(flexDirection, 'flex-direction');
  }

  //Получаем значения align-content и align-items из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    align = getResponsiveSetting(settings, 'layout_type');
  }

  if (align) {
    styles += simplePropertyStyled(align, 'align-content');
    styles += simplePropertyStyled(align, 'align-items');
  }

  //Получаем значения justify-content из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    justifyContent = getResponsiveSetting(settings, 'layout_justify_content');
  }

  if (justifyContent) {
    styles += simplePropertyStyled(justifyContent, 'justify-content');
  }

  //Получаем значения overflow из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    overflow = getResponsiveSetting(settings, 'layout_overflow');
  }

  if (overflow) {
    styles += simplePropertyStyled(overflow, 'overflow',);
  }

  //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundColor = getResponsiveSetting(settings, 'column_style_background_color');
  }

  if (backgroundColor) {
    styles += colorPropertyStyled(backgroundColor, 'background-color');
  }
  // console.log(settings);
  //Получаем значения gradient из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    gradient = getResponsiveSetting(settings, 'gradient');
  }

  if (gradient) {
    styles += gradientStyled(gradient);
  }

  //Получаем значения z-index из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    zIndex = getResponsiveSetting(settings, 'position_z_index');
  }

  if (zIndex) {
    styles += simplePropertyStyled(zIndex, 'z-index');
  }

  //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderType = getResponsiveSetting(settings, 'column_style_border_type');
  }

  if (borderType) {
    styles += simplePropertyStyled(borderType, 'border-style');
  }

  //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderWidth = getResponsiveSetting(settings, 'column_style_border_width');
  }

  if (borderWidth) {
    styles += borderWidthStyled(borderWidth);
  }

  //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderColor = getResponsiveSetting(settings, 'column_style_border_color');
  }

  if (borderColor) {
    styles += colorPropertyStyled(borderColor, 'border-color');
  }

  //Получаем значения border-radius в точных юнитах из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderRadius = getResponsiveSetting(settings, 'column_style_border_radius');
  }

  if (borderRadius) {
    styles += dimensionsStyled(borderRadius, 'border-radius');
  }

  //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    boxShadow = getResponsiveSetting(settings, 'column_style_box_shadow');
  }

  if (boxShadow) {
    styles += shadowStyled(boxShadow);
  }

  styles += "} ";

  //hover

  styles += "& > div.altrp-column.altrp-column-priority:hover {";


  //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundColorH = getResponsiveSetting(settings, 'column_style_background_color', ':hover');
  }

  if (backgroundColorH) {
    styles += colorPropertyStyled(backgroundColorH, 'background-color');
  }

  //Получаем значения gradient из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    gradientH = getResponsiveSetting(settings, 'gradient', ':hover');
  }

  if (gradientH) {
    styles += gradientStyled(gradientH);
  }

  //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderTypeH = getResponsiveSetting(settings, 'column_style_border_type', ':hover');
  }

  if (borderTypeH) {
    styles += simplePropertyStyled(borderTypeH, 'border-style');
  }

  //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderWidthH = getResponsiveSetting(settings, 'column_style_border_width', ':hover');
  }

  if (borderWidthH) {
    styles += borderWidthStyled(borderWidthH);
  }

  //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderColorH = getResponsiveSetting(settings, 'column_style_border_color', ':hover');
  }

  if (borderColorH) {
    styles += colorPropertyStyled(borderColorH, 'border-color');
  }

  //Получаем значения border-radius в точных юнитах из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderRadiusH = getResponsiveSetting(settings, 'column_style_border_radius', ':hover');
  }

  if (borderRadiusH) {
    styles += dimensionsStyled(borderRadiusH, 'border-radius');
  }

  //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    boxShadowH = getResponsiveSetting(settings, 'column_style_box_shadow', ':hover');
  }

  if (boxShadowH) {
    styles += shadowStyled(boxShadowH);
  }

  styles += "} ";

  styles += "& > .altrp-element:not(:last-child) {";

  if (settings !== undefined) {
    marginBottom = getResponsiveSetting(settings, 'layout_widgets-space');
  }

  if (marginBottom) {
    styles += `margin-bottom: ${marginBottom}px; `;
  }

  styles += "} ";

  //hover

  styles += "& > .altrp-element:not(:last-child):hover {";

  if (settings !== undefined) {
    marginBottomH = getResponsiveSetting(settings, 'layout_widgets-space', ':hover');
  }

  if (marginBottomH) {
    styles += `margin-bottom: ${marginBottomH}px; `;
  }

  styles += "} ";

  styles += "& > .altrp-column.altrp-background-image-columns {";

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

  styles += "} ";

  //hover

  styles += "& > div.altrp-column.altrp-background-image-columns:hover {";

  //Получаем значения background-position из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundPositionH = getResponsiveSetting(settings, 'background_position', ':hover');
  }

  if (backgroundPositionH) {
    styles += simplePropertyStyled(backgroundPositionH, 'background-position');
  }

  //Получаем значения background-attachment из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundAttachmentH = getResponsiveSetting(settings, 'background_attachment', ':hover');
  }

  if (backgroundAttachmentH) {
    styles += simplePropertyStyled(backgroundAttachmentH, 'background-attachment');
  }

  //Получаем значения background-repeat из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundRepeatH = getResponsiveSetting(settings, 'background_repeat', ':hover');
  }

  if (backgroundRepeatH) {
    styles += simplePropertyStyled(backgroundRepeatH, 'background-repeat');
  }

  //Получаем значения background-size в точных юнитах из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundSizeInUnitsH = getResponsiveSetting(settings, 'background_image_width', ':hover');
  }

  if (backgroundSizeInUnitsH) {
    styles += sizeStyled(backgroundSizeInUnitsH, 'background-size');
  }

  //Получаем значения background-size из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundSizeH = getResponsiveSetting(settings, 'background_size', ':hover');
  }

  if (backgroundSizeH) {
    styles += simplePropertyStyled(backgroundSizeH, 'background-size');
  }

  //Получаем значения background-image из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundImageH = getResponsiveSetting(settings, 'background_image', ':hover');
  }

  if (backgroundImageH) {
    styles += backgroundImageControllerToStyles(backgroundImageH);
  }

  styles += "} ";

  //<editor-fold description=active>
  styles += "& > div.altrp-column.altrp-column-priority.active {";

  //Получаем значения background-position из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundPositionH = getResponsiveSetting(settings, 'background_position', '.active');
  }

  if (backgroundPositionH) {
    styles += simplePropertyStyled(backgroundPositionH, 'background-position');
  }

  //Получаем значения background-attachment из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundAttachmentH = getResponsiveSetting(settings, 'background_attachment', '.active');
  }

  if (backgroundAttachmentH) {
    styles += simplePropertyStyled(backgroundAttachmentH, 'background-attachment');
  }

  //Получаем значения background-repeat из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundRepeatH = getResponsiveSetting(settings, 'background_repeat', '.active');
  }

  if (backgroundRepeatH) {
    styles += simplePropertyStyled(backgroundRepeatH, 'background-repeat');
  }

  //Получаем значения background-size в точных юнитах из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundSizeInUnitsH = getResponsiveSetting(settings, 'background_image_width', '.active');
  }

  if (backgroundSizeInUnitsH) {
    styles += sizeStyled(backgroundSizeInUnitsH, 'background-size');
  }

  //Получаем значения background-size из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundSizeH = getResponsiveSetting(settings, 'background_size', '.active');
  }

  if (backgroundSizeH) {
    styles += simplePropertyStyled(backgroundSizeH, 'background-size');
  }

  //Получаем значения background-image из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundImageH = getResponsiveSetting(settings, 'background_image', '.active');
  }

  if (backgroundImageH) {
    styles += backgroundImageControllerToStyles(backgroundImageH);
  }
  styles += "} ";


  //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundColorH = getResponsiveSetting(settings, 'column_style_background_color', '.active');
  }

  if (backgroundColorH) {
    styles += colorPropertyStyled(backgroundColorH, 'background-color');
  }

  //Получаем значения gradient из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    gradientH = getResponsiveSetting(settings, 'gradient', '.active');
  }

  if (gradientH) {
    styles += gradientStyled(gradientH);
  }

  //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderTypeH = getResponsiveSetting(settings, 'column_style_border_type', '.active');
  }

  if (borderTypeH) {
    styles += simplePropertyStyled(borderTypeH, 'border-style');
  }

  //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderWidthH = getResponsiveSetting(settings, 'column_style_border_width', '.active');
  }

  if (borderWidthH) {
    styles += borderWidthStyled(borderWidthH);
  }

  //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderColorH = getResponsiveSetting(settings, 'column_style_border_color', '.active');
  }

  if (borderColorH) {
    styles += colorPropertyStyled(borderColorH, 'border-color');
  }

  //Получаем значения border-radius в точных юнитах из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderRadiusH = getResponsiveSetting(settings, 'column_style_border_radius', '.active');
  }

  if (borderRadiusH) {
    styles += sizeStyled(borderRadiusH, 'border-radius');
  }

  //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    boxShadowH = getResponsiveSetting(settings, 'column_style_box_shadow', '.active');
  }

  if (boxShadowH) {
    styles += shadowStyled(boxShadowH);
  }

  //</editor-fold>

  const layout_column_width = getResponsiveSetting(settings, 'layout_column_width');
  if(layout_column_width){
    if (
      Number(layout_column_width)
    ){
      styles += `&&&&{width:${layout_column_width}%;}`;

    }else {
      styles += `&&&&{width:${layout_column_width};}`;
    }
  }
  return styles;
};

export default ColumnComponent
