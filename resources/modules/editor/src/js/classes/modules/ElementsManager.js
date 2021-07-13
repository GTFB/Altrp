// import Input from "../elements/Input";
import InputSelect from "../elements/InputSelect";
import InputSelect2 from "../elements/InputSelect2";
import InputRadio from "../elements/InputRadio";
import InputCheckbox from "../elements/InputCheckbox";
import InputWysiwyg from "../elements/InputWysiwyg";
import InputTextarea from "../elements/InputTextarea";
import InputImageSelect from "../elements/InputImageSelect";
import InputAccept from "../elements/InputAccept";
import InputText from "../elements/InputText";
import InputPassword from "../elements/InputPassword";
import InputNumber from "../elements/InputNumber";
import InputTel from "../elements/InputTel";
import InputEmail from "../elements/InputEmail";
import InputDate from "../elements/InputDate";
import InputHidden from "../elements/InputHidden";
import InputFile from "../elements/InputFile";
import RootElement from "../elements/RootElement";
import RootComponent from "../../components/RootComponent";
import HeadingTypeAnimating from "../elements/HeadingTypeAnimating";
import HeadingTypeHeading from "../elements/HeadingTypeHeading";
import HeadingTypeAnimatingWidget from "../../components/widgets/HeadingTypeAnimatingWidget";
import HeadingTypeHeadingWidget from "../../components/widgets/HeadingTypeHeadingWidget";
import BreadcrumbsWidget from "../../components/widgets/BreadcrumbsWidget";
import ButtonWidget from "../../components/widgets/ButtonWidget";
import Column from "../elements/Column";
import Section from "../elements/Section";
import SectionComponent from "../../components/SectionComponent";
import ColumnComponent from "../../components/ColumnComponent";
import Breadcrumbs from "../elements/Breadcrumbs";
import Button from "../elements/Button";
import Text from "../elements/Text";
import Image from "../elements/Image";
import ImageWidget from "../../components/widgets/ImageWidget";
import TextWidget from "../../components/widgets/TextWidget";
// import InputWidget from "../../components/widgets/InputWidget";
import InputSelectWidget from "../../components/widgets/InputSelectWidget";
import InputSelect2Widget from "../../components/widgets/InputSelect2Widget";
import InputRadioWidget from "../../components/widgets/InputRadioWidget";
import InputCheckboxWidget from "../../components/widgets/InputCheckboxWidget";
import InputWysiwygWidget from "../../components/widgets/InputWysiwygWidget";
import InputTextareaWidget from "../../components/widgets/InputTextareaWidget";
import InputImageSelectWidget from "../../components/widgets/InputImageSelectWidget";
import InputAcceptWidget from "../../components/widgets/InputAcceptWidget";
import InputTextWidget from "../../components/widgets/InputTextWidget";
import InputPasswordWidget from "../../components/widgets/InputPasswordWidget";
import InputNumberWidget from "../../components/widgets/InputNumberWidget";
import InputTelWidget from "../../components/widgets/InputTelWidget";
import InputEmailWidget from "../../components/widgets/InputEmailWidget";
import InputDateWidget from "../../components/widgets/InputDateWidget";
import InputHiddenWidget from "../../components/widgets/InputHiddenWidget";
import InputFileWidget from "../../components/widgets/InputFileWidget";
import TableWidget from "../../components/widgets/TableWidget";
import NavWidget from "../../components/widgets/NavWidget";
import DividerWidget from "../../components/widgets/DividerWidget";
import TabsWidget from "../../components/widgets/TabsWidget";
import ListWidget from "../../components/widgets/ListWidget";
import AccordionWidget from "../../components/widgets/AccordionWidget";
import CarouselWidget from "../../components/widgets/CarouselWidget";
import MapWidget from "../../components/widgets/MapWidget";
import MapConstructorWidget from "../../components/widgets/MapConstructorWidget";
import DiagramWidget from "../../components/widgets/DiagramWidget";
import DashboardsWidget from "../../components/widgets/DashboardsWidget";
import GalleryWidget from "../../components/widgets/GalleryWidget";
import Carousel from "../elements/Carousel";
import Accordion from "../elements/Accordion";
import List from "../elements/List";
import Tabs from "../elements/Tabs";
import Divider from "../elements/Divider";
import Nav from "../elements/Nav";
import Table from "../elements/Table";
import Template from "../elements/Template";
import Posts from "../elements/Posts";
import Map from "../elements/Map";
import Menu from "../elements/Menu";
import MapConstructor from "../elements/MapConstructor";
import Diagram from "../elements/Diagram";
import Dashboards from "../elements/Dashboards";
import PostsWidget from "../../components/widgets/PostsWidget";
import Gallery from "../elements/Gallery";
import Tour from "../elements/Tour";
import TourGuide from "../../components/widgets/TourGuide";
import ExportPanel from "../elements/ExportPanel";
import ExportPanelWidget from "../../components/widgets/ExportPanelWidget";
import Html from "../elements/Html";
import HtmlWidget from "../../components/widgets/HtmlWidget";
import TemplateWidget from "../../components/widgets/TemplateWidget";
import Video from "../elements/Video";
import VideoWidget from "../../components/widgets/VideoWidget";
import SectionWidget from "../elements/SectionWidget";
import MenuWidget from "../../components/widgets/MenuWidget";
import SectionWidgetComponent from "../../components/SectionWidgetComponent";
import DropbarWidget from "../../components/widgets/DropbarWidget";
import Dropbar from "../elements/Dropbar";
import TabsSwitcher from "../elements/TabsSwitcher";
import TabsSwitcherWidget from "../../components/widgets/TabsSwitcherWidget";
import ImageLightbox from "../elements/ImageLightbox";
import ImageLightboxWidget from "../../components/widgets/ImageLightboxWidget";

export default class ElementsManger {
  constructor() {
    this.elements = {};
    // this.elements[Input.getName()] = Input;
    //список элементов
    this.elements[RootElement.getName()] = RootElement;
    this.elements[HeadingTypeHeading.getName()] = HeadingTypeHeading;
    this.elements[HeadingTypeAnimating.getName()] = HeadingTypeAnimating;
    this.elements[Image.getName()] = Image;
    this.elements[Breadcrumbs.getName()] = Breadcrumbs;
    this.elements[Button.getName()] = Button;
    this.elements[Text.getName()] = Text;
    this.elements[Divider.getName()] = Divider;
    this.elements[Column.getName()] = Column;
    this.elements[Section.getName()] = Section;
    // this.elements[List.getName()] = List;
    this.elements[Nav.getName()] = Nav;
    this.elements[TabsSwitcher.getName()] = TabsSwitcher
    // this.elements[Input.getName()] = Input;
    this.elements[InputSelect.getName()] = InputSelect;
    this.elements[InputSelect2.getName()] = InputSelect2;
    this.elements[InputRadio.getName()] = InputRadio;
    this.elements[InputWysiwyg.getName()] = InputWysiwyg;
    this.elements[InputCheckbox.getName()] = InputCheckbox;
    this.elements[InputTextarea.getName()] = InputTextarea;
    this.elements[InputImageSelect.getName()] = InputImageSelect;
    this.elements[InputAccept.getName()] = InputAccept;
    this.elements[InputText.getName()] = InputText;
    this.elements[InputPassword.getName()] = InputPassword;
    this.elements[InputNumber.getName()] = InputNumber;
    this.elements[InputTel.getName()] = InputTel;
    this.elements[InputEmail.getName()] = InputEmail;
    this.elements[InputDate.getName()] = InputDate;
    this.elements[InputHidden.getName()] = InputHidden;
    this.elements[InputFile.getName()] = InputFile;
    this.elements[Table.getName()] = Table;
    this.elements[Posts.getName()] = Posts;
    this.elements[Tabs.getName()] = Tabs;
    this.elements[Accordion.getName()] = Accordion;
    this.elements[Map.getName()] = Map;
    this.elements[MapConstructor.getName()] = MapConstructor;
    this.elements[Menu.getName()] = Menu;
    this.elements[Diagram.getName()] = Diagram;
    this.elements[Dashboards.getName()] = Dashboards;
    this.elements[Carousel.getName()] = Carousel;
    this.elements[Tour.getName()] = Tour;
    this.elements[Template.getName()] = Template;
    this.elements[ExportPanel.getName()] = ExportPanel;
    this.elements[Html.getName()] = Html;
    this.elements[Gallery.getName()] = Gallery;
    this.elements[Video.getName()] = Video;
    this.elements[SectionWidget.getName()] = SectionWidget;
    this.elements[Dropbar.getName()] = Dropbar;
    this.elements[ImageLightbox.getName()] = ImageLightbox;
    // Websocket Notifications
    // this.elements[Notifications.getName()] = Notifications;
    //список компонентов
    this.components = {};
    this.components[RootElement.getName()] = RootComponent;
    this.components[HeadingTypeHeading.getName()] = HeadingTypeHeadingWidget;
    this.components[HeadingTypeAnimating.getName()] = HeadingTypeAnimatingWidget;
    this.components[Section.getName()] = SectionComponent;
    this.components[SectionWidget.getName()] = SectionComponent;
    this.components[Column.getName()] = ColumnComponent;
    this.components[Breadcrumbs.getName()] = BreadcrumbsWidget;
    this.components[Button.getName()] = ButtonWidget;
    // this.components[Input.getName()] = InputWidget;
    this.components[InputSelect.getName()] = InputSelectWidget;
    this.components[InputSelect2.getName()] = InputSelect2Widget;
    this.components[InputRadio.getName()] = InputRadioWidget;
    this.components[InputCheckbox.getName()] = InputCheckboxWidget;
    this.components[InputWysiwyg.getName()] = InputWysiwygWidget;
    this.components[InputTextarea.getName()] = InputTextareaWidget;
    this.components[InputImageSelect.getName()] = InputImageSelectWidget;
    this.components[InputAccept.getName()] = InputAcceptWidget;
    this.components[InputText.getName()] = InputTextWidget;
    this.components[InputPassword.getName()] = InputPasswordWidget;
    this.components[InputNumber.getName()] = InputNumberWidget;
    this.components[InputTel.getName()] = InputTelWidget;
    this.components[InputEmail.getName()] = InputEmailWidget;
    this.components[InputDate.getName()] = InputDateWidget;
    this.components[InputHidden.getName()] = InputHiddenWidget;
    this.components[InputFile.getName()] = InputFileWidget;
    this.components[Text.getName()] = TextWidget;
    this.components[Image.getName()] = ImageWidget;
    this.components[Table.getName()] = TableWidget;
    this.components[Posts.getName()] = PostsWidget;
    this.components[Nav.getName()] = NavWidget;
    this.components[Divider.getName()] = DividerWidget;
    this.components[Tabs.getName()] = TabsWidget;
    this.components[List.getName()] = ListWidget;
    this.components[Accordion.getName()] = AccordionWidget;
    this.components[Carousel.getName()] = CarouselWidget;
    this.components[Map.getName()] = MapWidget;
    this.components[MapConstructor.getName()] = MapConstructorWidget;
    this.components[Menu.getName()] = MenuWidget;
    this.components[Diagram.getName()] = DiagramWidget;
    this.components[Dashboards.getName()] = DashboardsWidget;
    this.components[Tour.getName()] = TourGuide;
    this.components[Template.getName()] = TemplateWidget;
    this.components[ExportPanel.getName()] = ExportPanelWidget;
    this.components[Html.getName()] = HtmlWidget;
    this.components[Gallery.getName()] = GalleryWidget;
    this.components[Video.getName()] = VideoWidget;
    this.components[Dropbar.getName()] = DropbarWidget;
    this.components[TabsSwitcher.getName()] = TabsSwitcherWidget;
    this.components[ImageLightbox.getName()] = ImageLightboxWidget;
    // Websocket Notifications widget
    // this.components[Notifications.getName()] = NotificationsWidget;
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
