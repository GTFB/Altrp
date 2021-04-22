import RootComponent from "../../../../editor/src/js/components/RootComponent";
import SectionComponent from "../../../../editor/src/js/components/SectionComponent";
import ColumnComponent from "../../../../editor/src/js/components/ColumnComponent";
import HeadingWidget from "../../../../editor/src/js/components/widgets/HeadingWidget";
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
import ExportPanelWidget from "../../../../editor/src/js/components/widgets/ExportPanelWidget";
import HtmlWidget from "../../../../editor/src/js/components/widgets/HtmlWidget";
import TemplateWidget from "../../../../editor/src/js/components/widgets/TemplateWidget";
import GalleryWidget from "../../../../editor/src/js/components/widgets/GalleryWidget";
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
    this.components["export"] = ExportPanelWidget;
    this.components["html"] = HtmlWidget;
    this.components["template"] = TemplateWidget;
    this.components["gallery"] = GalleryWidget
    this.components["video"] = VideoWidget;

    // this.components["root-element"] = RootComponent;
    // this.components["section"] = SectionComponent;
    // this.components["column"] = ColumnComponent;
    // this.components["heading"] = ColumnComponent;
    // this.components["input"] = ColumnComponent;
    // this.components["button"] = ColumnComponent;
    // this.components["text"] = ColumnComponent;
    // this.components["image"] = ColumnComponent;
    // this.components["table"] = ColumnComponent;
    // this.components["posts"] = ColumnComponent;
    // this.components["nav"] = ColumnComponent;
    // this.components["divider"] = ColumnComponent;
    // this.components["tabs"] = ColumnComponent;
    // this.components["poster"] = ColumnComponent;
    // this.components["list"] = ColumnComponent;
    // this.components["accordion"] = ColumnComponent;
    // this.components["carousel"] = ColumnComponent;
    // this.components["map"] = ColumnComponent;
    // this.components["map_builder"] = ColumnComponent;
    // this.components["diagram"] = ColumnComponent;
    // this.components["dashboards"] = ColumnComponent;
    // this.components["tour"] = ColumnComponent;
    // this.components["icon"] = ColumnComponent;
    // this.components["export"] = ColumnComponent;
    // this.components["html"] = ColumnComponent;
    // this.components["template"] = ColumnComponent;
    // this.components["gallery"] = ColumnComponent;
    // this.components["video"] = ColumnComponent;
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
