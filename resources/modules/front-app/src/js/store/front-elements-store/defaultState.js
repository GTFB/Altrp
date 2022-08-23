
export const defaultState = [
  {
    name: "root-element",
    import: async () => {
      return await import(/* webpackChunkName: 'RootComponent' */ "../../../../../editor/src/js/components/RootComponent");
    }
  },
  {
    name: "heading",
    import: async () => {
      return await import(/* webpackChunkName: 'HeadingTypeHeadingWidget' */ "../../../../../editor/src/js/components/widgets/HeadingTypeHeadingWidget");
    }
  },
  {
    name: "action-trigger",
    import: async () => {
      return await import(/* webpackChunkName: 'ActionTriggerWidget' */ "../../../../../editor/src/js/components/widgets/ActionTriggerWidget");
    }
  },
  {
    name: "heading-type-animating",
    import: async () => {
      return await import(/* webpackChunkName: 'HeadingTypeAnimatingWidget' */ "../../../../../editor/src/js/components/widgets/HeadingTypeAnimatingWidget");
    }
  },
  {
    name: "section",
    import: async () => {
      return await import(/* webpackChunkName: 'SectionComponent' */ "../../../../../editor/src/js/components/SectionComponent");
    }
  },
  {
    name: "section_widget",
    import: async () => {
      return await import(/* webpackChunkName: 'SectionComponent' */ "../../../../../editor/src/js/components/SectionComponent");
    }
  },
  {
    name: "column",
    import: async () => {
      return await import(/* webpackChunkName: 'ColumnComponent' */ "../../../../../editor/src/js/components/ColumnComponent");
    }
  },
  {
    name: "input",
    import: async () => {
      return await import(/* webpackChunkName: 'InputWidget' */ "../../../../../editor/src/js/components/widgets/InputWidget");
    }
  },
  {
    name: "input-text-common",
    import: async () => {
      return await import(/* webpackChunkName: 'InputTextCommonWidget' */ "../../../../../editor/src/js/components/widgets/InputTextCommonWidget");
    }
  },
  {
    name: "input-text-autocomplete",
    import: async () => {
      return await import(/* webpackChunkName: 'InputTextCommonWidget' */ "../../../../../editor/src/js/components/widgets/InputTextAutocompleteWidget");
    }
  },
  {
    name: "input-text",
    import: async () => {
      return await import(/* webpackChunkName: 'InputTextCommonWidget' */ "../../../../../editor/src/js/components/widgets/InputTextWidget");
    }
  },
  {
    name: "input-select",
    import: async () => {
      return await import(/* webpackChunkName: 'InputSelectWidget' */ "../../../../../editor/src/js/components/widgets/InputSelectWidget");
    }
  },
  {
    name: "input-select-tree",
    import: async () => {
      return await import(/* webpackChunkName: 'InputSelectTreeWidget' */ "../../../../../editor/src/js/components/widgets/InputSelectTreeWidget");
    }
  },
  {
    name: "input-multi-select",
    import: async () => {
      return await import(/* webpackChunkName: 'InputSelectWidget' */ "../../../../../editor/src/js/components/widgets/InputMultiSelectWidget");
    }
  },
  {
    name: "input-select2",
    import: async () => {
      return await import(/* webpackChunkName: 'InputSelect2Widget' */ "../../../../../editor/src/js/components/widgets/InputSelect2Widget");
    }
  },
  {
    name: "input-radio",
    import: async () => {
      return await import(/* webpackChunkName: 'InputRadio' */ "../../../../../editor/src/js/components/widgets/InputRadioWidget");
    }
  },
  {
    name: "input-checkbox",
    import: async () => {
      return await import(/* webpackChunkName: 'InputCheckbox' */ "../../../../../editor/src/js/components/widgets/InputCheckboxWidget");
    }
  },
  {
    name: "input-wysiwyg",
    import: async () => {
      return await import(/* webpackChunkName: 'InputWysiwyg' */ "../../../../../editor/src/js/components/widgets/InputWysiwygWidget");
    }
  },
  {
    name: "input-textarea",
    import: async () => {
      return await import(/* webpackChunkName: 'InputTextarea' */ "../../../../../editor/src/js/components/widgets/InputTextareaWidget");
    }
  },
  {
    name: "input-image-select",
    import: async () => {
      return await import(/* webpackChunkName: 'InputImageSelect' */ "../../../../../editor/src/js/components/widgets/InputImageSelectWidget");
    }
  },
  {
    name: "input-accept",
    import: async () => {
      return await import(/* webpackChunkName: 'InputAccept' */ "../../../../../editor/src/js/components/widgets/InputAcceptWidget");
    }
  },
  {
    name: "input-date",
    import: async () => {
      return await import(/* webpackChunkName: 'InputDate' */ "../../../../../editor/src/js/components/widgets/InputDateWidget");
    }
  },
  {
    name: "input-date-range",
    import: async () => {
      return await import(/* webpackChunkName: 'InputDateRange' */ "../../../../../editor/src/js/components/widgets/InputDateRangeWidget");
    }
  },
  {
    name: "stars",
    import: async () => {
      return await import(/* webpackChunkName: 'Stars' */ "../../../../../editor/src/js/components/widgets/StarsWidget");
    }
  },
  {
    name: "progress-bar",
    import: async () => {
      return await import(/* webpackChunkName: 'ProgressBar' */ "../../../../../editor/src/js/components/widgets/ProgressBarWidget");
    }
  },
  {
    name: "input-hidden",
    import: async () => {
      return await import(/* webpackChunkName: 'InputHidden' */ "../../../../../editor/src/js/components/widgets/InputHiddenWidget");
    }
  },
  {
    name: "input-file",
    import: async () => {
      return await import(/* webpackChunkName: 'InputFile' */ "../../../../../editor/src/js/components/widgets/InputFileWidget");
    }
  },
  {
    name: "input-gallery",
    import: async () => {
      return await import(/* webpackChunkName: 'InputGallery' */ "../../../../../editor/src/js/components/widgets/InputGalleryWidget");
    }
  },
  {
    name: "input-crop-image",
    import: async () => {
      return await import(/* webpackChunkName: 'InputCropImageWidget' */ "../../../../../editor/src/js/components/widgets/InputCropImageWidget");
    }
  },
  {
    name: "button",
    import: async () => {
      return await import(/* webpackChunkName: 'ButtonWidget' */ "../../../../../editor/src/js/components/widgets/ButtonWidget");
    }
  },
  {
    name: "breadcrumbs",
    import: async () => {
      return await import(/* webpackChunkName: 'BreadcrumbsWidget' */ "../../../../../editor/src/js/components/widgets/BreadcrumbsWidget");
    }
  },
  {
    name: "text",
    import: async () => {
      return await import(/* webpackChunkName: 'TextWidget' */ "../../../../../editor/src/js/components/widgets/TextWidget");
    }
  },
  {
    name: "image",
    import: async () => {
      return await import(/* webpackChunkName: 'ImageWidget' */ "../../../../../editor/src/js/components/widgets/ImageWidget");
    }
  },
  {
    name: "table",
    import: async () => {
      return await import(/* webpackChunkName: 'TableWidget' */ "../../../../../editor/src/js/components/widgets/TableWidget");
    }
  },
  {
    name: "posts",
    import: async () => {
      return await import(/* webpackChunkName: 'PostsWidget' */ "../../../../../editor/src/js/components/widgets/PostsWidget");
    }
  },
  {
    name: "nav",
    import: async () => {
      return await import(/* webpackChunkName: 'NavWidget' */ "../../../../../editor/src/js/components/widgets/NavWidget");
    }
  },
  {
    name: "divider",
    import: async () => {
      return await import(/* webpackChunkName: 'DividerWidget' */ "../../../../../editor/src/js/components/widgets/DividerWidget");
    }
  },
  {
    name: "tabs",
    import: async () => {
      return await import(/* webpackChunkName: 'TabsWidget' */ "../../../../../editor/src/js/components/widgets/TabsWidget");
    }
  },
  {
    name: "poster",
    import: async () => {
      return await import(/* webpackChunkName: 'PosterWidget' */ "../../../../../editor/src/js/components/widgets/PosterWidget");
    }
  },
  {
    name: "list",
    import: async () => {
      return await import(/* webpackChunkName: 'ListWidget' */ "../../../../../editor/src/js/components/widgets/ListWidget");
    }
  },
  {
    name: "accordion",
    import: async () => {
      return await import(/* webpackChunkName: 'AccordionWidget' */ "../../../../../editor/src/js/components/widgets/AccordionWidget/AccordionWidget");
    }
  },
  {
    name: "carousel",
    import: async () => {
      return await import(/* webpackChunkName: 'CarouselWidget' */ "../../../../../editor/src/js/components/widgets/CarouselWidget");
    }
  },
  {
    name: "map",
    import: async () => {
      return await import(/* webpackChunkName: 'MapWidget' */ "../../../../../editor/src/js/components/widgets/MapWidget");
    }
  },
  {
    name: "map_builder",
    import: async () => {
      return await import(/* webpackChunkName: 'MapConstructorWidget' */ "../../../../../editor/src/js/components/widgets/MapConstructorWidget");
    }
  },
  {
    name: "location",
    import: async () => {
      return await import(/* webpackChunkName: 'LocationWidget' */ "../../../../../editor/src/js/components/widgets/LocationWidget");
    }
  },
  {
    name: "menu",
    import: async () => {
      return await import(/* webpackChunkName: 'MenuWidget' */ "../../../../../editor/src/js/components/widgets/MenuWidget");
    }
  },
  {
    name: "pie-diagram",
    import: async () => {
      return await import(/* webpackChunkName: 'PieDiagramWidget' */ "../../../../../editor/src/js/components/widgets/diagrams/PieDiagramWidget");
    }
  },
  {
    name: "bar-diagram",
    import: async () => {
      return await import(/* webpackChunkName: 'BarDiagramWidget' */ "../../../../../editor/src/js/components/widgets/diagrams/BarDiagramWidget");
    }
  },
  {
    name: "line-diagram",
    import: async () => {
      return await import(/* webpackChunkName: 'LineDiagramWidget' */ "../../../../../editor/src/js/components/widgets/diagrams/LineDiagramWidget");
    }
  },
  {
    name: "funnel-diagram",
    import: async () => {
      return await import(/* webpackChunkName: 'FunnelDiagramWidget' */ "../../../../../editor/src/js/components/widgets/diagrams/FunnelDiagramWidget");
    }
  },
  {
    name: "radar-diagram",
    import: async () => {
      return await import(/* webpackChunkName: 'RadarDiagramWidget' */ "../../../../../editor/src/js/components/widgets/diagrams/RadarDiagramWidget");
    }
  },
  {
    name: "dashboards",
    import: async () => {
      return await import(/* webpackChunkName: 'DashboardsWidget' */ "../../../../../editor/src/js/components/widgets/DashboardsWidget");
    }
  },
  {
    name: "tour",
    import: async () => {
      return await import(/* webpackChunkName: 'TourGuide' */ "../../../../../editor/src/js/components/widgets/TourGuide");
    }
  },
  {
    name: "icon",
    import: async () => {
      return await import(/* webpackChunkName: 'IconWidget' */ "../../../../../editor/src/js/components/widgets/IconWidget");
    }
  },
  {
    name: "export",
    import: async () => {
      return await import(/* webpackChunkName: 'ExportPanelWidget' */ "../../../../../editor/src/js/components/widgets/ExportPanelWidget");
    }
  },
  {
    name: "html",
    import: async () => {
      return await import(/* webpackChunkName: 'HtmlWidget' */ "../../../../../editor/src/js/components/widgets/HtmlWidget");
    }
  },
  {
    name: "template",
    import: async () => {
      return await import(/* webpackChunkName: 'TemplateWidget' */ "../../../../../editor/src/js/components/widgets/TemplateWidget");
    }
  },
  {
    name: "gallery",
    import: async () => {
      return await import(/* webpackChunkName: 'GalleryWidget' */ "../../../../../editor/src/js/components/widgets/GalleryWidget");
    }
  },
  {
    name: "video",
    import: async () => {
      return await import(/* webpackChunkName: 'VideoWidget' */ "../../../../../editor/src/js/components/widgets/VideoWidget");
    }
  },
  {
    name: "dropbar",
    import: async () => {
      return await import(/* webpackChunkName: 'DropbarWidget' */ "../../../../../editor/src/js/components/widgets/DropbarWidget");
    }
  },
  {
    name: "tabs-switcher",
    import: async () => {
      return await import(/* webpackChunkName: 'TabsSwitcherWidget' */ "../../../../../editor/src/js/components/widgets/TabsSwitcherWidget");
    }
  },
  {
    name: "image-lightbox",
    import: async () => {
      return await import(/* webpackChunkName: 'TabsSwitcherWidget' */ "../../../../../editor/src/js/components/widgets/ImageLightboxWidget");
    }
  },
  {
    name: "input-slider",
    import: async () => {
      return await import(/* webpackChunkName: 'InputSliderWidget' */ "../../../../../editor/src/js/components/widgets/InputSliderWidget");
    }
  },
  {
    name: "input-range-slider",
    import: async () => {
      return await import(/* webpackChunkName: 'InputRangeSliderWidget' */ "../../../../../editor/src/js/components/widgets/InputRangeSliderWidget");
    }
  },
  {
    name: "scheduler",
    import: async () => {
      return await import(/* webpackChunkName: 'SchedulerWidget' */ "../../../../../editor/src/js/components/widgets/SchedulerWidget");
    }
  },
  {
    name: "tree",
    import: async () => {
      return await import(/* webpackChunkName: 'TreeWidget' */ "../../../../../editor/src/js/components/widgets/TreeWidget");
    }
  },
  {
    name: "tournament",
    import: async () => {
      return await import(/* webpackChunkName: 'TournamentWidget' */ "../../../../../editor/src/js/components/widgets/TournamentWidget");
    }
  },
  {
    name: "feedback",
    import: async () => {
      return await import(/* webpackChunkName: 'FeedbackWidget' */ "../../../../../editor/src/js/components/widgets/FeedbackWidget");
    }
  },
  {
    name: "input-pagination",
    import: async () => {
      return await import(/* webpackChunkName: 'InputPaginationWidget' */ "../../../../../editor/src/js/components/widgets/InputPaginationWidget");
    }
  }
]

export const initialState = {
  frontElements: defaultState
}
