import styled from "styled-components";
import {sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";
import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";

/**
 * @return {string}
 */

export default function CarouselComponent(settings) {
  const styles = [
    "altrp-carousel-slide",

    ["height", "height_slides_content", "slider"],
    ["background-color", "background_slides_style", "color"],
    ["padding", "padding_slides_style", "dimensions"],
    ["border-radius", "border_radius_slides_style", "dimensions"],

    "}",

    "altrp-carousel-slide:hover",

    ["background-color", "background_slides_style", "color", ":hover"],
    ["padding", "padding_slides_style", "dimensions", ":hover"],
    ["border-radius", "border_radius_slides_style", "dimensions", ":hover"],

    "}",

    "slick-list",

    ["width", "width_slides_content", "slider"],

    "}",

    "altrp-carousel-slide-img",

    ["background-size", "image_fit_additional_content"],

    "}",

    () => {
      const value = getResponsiveSetting(settings, "space_between_slides_style");
      const slider = sliderStyled(value);

      return `
      & .slick-slide { padding: 0 ${slider}; }
      & .altrp-carousel-dots { padding 0 ${slider}; }
      `
    },

    "altrp-carousel-arrow",

    ["padding", "padding_arrows_navigation_style", "dimensions"],
    ["border-radius", "border_radius_arrows_navigation_style", "dimensions"],
    ["background-color", "arrows_background_navigation_style", "color"],
    () => {
      const value = getResponsiveSetting(settings, "arrows_size_navigation_style");
      const slider = sliderStyled(value);

      return `svg {height: ${slider}; width: ${slider};}`
    },

    "& svg path",

    ["stroke", "arrows_color_navigation_style", "color"],

    "}",

    "}",


    () => {
      const value = getResponsiveSetting(settings, "horizontal_offset_arrows_navigation_style");
      const slider = sliderStyled(value);

      return `
      & .altrp-carousel-arrow-prev { left: ${slider}; }
      & .altrp-carousel-arrow-next { right: ${slider}; }
      `
    },

    () => {
      const value = getResponsiveSetting(settings, "vertical_no_center_offset_arrows_navigation_style");
      const slider = sliderStyled(value);
      return `
      & .altrp-carousel-arrow { top:${slider}; }
      `
    },

    "altrp-carousel-arrow:hover",

    ["background-color", "arrows_background_navigation_style", "color", ":hover"],
    ["padding", "padding_arrows_navigation_style", "dimensions", ":hover"],
    ["border-radius", "border_radius_arrows_navigation_style", "dimensions", ":hover"],

    "& svg path",

    ["stroke", "arrows_color_navigation_style", "color", ":hover"],

    "}",

    () => {
      const value = getResponsiveSetting(settings, "arrows_size_navigation_style", ":hover");
      const slider = sliderStyled(value);

      return `& svg { height: ${slider}; width: ${slider}; }`
    },

    "}",

    () => {
      const value = getResponsiveSetting(settings, "dots_size_navigation_style");
      const slider = sliderStyled(value);
      return `
      & .altrp-carousel-paging { width: ${slider}; height: ${slider}; }
      `
      // & .altrp-carousel-dots li { margin-left: calc(${slider} * 0.1); }
    },

    "altrp-carousel-paging",

    ["background-color", "background_color_dots_navigation_style", "color"],

    "}",

    "altrp-carousel-paging:hover",

    ["background-color", "background_color_dots_navigation_style", "color", ":hover"],

    "}",

    "altrp-carousel-dots .slick-active .altrp-carousel-paging",

    ["background-color", "background_color_active_dots_navigation_style", "color"],

    "}",

    "altrp-carousel-dots .slick-active .altrp-carousel-paging:hover",

    ["background-color", "background_color_active_dots_navigation_style", "color", ":hover"],

    "}",

    "altrp-carousel-dots",

    ["left", "horizontal_offset_dots_navigation_style", "slider"],
    () => {
      const value = getResponsiveSetting(settings, "vertical_no_center_offset_dots_navigation_style");
      const slider = sliderStyled(value);
      return `
      transform: translateY(${slider})
      `
    },

    "}",

    "altrp-carousel-slide-overlay",

    ["background-color", "background_color_overlay", "color"],


    "& .altrp-carousel-slide-overlay-text",

    ["color", "font_color_overlay", "color"],
    ["", "typographic_overlay", "typographic"],

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
