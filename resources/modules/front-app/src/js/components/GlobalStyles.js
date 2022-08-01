import { getHeadingTypeHeadingStyles } from "./helpers/stylesForTheHeadingTypeHeading";
import { getHeadingTypeAnimatingStyles } from "./helpers/stylesForTheHeadingTypeAnimating";
import {getTextStyles} from "./helpers/stylesForTheText";
import {getTableStyles} from "./helpers/stylesForTheTable";
import {getPostsStyles} from "./helpers/stylesForThePosts";
import getImageStyles from "./helpers/stylesForTheImage";
import getTabsStyles from "./helpers/stylesForTheTabs";
import getMenuStyles from "./helpers/getMenuStyles";
import getBreadcrumbsStyles from "./helpers/stylesForTheBreadcrumbs";
import ButtonComponent from "../../../../editor/src/js/components/widgets/styled-components/ButtonComponent";
import CarouselComponent from "../../../../editor/src/js/components/widgets/styled-components/CarouselComponent";
import GalleryComponent from "../../../../editor/src/js/components/widgets/styled-components/GalleryComponent";
import DividerComponent from "../../../../editor/src/js/components/widgets/styled-components/DividerComponent";
import VideoComponent from "../../../../editor/src/js/components/widgets/styled-components/VideoComponent";
import ListComponent from "../../../../editor/src/js/components/widgets/styled-components/ListComponent";
import DashboardComponent from "../../../../editor/src/js/components/widgets/styled-components/DashboardComponent";
import AdvancedComponent from "../../../../editor/src/js/components/widgets/styled-components/AdvancedComponent";
import SectionWidgetComponent
  from "../../../../editor/src/js/components/widgets/styled-components/SectionWidgetComponent";
import ColumnComponent from "../../../../editor/src/js/components/widgets/styled-components/ColumnComponents";
import DropbarWidgetComponent
  from "../../../../editor/src/js/components/widgets/styled-components/DropbarWidgetComponent";
import FormComponent from "../../../../editor/src/js/components/widgets/styled-components/FormComponent";
import AccordionComponent from "../../../../editor/src/js/components/widgets/styled-components/AccordionComponent";
import getRouteStyles from "../functions/get-route-styles";
import MapComponent from "../../../../editor/src/js/components/widgets/styled-components/MapComponent";
import MapConstructorComponent
  from "../../../../editor/src/js/components/widgets/styled-components/MapConstructorComponent";
import TabsSwitcherComponent
  from "../../../../editor/src/js/components/widgets/styled-components/TabsSwitcherComponent";
import DiagramComponent from "../../../../editor/src/js/components/widgets/styled-components/DiagramComponent";
import ImageLightboxComponent
  from "../../../../editor/src/js/components/widgets/styled-components/ImageLightboxComponent";
import InputDateComponent from "../../../../editor/src/js/components/widgets/styled-components/InputDateComponent";
import DatePickerComponent from "../../../../editor/src/js/components/widgets/styled-components/DatePickerComponent";
import InputCheckboxComponent
  from "../../../../editor/src/js/components/widgets/styled-components/InputCheckboxComponent";
import getInputTextCommonStyles from "./helpers/getInputTextCommonStyles";
import getInputSelectStyles, {getInputSelectPopoverStyles} from "./helpers/getInputSelectStyles";
import InputRadioComponent from "../../../../editor/src/js/components/widgets/styled-components/InputRadioComponent";
import InputSliderComponent from "../../../../editor/src/js/components/widgets/styled-components/InputSliderComponent";
import getInputFileStyles from "./helpers/getInputFileStyles";
import getInputGalleryStyles from "./helpers/getInputGalleryStyles";
import {getResponsiveSetting} from"../helpers";
import InputRangeSliderComponent
  from "../../../../editor/src/js/components/widgets/styled-components/InputRangeSliderComponent";
import RangeSliderTableComponent from "../../../../editor/src/js/components/widgets/styled-components/RangeSliderTableComponent"
import getTemplateStyles from "./helpers/getTemplateStyles";
import TooltipComponent from "../../../../editor/src/js/components/widgets/styled-components/TooltipComponent";
import getInputMultiSelectStyles, {getInputMultiSelectPopoverStyles} from "./helpers/getInputMultiSelectStyles";
import getSchedulerStyles from "./helpers/getSchedulerStyles";
import getTournamentStyles from "./helpers/getTournamentStyles";
import getInputTextAutocompleteStyles from "./helpers/getInputTextAutocompleteStyles";
import TreeComponent from "../../../../editor/src/js/components/widgets/styled-components/TreeComponent";
import InputDateRangeComponent
  from "../../../../editor/src/js/components/widgets/styled-components/InputDateRangeComponent";
import getIconStyles from "./helpers/getIconStyles";
import StarsComponent from "../../../../editor/src/js/components/widgets/styled-components/StarsComponent";
import ProgressBarComponent from "../../../../editor/src/js/components/widgets/styled-components/ProgressBarComponent";
import MenuBlueprintCSS from "../../../../../../server/classes/components/MenuPlaceholder/MenuBlueprintCSS";
import InputCropImageComponent from "../../../../editor/src/js/components/widgets/styled-components/InputCropImageComponent";
import getFeedbackStyles from "./helpers/getFeedbackStyles";
import getInputPaginationStyles from "./helpers/getInputPaginationStyles";
import animationStyles from "../helpers/animations/animations-styles";
import isEditor from "../functions/isEditor";

const GlobalStyles = createGlobalStyle`${({ elementsSettings, areas, globalCssEditor }) => {
  let styles = "";
  if(areas){
    styles += getRouteStyles(areas);
  }
  let prefix = "altrp-element";

  _.each(elementsSettings, (item, id) => {
    if (item) {
      switch (item.name) {
        case "image-lightbox":
          styles+=ImageLightboxComponent(item.settings,id);
          break;
        case "icon":
          styles += `.${prefix}${id} {${getIconStyles(item.settings, id)}}`
          break;
        case "pie-diagram":
          styles += `.${prefix}${id} {${DiagramComponent(item.settings)}}`;
          break;
        case "line-diagram":
          styles += `.${prefix}${id} {${DiagramComponent(item.settings)}}`;
          break;
        case "bar-diagram":
          styles += `.${prefix}${id} {${DiagramComponent(item.settings)}}`;
          break;
        case "funnel-diagram":
          styles += `.${prefix}${id} {${DiagramComponent(item.settings)}}`;
          break;
        case "radar-diagram":
          styles += `.${prefix}${id} {${DiagramComponent(item.settings)}}`;
          break;
        case "tabs-switcher":
          styles += `.${prefix}${id} {${TabsSwitcherComponent(item.settings)}}`;
          break;
        case "button":
          styles += `.${prefix}${id} {${ButtonComponent(item.settings)}}`;
          break;
        case "carousel":
          styles += `.${prefix}${id} {${CarouselComponent(item.settings)}}`;
          break;
        case "gallery":
          styles += `.${prefix}${id} {${GalleryComponent(item.settings)}}`;
          break;
        case "divider":
          styles += `.${prefix}${id} {${DividerComponent(item.settings)}}`;
          break;
        case "video":
          styles += `.${prefix}${id} {${VideoComponent(item.settings)}}`;
          break;
        case "list":
          styles += `.${prefix}${id} {${ListComponent(item.settings)}}`;
          break;
        case "accordion":
          styles += `.${prefix}${id} {${AccordionComponent(item.settings)}}`;
          break;
        case "section":
          styles += `.${prefix}${id} {${SectionWidgetComponent(item.settings, item.childrenLength || 1, id)}}`;
          break;
        case "section_widget":
          styles += `.${prefix}${id} {${SectionWidgetComponent(item.settings, item.childrenLength || 1, id)}}`;
          break;
        case "column":
          styles += `.${prefix}${id} {${ColumnComponent(item.settings)}}`;
          break;
        case "dropbar":
          styles += `.${prefix}${id} {${DropbarWidgetComponent(item.settings)}}`;
          break;
        case "dashboard":
          styles+=`.${prefix}${id} {${DashboardComponent(item.settings)}}`;
          break;
        case "image":
          styles+=getImageStyles(item.settings,id);
          break;
        case "tabs":
          styles+=getTabsStyles(item.settings, id);
          break;
        case "menu":
          styles+=MenuBlueprintCSS;
          styles+=getMenuStyles(item.settings,id);
          break;
        case "breadcrumbs":
          styles+=getBreadcrumbsStyles(item.settings,id);
          break;
        case 'heading': {
          styles += getHeadingTypeHeadingStyles(item.settings, id);
        }
          break;
        case 'heading-type-animating': {
          styles += getHeadingTypeAnimatingStyles(item.settings, id);
        }
          break;
        case 'table': {
          styles += getTableStyles(item.settings, id);
          styles += `.${prefix}${id} {${RangeSliderTableComponent(
            item.settings,
          )}}`;
        }
          break;
        case 'text': {
          styles += getTextStyles(item.settings, id);
        }
          break;
        case 'posts': {
          styles += getPostsStyles(item.settings, id);
        }
          break;
        case "input-select2": {
          styles += `.${prefix}${id} {${FormComponent.FormComponent(
            item.settings,
            id
          )}}`;
          //select2 options style
          styles += `${FormComponent.select2Options(item.settings, id)}}`;
        }
          break;
        case "input-date": {
          styles += InputDateComponent(
            item.settings,
            id,
            prefix
          );
          styles += `${DatePickerComponent(
            item.settings,
            id,
          )}`;
        }
          break
        case "input-date-range": {
          styles += InputDateRangeComponent(
            item.settings,
            id,
            prefix
          );
        }
        break
        case "input-checkbox": {
          styles += `.${prefix}${id} {${InputCheckboxComponent(
            item.settings,
            id
          )}}`;
        }
          break
        case "stars": {
          styles += `.${prefix}${id} {${StarsComponent(
            item.settings,
            id
          )}}`;
        }
          break
        case "progress-bar": {
          styles += `.${prefix}${id} {${ProgressBarComponent(
            item.settings,
            id
          )}}`;
        }
          break
        case "input-slider": {
          styles += `.${prefix}${id} {${InputSliderComponent(
            item.settings,
          )}}`;
        }
          break
        case "input-range-slider": {
          styles += `.${prefix}${id} {${InputRangeSliderComponent(
            item.settings,
          )}}`;
        }
          break
        case "input-text-common":{
          styles += `.${prefix}${id} {${getInputTextCommonStyles(item.settings, id)}}`
        }
          break
        case "input-text-autocomplete":{
          styles += `.${prefix}${id} {${getInputTextAutocompleteStyles(item.settings, id)}}`
        }
          break;
        case "input-select":{
          styles += `.${prefix}${id} {${getInputSelectStyles(item.settings, id)}}`
          styles += `${getInputSelectPopoverStyles(item.settings, id)}`
        }
          break;
        case "input-select-tree": {
          styles += `.${prefix}${id} {${getInputSelectStyles(item.settings, id)}}`
          styles += `${getInputSelectPopoverStyles(item.settings, id)}`
          styles += `.altrp-select-tree${id} {${TreeComponent(item.settings, "tree_")}}`;
        }
          break;
        case "input-multi-select":{
          styles += `.${prefix}${id} {${getInputMultiSelectStyles(item.settings, id)}}`
          styles += `${getInputMultiSelectPopoverStyles(item.settings, id)}`
        }
          break;
        case "input-radio": {
          styles += InputRadioComponent(
            item.settings,
            id,
            prefix
          )
        }break;
        case "input-text":
        case "input-password":
        case "input-number":
        case "input-email":
        case "input-tel":
        case "input-file":{
          styles += `.${prefix}${id} {${getInputFileStyles(
            item.settings,
            id
          )}}`;
        }break
        case "input-gallery":{
          styles += `.${prefix}${id} {${getInputGalleryStyles(
            item.settings,
            id
          )}}`;
        }break
        case "template":{
          styles += `.${prefix}${id} {${getTemplateStyles(
            item.settings,
            id
          )}}`;
        }break
        case "input-crop-image":
          styles += `.${prefix}${id} {${InputCropImageComponent(item.settings)}}`
          break
        case "input-image-select":
        case "input-accept":
        case "input-textarea":
        case "input-wysiwyg": {
          styles += `.${prefix}${id} {${FormComponent.FormComponent(
            item.settings,
            id
          )}}`;
        }
          break;
        case "map":
          styles += `.${prefix}${id} {${MapComponent(item.settings)}}`;
          break;
        case "map_builder":
          styles += `.${prefix}${id} {${MapConstructorComponent(item.settings)}}`;
          break;
        case "scheduler":
          styles += `.${prefix}${id} {${getSchedulerStyles(item.settings, id)}}`;
          break;
        case "tree":
          styles += `.${prefix}${id} {${TreeComponent(item.settings)}}`;
          break;
        case 'tournament':
          styles += `.${prefix}${id} {${getTournamentStyles(item.settings)}}`
          break;
        case 'feedback':
          styles += `.${prefix}${id} {${getFeedbackStyles(item.settings)}}`
          break;
        case 'input-pagination':
          styles += `.${prefix}${id} {${getInputPaginationStyles(item.settings)}}`
          break;
      }
      styles += `div.${prefix}${id}.${prefix}${id} {${AdvancedComponent(
        item.settings
      )}}`;

      const tooltip_show_type = item.settings.tooltip_show_type || "never";

      if(tooltip_show_type !== "never") {
        styles += `.altrp-tooltip${id} {${TooltipComponent(item.settings)}}`
      }

      let element_css_editor = getResponsiveSetting(item.settings, "element_css_editor");
      if(_.isString(element_css_editor)){
        styles+=element_css_editor.replace(/__selector__/g, `.${prefix}${id}`)
      }
    }
  });

  styles += ` `;
  globalCssEditor && (styles += globalCssEditor.globalStylesCss)


  window.globalDefaults && (styles += window.globalDefaults.join(''));
  return styles;
}}`

function mapStateToProps(state) {
  if(isEditor()){
    return {};
  }
  return {
    elementsSettings: state.elementsSettings,
    areas: state.areas,
    globalCssEditor: state.globalStylesCssEditor,
    currentScreen: state.currentScreen,
  };
}

export default window.reactRedux.connect(mapStateToProps)(GlobalStyles)

