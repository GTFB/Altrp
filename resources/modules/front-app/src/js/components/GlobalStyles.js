import {getHeadingStyles} from "./helpers/stylesForTheHeading";
import {getTextStyles} from "./helpers/stylesForTheText";
import {getTableStyles} from "./helpers/stylesForTheTable";
import {getPostsStyles} from "./helpers/stylesForThePosts";
import getImageStyles from "./helpers/stylesForTheImage";
import getTabsStyles from "./helpers/stylesForTheTabs";
import ButtonComponent from "../../../../editor/src/js/components/widgets/styled-components/ButtonComponent";
import CarouselComponent from "../../../../editor/src/js/components/widgets/styled-components/CarouselComponent";
import GalleryComponent from "../../../../editor/src/js/components/widgets/styled-components/GalleryComponent";
import DividerComponent from "../../../../editor/src/js/components/widgets/styled-components/DividerComponent";
import VideoComponent from "../../../../editor/src/js/components/widgets/styled-components/VideoComponent";
import ListComponent from "../../../../editor/src/js/components/widgets/styled-components/ListComponent";
import AdvancedComponent from "../../../../editor/src/js/components/widgets/styled-components/AdvancedComponent";
import SectionWidgetComponent
  from "../../../../editor/src/js/components/widgets/styled-components/SectionWidgetComponent";
import ColumnComponent from "../../../../editor/src/js/components/widgets/styled-components/ColumnComponents";
import DropbarWidgetComponent
  from "../../../../editor/src/js/components/widgets/styled-components/DropbarWidgetComponent";
import FormComponent from "../../../../editor/src/js/components/widgets/styled-components/FormComponent";
import AccordionComponent from "../../../../editor/src/js/components/widgets/styled-components/AccordionComponent";
import MapComponent from "../../../../editor/src/js/components/widgets/styled-components/MapComponent";
import MapConstructorComponent
  from "../../../../editor/src/js/components/widgets/styled-components/MapConstructorComponent";
import ImageComponent from "../../../../editor/src/js/components/widgets/styled-components/ImageComponent";

const GlobalStyles = createGlobalStyle`${({ elementsSettings }) => {
  let styles = "";

  let prefix = "altrp-element";

  _.each(elementsSettings, (item, id) => {
    if (item) {
      switch (item.name) {
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
          styles += `.${prefix}${id} {${SectionWidgetComponent(item.settings)}}`;
          break;
        case "column":
          styles += `.${prefix}${id} {${ColumnComponent(item.settings)}}`;
          break;
        case "dropbar":
          styles += `.${prefix}${id} {${DropbarWidgetComponent(item.settings)}}`;
          break;
        case "image":
          styles+=getImageStyles(item.settings,id);
          break;
        case "tabs":
          styles+=getTabsStyles(item.settings, id);
          break;
        case 'heading': {
          styles += getHeadingStyles(item.settings, id);
        }
          break;
        case 'text': {
          styles += getTextStyles(item.settings, id);
        }
          break;
        case 'table': {
          styles += getTableStyles(item.settings, id);
        }
          break;
        case 'posts': {
          styles += getPostsStyles(item.settings, id);
        }
          break;
        case "input":
          {
            switch (item.settings?.content_type) {
              case "select2":
                styles += `.${prefix}${id} {${FormComponent.FormComponent(
                  item.settings,
                  id
                )}}`;
                //select2 options style
                styles += `${FormComponent.select2Options(item.settings, id)}}`;
                break;
              default:
                styles += `.${prefix}${id} {${FormComponent.FormComponent(
                  item.settings,
                  id
                )}}`;
                break;
            }
          }
          break;
        case "map":
          styles += `.${prefix}${id} {${MapComponent(item.settings)}}`;
          break;
        case "map_builder":
          styles += `.${prefix}${id} {${MapConstructorComponent(item.settings)}}`;
          break;
      }
      styles += `.${prefix}${id}.${prefix}${id} {${AdvancedComponent(
        item.settings
      )}}`;

    }
  });

  styles += `} `;


  // console.log("sadasdsa", styles);
  //
  // let stylesToArray = [];
  //
  // let selectors = styles.match(/(.*?{.*?)({.*)/);;
  //
  // console.log("array ", selectors)
  //
  //
  return styles;
}}`;
function mapStateToProps(state) {
  return { elementsSettings: state.elementsSettings };
}

export default window.reactRedux.connect(mapStateToProps)(GlobalStyles)

