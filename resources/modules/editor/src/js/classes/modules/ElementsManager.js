// import Input from "../elements/Input";
import InputTextCommon from "../elements/InputTextCommon";
import InputSelect from "../elements/InputSelect";
import InputSelect2 from "../elements/InputSelect2";
import InputRadio from "../elements/InputRadio";
import InputCheckbox from "../elements/InputCheckbox";
import InputWysiwyg from "../elements/InputWysiwyg";
import InputTextarea from "../elements/InputTextarea";
import InputImageSelect from "../elements/InputImageSelect";
import InputAccept from "../elements/InputAccept";
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
import InputTextCommonWidget from "../../components/widgets/InputTextCommonWidget";
import InputSelectWidget from "../../components/widgets/InputSelectWidget";
import InputSelect2Widget from "../../components/widgets/InputSelect2Widget";
import InputRadioWidget from "../../components/widgets/InputRadioWidget";
import InputCheckboxWidget from "../../components/widgets/InputCheckboxWidget";
import InputWysiwygWidget from "../../components/widgets/InputWysiwygWidget";
import InputTextareaWidget from "../../components/widgets/InputTextareaWidget";
import InputImageSelectWidget from "../../components/widgets/InputImageSelectWidget";
import InputAcceptWidget from "../../components/widgets/InputAcceptWidget";
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
import InputSlider from "../elements/InputSlider";
import InputSliderWidget from "../../components/widgets/InputSliderWidget";
import InputGallery from "../elements/InputGallery";
import InputGalleryWidget from "../../components/widgets/InputGalleryWidget";
import InputRangeSlider from "../elements/InputRangeSlider";
import InputRangeSliderWidget from "../../components/widgets/InputRangeSliderWidget";
import InputMultiSelect from "../elements/InputMultiSelect";
import InputMultiSelectWidget from "../../components/widgets/InputMultiSelectWidget";
import Scheduler from "../elements/Scheduler";
import SchedulerWidget from "../../components/widgets/SchedulerWidget";
import Icon from '../elements/Icon';
import IconWidget from "../../components/widgets/IconWidget";
import InputTextAutocomplete from "../elements/InputTextAutocomplete";
import InputTextAutocompleteWidget from "../../components/widgets/InputTextAutocompleteWidget";
import Tree from "../elements/Tree";
import TreeWidget from "../../components/widgets/TreeWidget";
import InputSelectTree from "../elements/InputSelectTree";
import InputSelectTreeWidget from "../../components/widgets/InputSelectTreeWidget";
import InputDateRange from "../elements/InputDateRange";
import InputDateRangeWidget from "../../components/widgets/InputDateRangeWidget";

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
    this.elements[InputCheckbox.getName()] = InputCheckbox;
    this.elements[InputGallery.getName()] = InputGallery;
    this.elements[InputRadio.getName()] = InputRadio;
    this.elements[InputRangeSlider.getName()] = InputRangeSlider;
    this.elements[InputSelect.getName()] = InputSelect;
    this.elements[InputMultiSelect.getName()] = InputMultiSelect;
    this.elements[InputSelect2.getName()] = InputSelect2;
    this.elements[InputSlider.getName()] = InputSlider;
    this.elements[InputTextCommon.getName()] = InputTextCommon;
    this.elements[InputTextAutocomplete.getName()] = InputTextAutocomplete;
    this.elements[InputTextarea.getName()] = InputTextarea;
    this.elements[InputWysiwyg.getName()] = InputWysiwyg;
    this.elements[InputImageSelect.getName()] = InputImageSelect;
    this.elements[InputAccept.getName()] = InputAccept;
    this.elements[InputDate.getName()] = InputDate;
    this.elements[InputDateRange.getName()] = InputDateRange;
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
    this.elements[Scheduler.getName()] = Scheduler;
    this.elements[Tree.getName()] = Tree;
    this.elements[Icon.getName()] = Icon;
    this.elements[InputSelectTree.getName()] = InputSelectTree;

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
    this.components[InputTextCommon.getName()] = InputTextCommonWidget;
    this.components[InputTextAutocomplete.getName()] = InputTextAutocompleteWidget;
    this.components[InputSelect.getName()] = InputSelectWidget;
    this.components[InputSelectTree.getName()] = InputSelectTreeWidget;
    this.components[InputMultiSelect.getName()] = InputMultiSelectWidget;
    this.components[InputSelect2.getName()] = InputSelect2Widget;
    this.components[InputRadio.getName()] = InputRadioWidget;
    this.components[InputCheckbox.getName()] = InputCheckboxWidget;
    this.components[InputWysiwyg.getName()] = InputWysiwygWidget;
    this.components[InputTextarea.getName()] = InputTextareaWidget;
    this.components[InputImageSelect.getName()] = InputImageSelectWidget;
    this.components[InputAccept.getName()] = InputAcceptWidget;
    this.components[InputDate.getName()] = InputDateWidget;
    this.components[InputDateRange.getName()] = InputDateRangeWidget;
    this.components[InputHidden.getName()] = InputHiddenWidget;
    this.components[InputFile.getName()] = InputFileWidget;
    this.components[InputGallery.getName()] = InputGalleryWidget;
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
    this.components[InputSlider.getName()] = InputSliderWidget;
    this.components[InputRangeSlider.getName()] = InputRangeSliderWidget;
    this.components[Scheduler.getName()] = SchedulerWidget;
    this.components[Tree.getName()] = TreeWidget;
    this.components[Icon.getName()] = IconWidget;
    // Websocket Notifications widget
    // this.components[Notifications.getName()] = NotificationsWidget;
  }

  getElements() {
    return this.elements;
  }

  getElementClass(name) {
    if (!this.elements[name]) {
      throw "Not found element with name " + name;
    }
    return this.elements[name];
  }

  getComponentClass(name) {
    if (!this.components[name]) {
      throw "Not found component with name " + name;
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
