import ButtonComponent from "../../../../editor/src/js/components/widgets/styled-components/ButtonComponent";
import CarouselComponent from "../../../../editor/src/js/components/widgets/styled-components/CarouselComponent";
import GalleryComponent from "../../../../editor/src/js/components/widgets/styled-components/GalleryComponent";
import DividerComponent from "../../../../editor/src/js/components/widgets/styled-components/DividerComponent";
import VideoComponent from "../../../../editor/src/js/components/widgets/styled-components/VideoComponent";
import ListComponent from "../../../../editor/src/js/components/widgets/styled-components/ListComponent";
import AdvancedComponent from "../../../../editor/src/js/components/widgets/styled-components/AdvancedComponent";
import AccordionComponent from "../../../../editor/src/js/components/widgets/styled-components/AccordionComponent";
import SectionWidgetComponent
  from "../../../../editor/src/js/components/widgets/styled-components/SectionWidgetComponent";
import ColumnComponent from "../../../../editor/src/js/components/widgets/styled-components/ColumnComponents";
import DropbarWidgetComponent
  from "../../../../editor/src/js/components/widgets/styled-components/DropbarWidgetComponent";

const GlobalStyles = window.createGlobalStyle`${({elementsSettings})=>{
  let styles = '';

  let prefix = "altrp-element";

  _.each(elementsSettings, (item, id) => {
    if(item) {
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
      }
      styles += `.${prefix}${id}.${prefix}${id} {${AdvancedComponent(item.settings)}}`
    }
  });

  return styles;
}}`;

function mapStateToProps(state) {
  return {elementsSettings: state.elementsSettings}
}

export default window.reactRedux.connect(mapStateToProps)(GlobalStyles)

