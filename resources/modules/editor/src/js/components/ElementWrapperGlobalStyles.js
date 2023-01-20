import ImageLightboxComponent from "./widgets/styled-components/ImageLightboxComponent";
import TabsSwitcherComponent from "./widgets/styled-components/TabsSwitcherComponent";
import ButtonComponent from "./widgets/styled-components/ButtonComponent";
import CarouselComponent from "./widgets/styled-components/CarouselComponent";
import GalleryComponent from "./widgets/styled-components/GalleryComponent";
import DividerComponent from "./widgets/styled-components/DividerComponent";
import VideoComponent from "./widgets/styled-components/VideoComponent";
import ListComponent from "./widgets/styled-components/ListComponent";
import AccordionComponent from "./widgets/styled-components/AccordionComponent";
import TreeComponent from "./widgets/styled-components/TreeComponent";
import SectionWidgetComponent from "./widgets/styled-components/SectionWidgetComponent";
import ColumnComponent from "./widgets/styled-components/ColumnComponents";
import DropbarWidgetComponent from "./widgets/styled-components/DropbarWidgetComponent";
import DashboardComponent from "./widgets/styled-components/DashboardComponent";
import getImageStyles from "../../../../front-app/src/js/components/helpers/stylesForTheImage";
import getTabsStyles from "../../../../front-app/src/js/components/helpers/stylesForTheTabs";
import getMenuStyles from "../../../../front-app/src/js/components/helpers/getMenuStyles";
import getBreadcrumbsStyles from "../../../../front-app/src/js/components/helpers/stylesForTheBreadcrumbs";
import {getHeadingTypeHeadingStyles} from "../../../../front-app/src/js/components/helpers/stylesForTheHeadingTypeHeading";
import {getHeadingTypeAnimatingStyles} from "../../../../front-app/src/js/components/helpers/stylesForTheHeadingTypeAnimating";
import {getTextStyles} from "../../../../front-app/src/js/components/helpers/stylesForTheText";
import {getTableStyles} from "../../../../front-app/src/js/components/helpers/stylesForTheTable";
import RangeSliderTableComponent from "./widgets/styled-components/RangeSliderTableComponent";
import {getPostsStyles} from "../../../../front-app/src/js/components/helpers/stylesForThePosts";
import FormComponent from "./widgets/styled-components/FormComponent";
import InputDateComponent from "./widgets/styled-components/InputDateComponent";
import DatePickerComponent from "./widgets/styled-components/DatePickerComponent";
import InputDateRangeComponent from "./widgets/styled-components/InputDateRangeComponent";
import InputCheckboxComponent from "./widgets/styled-components/InputCheckboxComponent";
import InputSliderComponent from "./widgets/styled-components/InputSliderComponent";
import InputRangeSliderComponent from "./widgets/styled-components/InputRangeSliderComponent";
import getInputTextCommonStyles from "../../../../front-app/src/js/components/helpers/getInputTextCommonStyles";
import getInputTextAutocompleteStyles
  from "../../../../front-app/src/js/components/helpers/getInputTextAutocompleteStyles";
import getTemplateStyles from "../../../../front-app/src/js/components/helpers/getTemplateStyles";
import getInputSelectStyles, {getInputSelectPopoverStyles} from "../../../../front-app/src/js/components/helpers/getInputSelectStyles";
import getInputSelectTreeStyles from "../../../../front-app/src/js/components/helpers/getInputSelectTreeStyles";
import getInputMultiSelectStyles, {getInputMultiSelectPopoverStyles} from "../../../../front-app/src/js/components/helpers/getInputMultiSelectStyles";
import InputRadioComponent from "./widgets/styled-components/InputRadioComponent";
import StarsComponent from "./widgets/styled-components/StarsComponent";
import ProgressBarComponent from "./widgets/styled-components/ProgressBarComponent";
import getInputFileStyles from "../../../../front-app/src/js/components/helpers/getInputFileStyles";
import getInputGalleryStyles from "../../../../front-app/src/js/components/helpers/getInputGalleryStyles";
import InputCropImageComponent from "./widgets/styled-components/InputCropImageComponent";
import MapComponent from "./widgets/styled-components/MapComponent";
import MapConstructorComponent from "./widgets/styled-components/MapConstructorComponent";
import getSchedulerStyles from "../../../../front-app/src/js/components/helpers/getSchedulerStyles";
import getIconStyles from "../../../../front-app/src/js/components/helpers/getIconStyles";
import DiagramComponent from "./widgets/styled-components/DiagramComponent";
import getTournamentStyles from "../../../../front-app/src/js/components/helpers/getTournamentStyles";
import getFeedbackStyles from "../../../../front-app/src/js/components/helpers/getFeedbackStyles";
import getInputPagintaionStyles from "../../../../front-app/src/js/components/helpers/getInputPaginationStyles";
import TooltipComponent from "./widgets/styled-components/TooltipComponent";
import AdvancedComponent from "./widgets/styled-components/AdvancedComponent";
import getResponsiveSetting from "../../../../front-app/src/js/functions/getResponsiveSetting";
import {connect} from "react-redux";
import hoverTransitions from "./widgets/styled-components/hoverTransitions";

let ElementWrapperGlobalStyles = window.createGlobalStyle`${({
                                                               elementName,
                                                               elementId,
                                                               settings,
                                                               element,
                                                             }) => {
  if(element.settings.global_styles_presets){
    elementId = `_altrp-preset_${elementName}-${element.settings.global_styles_presets}`
  }

  let styles = "";
  let prefix = "altrp-element";
  switch (elementName) {
    case "image-lightbox":
      styles += ImageLightboxComponent(settings, elementId);
      break;
    case "tabs-switcher":
      styles += `.${prefix}${elementId} {${TabsSwitcherComponent(settings)}}`;
      break;
    case "button":
      styles += `.${prefix}${elementId} {${ButtonComponent(settings)}}`;
      break;
    case "carousel":
      styles += `.${prefix}${elementId} {${CarouselComponent(settings)}}`;
      break;
    case "gallery":
      styles += `.${prefix}${elementId} {${GalleryComponent(settings)}}`;
      break;
    case "divider":
      styles += `.${prefix}${elementId} {${DividerComponent(settings)}}`;
      break;
    case "video":
      styles += `.${prefix}${elementId} {${VideoComponent(settings)}}`;
      break;
    case "list":
      styles += `.${prefix}${elementId} {${ListComponent(settings)}}`;
      break;
    case "accordion":
      styles += `.${prefix}${elementId} {${AccordionComponent(settings)}}`;
      break;
    case "tree":
      styles += `.${prefix}${elementId} {${TreeComponent(settings)}}`;
      break;
    case "section_widget":
    case "section":
      styles += `.${prefix}${elementId} {${SectionWidgetComponent(
        settings,
        element.children.length,
        elementId
      )}}`;
      break;
    case "column":
      styles += `.${prefix}${elementId} {${ColumnComponent(settings)}}`;
      break;
    case "dropbar":
      styles += `.${prefix}${elementId} {${DropbarWidgetComponent(settings)}}`;
      break;
    case "dashboard":
      styles += `.${prefix}${elementId} {${DashboardComponent(settings)}}`;
      break;
    case "image":
      styles += getImageStyles(settings, elementId);
      break;
    case "tabs":
      styles += getTabsStyles(settings, elementId);
      break;
    case "menu":
      styles += getMenuStyles(settings, elementId);
      break;
    case "breadcrumbs":
      styles += getBreadcrumbsStyles(settings, elementId);
      break;
    case "heading":
    {
      styles += getHeadingTypeHeadingStyles(settings, elementId);
    }
      break;
    case "heading-type-animating":
    {
      styles += getHeadingTypeAnimatingStyles(settings, elementId);
    }
      break;
    case "text":
    {
      styles += getTextStyles(settings, elementId);
    }
      break;
    case "table":
    {
      styles += getTableStyles(settings, elementId);
      styles += `.${prefix}${elementId} { ${RangeSliderTableComponent(
        settings
      )}}`;
    }
      break;
    case "posts":
    {
      styles += getPostsStyles(settings, elementId);
    }
      break;
    case "input-select2":
    {
      styles += `.${prefix}${elementId} {${FormComponent.FormComponent(
        settings,
        elementIdm,
        elementName
      )}}`;
      //select2 options style
      styles += `${FormComponent.select2Options(settings, elementId)}}`;
    }
      break;
    case "input-date":
    {
      styles += InputDateComponent(settings, elementId, prefix);

      styles += `${DatePickerComponent(settings, elementId)}`;
    }
      break
    case "input-date-range": {
      styles += InputDateRangeComponent(settings, elementId, prefix)
    }
      break;
    case "input-checkbox":
    {
      styles += InputCheckboxComponent(
        settings,
        elementId
      );
    }
      break;
    case "input-slider":
    {
      styles += `.${prefix}${elementId} { ${InputSliderComponent(settings)}}`;
    }
      break;
    case "input-range-slider":
    {
      styles += `.${prefix}${elementId} { ${InputRangeSliderComponent(
        settings
      )}}`;
    }
      break;
    case "input-text-common":
    {
      styles += `.${prefix}${elementId} {${getInputTextCommonStyles(
        settings,
        elementId
      )}}`;
    }
      break;
    case "input-text-autocomplete":
    {
      styles += `.${prefix}${elementId} {${getInputTextAutocompleteStyles(
        settings,
        elementId
      )}}`;
    }
      break;

    case "template":
    {
      styles += `.${prefix}${elementId} {${getTemplateStyles(
        settings,
        elementId
      )}}`;
    }
      break;
    case "input-select":
    {
      styles += `.${prefix}${elementId} {${getInputSelectStyles(
        settings,
        elementId
      )}}`;
      styles += `${getInputSelectPopoverStyles(settings, elementId)}`;
    }
      break;
    case "input-select-tree": {
      styles += `.${prefix}${elementId} {${getInputSelectTreeStyles(settings)}}`;
      styles += `${getInputSelectPopoverStyles(settings, elementId)}`;
      styles += `.altrp-select-tree${elementId} {${TreeComponent(settings, "tree_")}}`;
    }
      break;
    case "input-multi-select":
    {
      styles += `.${prefix}${elementId} {${getInputMultiSelectStyles(
        settings,
        elementId
      )}}`;
      styles += `${getInputMultiSelectPopoverStyles(settings, elementId)}`;
    }
      break;
    case "input-radio": {
      styles += InputRadioComponent(settings, elementId, prefix);
      break;
    }
    case "stars": {
      styles += `.${prefix}${elementId} {${StarsComponent(
        settings,
        elementId
      )}}`;
      break;
    }
    case "progress-bar": {
      styles += `.${prefix}${elementId} {${ProgressBarComponent(
        settings,
        elementId
      )}}`;
      break;
    }
    case "input-text":
    case "input-password":
    case "input-number":
    case "input-email":
    case "input-tel":
    case "input-file":
    {
      styles += `.${prefix}${elementId} {${getInputFileStyles(
        settings,
        elementId
      )}}`;
    }
      break;
    case "input-gallery":
    {
      styles += `.${prefix}${elementId} {${getInputGalleryStyles(
        settings,
        elementId
      )}}`;
    }
      break;
    case "input-image-select":
    case "input-accept":
    case "input-textarea":
    case "input-wysiwyg":
    {
      styles += `.${prefix}${elementId} {${FormComponent.FormComponent(
        settings,
        elementId,
        elementName
      )}}`;
    }
      break;
    case "input-crop-image":
      styles += `.${prefix}${elementId} {${InputCropImageComponent(settings)}}`
      break
    case "map":
      styles += `.${prefix}${elementId} {${MapComponent(settings)}}`;
      break;
    case "map_builder":
      styles += `.${prefix}${elementId} {${MapConstructorComponent(settings)}}`;
      break;
    case "scheduler":
      styles += `.${prefix}${elementId} {${getSchedulerStyles(settings, elementId)}}`;
      break;
    case "icon":
      styles += `.${prefix}${elementId} {${getIconStyles(settings, elementId)}}`
      break;
    case "pie-diagram":
    case "bar-diagram":
    case "line-diagram":
    case "funnel-diagram":
    case "radar-diagram":
      styles += `.${prefix}${elementId} {${DiagramComponent(settings)}}`
      break;
    case 'tournament':
      styles += `.${prefix}${elementId} {${getTournamentStyles(settings, elementId)}}`
      break;
    case 'feedback':
      styles += `.${prefix}${elementId} {${getFeedbackStyles(settings, elementId)}}`
      break;
    case 'input-pagination':
      styles += `.${prefix}${elementId} {${getInputPagintaionStyles(settings)}}`
      break;
  }


  const tooltip_show_type = settings.tooltip_show_type || "never";

  if (tooltip_show_type !== "never") {
    styles += `.altrp-tooltip${elementId}.altrp-tooltip${elementId} {${TooltipComponent(
      settings
    )}}`;
  }

  styles += `div.${prefix}${elementId}.${prefix}${elementId} {${AdvancedComponent(
    settings
  )}}`;
  let element_css_editor = getResponsiveSetting(settings, "element_css_editor");
  if (_.isString(element_css_editor)) {
    styles += element_css_editor.replace(
      /__selector__/g,
      `.${prefix}${elementId}`
    );
  }
  styles += hoverTransitions(settings, elementId)

  return styles;
}}`;
ElementWrapperGlobalStyles = connect((state)=>{
  return {
    currentScreen: state.currentScreen
  }
})(ElementWrapperGlobalStyles)
export default ElementWrapperGlobalStyles
