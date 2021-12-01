import RootComponent from '../../../resources/modules/editor/src/js/components/RootComponent';
import SectionComponent from '../../../resources/modules/editor/src/js/components/SectionComponent';
import ColumnComponent from '../../../resources/modules/editor/src/js/components/ColumnComponent';
// import InputWidget from '../../../resources/modules/editor/src/js/components/widgets/InputWidget';
import ButtonWidget from '../../../resources/modules/editor/src/js/components/widgets/ButtonWidget';
import TextWidget from '../../../resources/modules/editor/src/js/components/widgets/TextWidget';
import ImageWidget from '../../../resources/modules/editor/src/js/components/widgets/ImageWidget';
// import NavWidget from '../../../resources/modules/editor/src/js/components/widgets/NavWidget';
import DividerWidget from '../../../resources/modules/editor/src/js/components/widgets/DividerWidget';
import PosterWidget from '../../../resources/modules/editor/src/js/components/widgets/PosterWidget';
import ListWidget from '../../../resources/modules/editor/src/js/components/widgets/ListWidget';
import AccordionWidget from '../../../resources/modules/editor/src/js/components/widgets/AccordionWidget/AccordionWidget';
import CarouselWidget from '../../../resources/modules/editor/src/js/components/widgets/CarouselWidget';
// import MapWidget from '../../../resources/modules/editor/src/js/components/widgets/MapWidget';
// import MapConstructorWidget from '../../../resources/modules/editor/src/js/components/widgets/MapConstructorWidget';
// import DiagramWidget from '../../../resources/modules/editor/src/js/components/widgets/DiagramWidget';
// import DashboardsWidget from '../../../resources/modules/editor/src/js/components/widgets/DashboardsWidget';
import PostsWidget from '../../../resources/modules/editor/src/js/components/widgets/PostsWidget';
// import IconWidget from '../../../resources/modules/editor/src/js/components/widgets/IconWidget';
// import TourGuide from '../../../resources/modules/editor/src/js/components/widgets/TourGuide';
// import ExportPanelWindget from '../../../resources/modules/editor/src/js/components/widgets/ExportPanelWidget';
import HtmlWidget from '../../../resources/modules/editor/src/js/components/widgets/HtmlWidget';
// import TemplateWidget from '../../../resources/modules/editor/src/js/components/widgets/TemplateWidget';
// import GalleryWidget from '../../../resources/modules/editor/src/js/components/widgets/GalleryWidget';
import VideoWidget from '../../../resources/modules/editor/src/js/components/widgets/VideoWidget';
// import Skeleton from '../../../resources/modules/editor/src/js/components/altrp-image/Skeleton';
import SkeletonPlaceholder from '../components/SkeletonPlaceholder';
import HeadingTypeHeadingWidget
  from "../../../resources/modules/editor/src/js/components/widgets/HeadingTypeHeadingWidget";
import SKELETON_ELEMENTS from "../../../resources/modules/front-app/src/js/constants/SKELETON_ELEMENTS";
import InputHiddenWidget from "../../../resources/modules/editor/src/js/components/widgets/InputHiddenWidget";
import TemplateWidget from "../../../resources/modules/editor/src/js/components/widgets/TemplateWidget";
import ImageLightboxWidget from "../../../resources/modules/editor/src/js/components/widgets/ImageLightboxWidget";
import IconWidget from "../../../resources/modules/editor/src/js/components/widgets/IconWidget"
import MenuPlaceholder from "../components/MenuPlaceholder";
// import BreadcrumbsWidget from '../../../resources/modules/editor/src/js/components/widgets/BreadcrumbsWidget';
// import MenuWidget from '../../../resources/modules/editor/src/js/components/widgets/MenuWidget';


class FrontElementsManager {
  constructor() {
    //список компонентов
    this.components = {};
    SKELETON_ELEMENTS.forEach(el=>{
      if(el === "menu") {
        this.components[el] = MenuPlaceholder;
      } else {
        this.components[el] = SkeletonPlaceholder;
      }
    })
    this.components['root-element'] = RootComponent;
    this.components['heading'] = HeadingTypeHeadingWidget;
    this.components['section'] = SectionComponent;
    this.components['section_widget'] = SectionComponent;
    this.components['column'] = ColumnComponent;
    this.components['button'] = ButtonWidget;
    this.components['input-hidden'] = InputHiddenWidget;
    this.components['text'] = TextWidget;
    this.components['text-common'] = TextWidget;
    this.components['image'] = ImageWidget;
    this.components['image-lightbox'] = ImageLightboxWidget;
    this.components['posts'] = PostsWidget;
    this.components['divider'] = DividerWidget;
    this.components['poster'] = PosterWidget;
    this.components['list'] = ListWidget;
    this.components['accordion'] = AccordionWidget;
    this.components['carousel'] = CarouselWidget;
    this.components['html'] = HtmlWidget;
    this.components['video'] = VideoWidget;
    this.components['template'] = TemplateWidget;
    this.components['icon'] = IconWidget;
  }

  getComponentClass(name) {
    if (! this.components[name]) {
      console.error( 'Not found component with ' + name);
    }
    return this.components[name];
  }

  checkElementExists(elementName) {
    return !!this.components[elementName];
  }
}
export default window.frontElementsManager = new FrontElementsManager();

