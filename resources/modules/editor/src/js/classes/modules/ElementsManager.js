import Input from "../elements/Input";
import RootElement from "../elements/RootElement";
import RootComponent from "../../components/RootComponent";
import HeadingElement from "../elements/Heading";
import HeadingWidget from "../../components/widgets/HeadingWidget";
import ButtonWidget from "../../components/widgets/ButtonWidget";
import Column from "../elements/Column";
import Section from "../elements/Section";
import SectionComponent from "../../components/SectionComponent";
import ColumnComponent from "../../components/ColumnComponent";
import Button from "../elements/Button";
import Text from "../elements/Text";
import Image from "../elements/Image";
import ImageWidget from "../../components/widgets/ImageWidget";
import TextWidget from "../../components/widgets/TextWidget";
import InputWidget from "../../components/widgets/InputWidget";
import TableWidget from "../../components/widgets/TableWidget";
import NavWidget from "../../components/widgets/NavWidget";
import DividerWidget from "../../components/widgets/DividerWidget";
import TabsWidget from "../../components/widgets/TabsWidget";
import PosterWidget from "../../components/widgets/PosterWidget";
import ListWidget from "../../components/widgets/ListWidget";
import AccordionWidget from "../../components/widgets/AccordionWidget";
import CarouselWidget from "../../components/widgets/CarouselWidget";
import MapWidget from "../../components/widgets/MapWidget";
import MapConstructorWidget from "../../components/widgets/MapConstructorWidget";
import DiagramWidget from "../../components/widgets/DiagramWidget";
import DashboardsWidget from "../../components/widgets/DashboardsWidget";
import Carousel from "../elements/Carousel";
import Accordion from "../elements/Accordion";
import List from "../elements/List";
import Poster from "../elements/Poster";
import Tabs from "../elements/Tabs";
import Divider from "../elements/Divider";
import Nav from "../elements/Nav";
import Table from "../elements/Table";
import Template from "../elements/Template";
import Posts from "../elements/Posts";
import Map from "../elements/Map";
import MapConstructor from "../elements/MapConstructor";
import Diagram from "../elements/Diagram";
import Dashboards from "../elements/Dashboards";
import PostsWidget from "../../components/widgets/PostsWidget";
import IconWidget from "../../components/widgets/IconWidget";
import Icon from "../elements/Icon";
import Tour from "../elements/Tour";
import TourGuide from "../../components/widgets/TourGuide";
import ExportPanel from "../elements/ExportPanel";
import ExportPanelWidget from "../../components/widgets/ExportPanelWidget";
import Html from "../elements/Html";
import HtmlWidget from "../../components/widgets/HtmlWidget";
import TemplateWidget from "../../components/widgets/TemplateWidget";
import Video from "../elements/Video";
import VideoWidget from "../../components/widgets/VideoWidget";


export default class ElementsManger {
  constructor() {
    this.elements = {};
    // this.elements[Input.getName()] = Input;
    //список элементов
    this.elements[RootElement.getName()] = RootElement;
    this.elements[HeadingElement.getName()] = HeadingElement;
    this.elements[Image.getName()] = Image;
    this.elements[Button.getName()] = Button;
    this.elements[Icon.getName()] = Icon;
    this.elements[Text.getName()] = Text;
    this.elements[Divider.getName()] = Divider;
    this.elements[Column.getName()] = Column;
    this.elements[Section.getName()] = Section;
    this.elements[List.getName()] = List;
    this.elements[Nav.getName()] = Nav;
    this.elements[Input.getName()] = Input;
    this.elements[Table.getName()] = Table;
    this.elements[Posts.getName()] = Posts;
    this.elements[Poster.getName()] = Poster;
    this.elements[Tabs.getName()] = Tabs;
    this.elements[Accordion.getName()] = Accordion;
    this.elements[Map.getName()] = Map;
    this.elements[MapConstructor.getName()] = MapConstructor;
    this.elements[Diagram.getName()] = Diagram;
    this.elements[Dashboards.getName()] = Dashboards;
    this.elements[Carousel.getName()] = Carousel;
    this.elements[Tour.getName()] = Tour;
    this.elements[Template.getName()] = Template;
    this.elements[ExportPanel.getName()] = ExportPanel;
    this.elements[Html.getName()] = Html;
    this.elements[Video.getName()] = Video;

    //список компонентов
    this.components = {};
    this.components[RootElement.getName()] = RootComponent;
    this.components[HeadingElement.getName()] = HeadingWidget;
    this.components[Section.getName()] = SectionComponent;
    this.components[Column.getName()] = ColumnComponent;
    this.components[Button.getName()] = ButtonWidget;
    this.components[Input.getName()] = InputWidget;
    this.components[Text.getName()] = TextWidget;
    this.components[Image.getName()] = ImageWidget;
    this.components[Table.getName()] = TableWidget;
    this.components[Posts.getName()] = PostsWidget;
    this.components[Nav.getName()] = NavWidget;
    this.components[Divider.getName()] = DividerWidget;
    this.components[Tabs.getName()] = TabsWidget;
    this.components[Poster.getName()] = PosterWidget;
    this.components[List.getName()] = ListWidget;
    this.components[Accordion.getName()] = AccordionWidget;
    this.components[Carousel.getName()] = CarouselWidget;
    this.components[Map.getName()] = MapWidget;
    this.components[MapConstructor.getName()] = MapConstructorWidget;
    this.components[Diagram.getName()] = DiagramWidget;
    this.components[Dashboards.getName()] = DashboardsWidget;
    this.components[Icon.getName()] = IconWidget;
    this.components[Tour.getName()] = TourGuide;
    this.components[Template.getName()] = TemplateWidget;
    this.components[ExportPanel.getName()] = ExportPanelWidget;
    this.components[Html.getName()] = HtmlWidget;
    this.components[Video.getName()] = VideoWidget;
  }

  getElements() {
    return this.elements;
  }

  getElementClass(name) {
    if (!this.elements[name]) {
      throw "Не найден элемент с именем " + name;
    }
    return this.elements[name];
  }

  getComponentClass(name) {
    if (!this.components[name]) {
      throw "Не найден компонент с именем " + name;
    }
    return this.components[name];
  }

  getWidgetsList() {
    if (!this.widgetList) {
      this.widgetList = [];
      for (let elementName in this.elements) {
        if (
          this.elements.hasOwnProperty(elementName) &&
          this.elements[elementName].getType() === "widget"
        ) {
          this.widgetList.push(this.elements[elementName]);
        }
      }
    }
    return this.widgetList;
  }

  checkElementExists(elementName) {
    return !!this.elements[elementName];
  }
}
