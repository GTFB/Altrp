import {sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";
import {getResponsiveSetting} from"../../../../../../front-app/src/js/helpers";

export default function CarouselComponent(settings) {
  const styles = [
    "altrp-carousel-slide",

    ["height", "height_slides_content", "slider"],
    ["background-color", "background_slides_style", "color"],
    ["padding", "padding_slides_style", "dimensions"],
    ["border-radius", "border_radius_slides_style", "dimensions"],

    "}",

    //state disabled
    ".state-disabled .altrp-carousel-slide",

    ["height", "height_slides_content", "slider", ".state-disabled"],
    ["background-color", "background_slides_style", "color", ".state-disabled"],
    ["padding", "padding_slides_style", "dimensions", ".state-disabled"],
    ["border-radius", "border_radius_slides_style", "dimensions", ".state-disabled"],

    "}",

    //state active
    ".active .altrp-carousel-slide",

    ["height", "height_slides_content", "slider", ".active"],
    ["background-color", "background_slides_style", "color", ".active"],
    ["padding", "padding_slides_style", "dimensions", ".active"],
    ["border-radius", "border_radius_slides_style", "dimensions", ".active"],

    "}",

    "altrp-carousel-slide:hover",

    ["background-color", "background_slides_style", "color", ":hover"],
    ["border-radius", "border_radius_slides_style", "dimensions", ":hover"],

    "}",

    "slick-list",

    ["width", "width_slides_content", "slider"],

    "}",

    //state disabled
    ".state-disabled .slick-list",

    ["width", "width_slides_content", "slider", ".state-disabled"],

    "}",

    //state active
    ".active .slick-list",

    ["width", "width_slides_content", "slider", ".active"],

    "}",

    "altrp-carousel-slide-img",

    ["background-size", "image_fit_additional_content"],

    "}",

    () => {
      const value = getResponsiveSetting(settings, "space_between_slides_style");
      const slider = sliderStyled(value);

      if(slider) {
        return `
        & .slick-slide { padding: 0 ${slider}; }
        & .altrp-carousel-dots { padding 0 ${slider}; }
        `
      }
    },

    //state disabled
    ".state-disabled .altrp-carousel-slide-img",

    ["background-size", "image_fit_additional_content", "", ".state-disabled"],

    "}",

    () => {
      const value = getResponsiveSetting(settings, "space_between_slides_style", ".state-disabled");
      const slider = sliderStyled(value);

      if(slider) {
        return `
        & .state-disabled .slick-slide { padding: 0 ${slider}; }
        & .state-disabled .altrp-carousel-dots { padding 0 ${slider}; }
        `
      }
    },

    //state active
    ".active .altrp-carousel-slide-img",

    ["background-size", "image_fit_additional_content", "", ".active"],

    "}",

    () => {
      const value = getResponsiveSetting(settings, "space_between_slides_style", ".active");
      const slider = sliderStyled(value);

      if(slider) {
        return `
        & .active .slick-slide { padding: 0 ${slider}; }
        & .active .altrp-carousel-dots { padding 0 ${slider}; }
        `
      }
    },

    "altrp-carousel-arrow",

    ["padding", "padding_arrows_navigation_style", "dimensions"],
    ["border-radius", "border_radius_arrows_navigation_style", "dimensions"],
    ["background-color", "arrows_background_navigation_style", "color"],
    () => {
      const value = getResponsiveSetting(settings, "arrows_size_navigation_style");
      const slider = sliderStyled(value);

      if(slider) {
        return `svg {height: ${slider}; width: ${slider};}`
      }
    },

    "& svg path",

    ["stroke", "arrows_color_navigation_style", "color"],

    "}",

    "}",


    () => {
      const value = getResponsiveSetting(settings, "horizontal_offset_arrows_navigation_style");
      const slider = sliderStyled(value);

      if(slider) {
        return `
        & .altrp-carousel-arrow-prev { left: ${slider}; }
        & .altrp-carousel-arrow-next { right: ${slider}; }
        `
      }
    },

    () => {
      const value = getResponsiveSetting(settings, "vertical_no_center_offset_arrows_navigation_style");
      const slider = sliderStyled(value);

      if(slider) {
        return `
        & .altrp-carousel-arrow { top:${slider}; }
        `
      } else {
        return ""
      }
    },

    //state disabled
    ".state-disabled .altrp-carousel-arrow",

    ["padding", "padding_arrows_navigation_style", "dimensions", ".state-disabled "],
    ["border-radius", "border_radius_arrows_navigation_style", "dimensions", ".state-disabled "],
    ["background-color", "arrows_background_navigation_style", "color", ".state-disabled "],
    () => {
      const value = getResponsiveSetting(settings, "arrows_size_navigation_style", ".state-disabled ");
      const slider = sliderStyled(value);

      if(slider) {
        return `svg {height: ${slider}; width: ${slider};}`
      }
    },

    "& .state-disabled svg path",

    ["stroke", "arrows_color_navigation_style", "color", ".state-disabled "],

    "}",

    "}",


    () => {
      const value = getResponsiveSetting(settings, "horizontal_offset_arrows_navigation_style", ".state-disabled");
      const slider = sliderStyled(value);

      if(slider) {
        return `
        & .state-disabled .altrp-carousel-arrow-prev { left: ${slider}; }
        & .state-disabled .altrp-carousel-arrow-next { right: ${slider}; }
        `
      }
    },

    () => {
      const value = getResponsiveSetting(settings, "vertical_no_center_offset_arrows_navigation_style", ".state-disabled");
      const slider = sliderStyled(value);

      if(slider) {
        return `
        & .state-disabled .altrp-carousel-arrow { top:${slider}; }
        `
      } else {
        return ""
      }
    },

    "altrp-carousel-arrow:hover",

    ["background-color", "arrows_background_navigation_style", "color", ":hover"],
    ["border-radius", "border_radius_arrows_navigation_style", "dimensions", ":hover"],

    "& svg path",

    ["stroke", "arrows_color_navigation_style", "color", ":hover"],

    "}",

    () => {
      const value = getResponsiveSetting(settings, "arrows_size_navigation_style", ":hover");
      const slider = sliderStyled(value);

      if(slider) {
        return `& svg { height: ${slider}; width: ${slider}; }`
      } else {
        return ""
      }
    },

    "}",

    () => {
      const value = getResponsiveSetting(settings, "dots_size_navigation_style");
      const slider = sliderStyled(value);

      if(slider) {
        return `
        & .altrp-carousel-paging { width: ${slider}; height: ${slider}; }
        `
      } else {
        return ""
      }
      // & .altrp-carousel-dots li { margin-left: calc(${slider} * 0.1); }
    },

    "altrp-carousel-paging",

    ["background-color", "background_color_dots_navigation_style", "color"],

    "}",

    //state disabled
    ".state-disabled .altrp-carousel-paging",

    ["background-color", "background_color_dots_navigation_style", "color", ".state-disabled"],

    "}",

    //state active
    ".active .altrp-carousel-paging",

    ["background-color", "background_color_dots_navigation_style", "color", ".active"],

    "}",

    "altrp-carousel-paging:hover",

    ["background-color", "background_color_dots_navigation_style", "color", ":hover"],

    "}",

    "altrp-carousel-dots .slick-active .altrp-carousel-paging",

    ["background-color", "background_color_active_dots_navigation_style", "color"],

    "}",

    //state disabled
    ".state-disabled .altrp-carousel-dots .slick-active .altrp-carousel-paging",

    ["background-color", "background_color_active_dots_navigation_style", "color", ".state-disabled"],

    "}",

    //state active
    ".active .altrp-carousel-dots .slick-active .altrp-carousel-paging",

    ["background-color", "background_color_active_dots_navigation_style", "color", ".active"],

    "}",

    "altrp-carousel-dots .slick-active .altrp-carousel-paging:hover",

    ["background-color", "background_color_active_dots_navigation_style", "color", ":hover"],

    "}",

    "altrp-carousel-dots",

    ["left", "horizontal_offset_dots_navigation_style", "slider"],
    () => {
      const value = getResponsiveSetting(settings, "vertical_no_center_offset_dots_navigation_style");
      const slider = sliderStyled(value);

      if(slider) {
        return `
      transform: translateY(${slider})
      `
      }
    },

    "}",

    //state disabled
    ".state-disabled .altrp-carousel-dots",

    ["left", "horizontal_offset_dots_navigation_style", "slider", ".state-disabled"],
    () => {
      const value = getResponsiveSetting(settings, "vertical_no_center_offset_dots_navigation_style", ".state-disabled");
      const slider = sliderStyled(value);

      if(slider) {
        return `
      transform: translateY(${slider})
      `
      }
    },

    "}",

    //state active
    ".active .altrp-carousel-dots",

    ["left", "horizontal_offset_dots_navigation_style", "slider", ".active"],
    () => {
      const value = getResponsiveSetting(settings, "vertical_no_center_offset_dots_navigation_style", ".active");
      const slider = sliderStyled(value);

      if(slider) {
        return `
      transform: translateY(${slider})
      `
      }
    },

    "}",

    "altrp-carousel-slide-overlay",

    ["background-color", "background_color_overlay", "color"],


    "& .altrp-carousel-slide-overlay-text",

    ["color", "font_color_overlay", "color"],
    ["", "typographic_overlay", "typographic"],

    "}",

    "}",

    //state disabled
    ".state-disabled .altrp-carousel-slide-overlay",

    ["background-color", "background_color_overlay", "color", ".state-disabled"],


    "& .state-disabled .altrp-carousel-slide-overlay-text",

    ["color", "font_color_overlay", "color", ".state-disabled"],
    ["", "typographic_overlay", "typographic", ".state-disabled"],

    "}",

    "}",

    //state active
    ".active .altrp-carousel-slide-overlay",

    ["background-color", "background_color_overlay", "color", ".active"],


    "& .active .altrp-carousel-slide-overlay-text",

    ["color", "font_color_overlay", "color", ".active"],
    ["", "typographic_overlay", "typographic", ".active"],

    "}",

    "}",

    "altrp-carousel-slide-overlay:hover",

    ["background-color", "background_color_overlay", "color", ":hover"],


    "& .altrp-carousel-slide-overlay-text",
    ["color", "font_color_overlay", "color", ":hover"],
    "}",
    "}"
  ];

  return styledString(styles, settings)
}
