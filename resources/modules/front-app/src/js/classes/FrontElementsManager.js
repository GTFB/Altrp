import RootComponent from "../../../../editor/src/js/components/RootComponent";
import HeadingWidget from "../../../../editor/src/js/components/widgets/HeadingWidget";
import SectionComponent from "../../../../editor/src/js/components/SectionComponent";
import ColumnComponent from "../../../../editor/src/js/components/ColumnComponent";
import InputWidget from "../../../../editor/src/js/components/widgets/InputWidget";
import ButtonWidget from "../../../../editor/src/js/components/widgets/ButtonWidget";
import TextWidget from "../../../../editor/src/js/components/widgets/TextWidget";
import ImageWidget from "../../../../editor/src/js/components/widgets/ImageWidget";
import TableWidget from "../../../../editor/src/js/components/widgets/TableWidget";
import NavWidget from "../../../../editor/src/js/components/widgets/NavWidget";
import DividerWidget from "../../../../editor/src/js/components/widgets/DividerWidget";
import TabsWidget from "../../../../editor/src/js/components/widgets/TabsWidget";
import PosterWidget from "../../../../editor/src/js/components/widgets/PosterWidget";
import ListWidget from "../../../../editor/src/js/components/widgets/ListWidget";
import AccordionWidget from "../../../../editor/src/js/components/widgets/AccordionWidget";
import CarouselWidget from "../../../../editor/src/js/components/widgets/CarouselWidget";
import MapWidget from "../../../../editor/src/js/components/widgets/MapWidget";
import MapConstructorWidget from "../../../../editor/src/js/components/widgets/MapConstructorWidget";
import DiagramWidget from "../../../../editor/src/js/components/widgets/DiagramWidget";
import DashboardsWidget from "../../../../editor/src/js/components/widgets/DashboardsWidget";
import PostsWidget from "../../../../editor/src/js/components/widgets/PostsWidget";
import IconWidget from "../../../../editor/src/js/components/widgets/IconWidget";
import TourGuide from "../../../../editor/src/js/components/widgets/TourGuide";
import ExportPanelWindget from "../../../../editor/src/js/components/widgets/ExportPanelWidget";
import HtmlWidget from "../../../../editor/src/js/components/widgets/HtmlWidget";
import TemplateWidget from "../../../../editor/src/js/components/widgets/TemplateWidget";
import VideoWidget from "../../../../editor/src/js/components/widgets/VideoWidget";

export default class FrontElementsManager {
  constructor() {
    //список компонентов
    this.components = {};
    this.components["root-element"] = RootComponent;
    this.components["heading"] = HeadingWidget;
    this.components["section"] = SectionComponent;
    this.components["column"] = ColumnComponent;
    this.components["input"] = InputWidget;
    this.components["button"] = ButtonWidget;
    this.components["text"] = TextWidget;
    this.components["image"] = ImageWidget;
    this.components["table"] = TableWidget;
    this.components["posts"] = PostsWidget;
    this.components["nav"] = NavWidget;
    this.components["divider"] = DividerWidget;
    this.components["tabs"] = TabsWidget;
    this.components["poster"] = PosterWidget;
    this.components["list"] = ListWidget;
    this.components["accordion"] = AccordionWidget;
    this.components["carousel"] = CarouselWidget;
    this.components["map"] = MapWidget;
    this.components["map_builder"] = MapConstructorWidget;
    this.components["diagram"] = DiagramWidget;
    this.components["dashboards"] = DashboardsWidget;
    this.components["tour"] = TourGuide;
    this.components["icon"] = IconWidget;
    this.components["export"] = ExportPanelWindget;
    this.components["html"] = HtmlWidget;
    this.components["template"] = TemplateWidget;
    this.components["video"] = VideoWidget;
  }

  getComponentClass(name) {
    if (!this.components[name]) {
      throw "Не найден компонент с именем " + name;
    }
    return this.components[name];
  }

  checkElementExists(elementName) {
    return !!this.components[elementName];
  }
}
window.frontElementsManager = new FrontElementsManager();
