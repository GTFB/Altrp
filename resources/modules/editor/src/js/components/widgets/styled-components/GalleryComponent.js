import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";
import {defaultStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";

/**
 * @return {string}
 */

export default function GalleryComponent(settings) {
  const styles = [
    "altrp-gallery-img",

    () => {
      const value = getResponsiveSetting(settings, "aspect_ratio_grid_settings");
      let aspectRatio = "100%";

      switch (value) {
        case "3to2":
          aspectRatio = "66.6667%";
          break
        case "4to3":
          aspectRatio = "75%";
          break
        case "9to16":
          aspectRatio = "177.778%";
          break
        case "16to9":
          aspectRatio = "56.25%";
          break
        case "21to9":
          aspectRatio = "42.8571%";
          break
      }

      return `padding-bottom: ${aspectRatio}`
    },

    "}",

    //state disabled
    ".state-disabled .altrp-gallery-img",

    () => {
      const value = getResponsiveSetting(settings, "aspect_ratio_grid_settings", ".state-disabled");
      let aspectRatio = "100%";

      switch (value) {
        case "3to2":
          aspectRatio = "66.6667%";
          break
        case "4to3":
          aspectRatio = "75%";
          break
        case "9to16":
          aspectRatio = "177.778%";
          break
        case "16to9":
          aspectRatio = "56.25%";
          break
        case "21to9":
          aspectRatio = "42.8571%";
          break
      }

      return `padding-bottom: ${aspectRatio}`
    },

    "}",
    //state active
    ".active .altrp-gallery-img",

    () => {
      const value = getResponsiveSetting(settings, "aspect_ratio_grid_settings", ".active");
      let aspectRatio = "100%";

      switch (value) {
        case "3to2":
          aspectRatio = "66.6667%";
          break
        case "4to3":
          aspectRatio = "75%";
          break
        case "9to16":
          aspectRatio = "177.778%";
          break
        case "16to9":
          aspectRatio = "56.25%";
          break
        case "21to9":
          aspectRatio = "42.8571%";
          break
      }

      return `padding-bottom: ${aspectRatio}`
    },

    "}",

    "altrp-gallery-img-container",

    ["border-style", "border_type"],
    ["border-width", "border_width", "dimensions"],
    ["border-color", "border_color", "color"],
    ["border-radius", "border_radius", "dimensions"],

    "}",


    //state disabled
    ".state-disabled .altrp-gallery-img-container",

    ["border-style", "border_type", "", ".state-disabled"],
    ["border-width", "border_width", "dimensions", ".state-disabled"],
    ["border-color", "border_color", "color", ".state-disabled"],
    ["border-radius", "border_radius", "dimensions", ".state-disabled"],

    "}",

    //state active
    ".active .altrp-gallery-img-container",

    ["border-style", "border_type", "", ".active"],
    ["border-width", "border_width", "dimensions", ".active"],
    ["border-color", "border_color", "color", ".active"],
    ["border-radius", "border_radius", "dimensions", ".active"],

    "}",

    ".altrp-gallery-img-container:hover .altrp-gallery-img-container",

    ["border-style", "border_type", ":hover"],
    ["border-width", "border_width", "dimensions", ":hover"],
    ["border-color", "border_color", "color", ":hover"],
    ["border-radius", "border_radius", "dimensions", ":hover"],

    "}",

    "altrp-gallery-overlay-bg",

    ["background-color", "overlay_background_color", "color"],
    ["", "overlay_background_gradient", "gradient"],
    ["mix-blend-mode", "blend_mode"],

    "}",

    //state disabled
    ".state-disabled .altrp-gallery-overlay-bg",

    ["background-color", "overlay_background_color", "color", ".state-disabled"],
    ["", "overlay_background_gradient", "gradient", ".state-disabled"],
    ["mix-blend-mode", "blend_mode", "", ".state-disabled"],

    "}",

    //state active
    ".active .altrp-gallery-overlay-bg",

    ["background-color", "overlay_background_color", "color", ".active"],
    ["", "overlay_background_gradient", "gradient", ".active"],
    ["mix-blend-mode", "blend_mode", "", ".active"],

    "}",

    ".altrp-gallery-img-container:hover .altrp-gallery-overlay-bg",

    ["background-color", "overlay_background_color", "color", ":hover"],
    ["", "overlay_background_gradient", "gradient", ":hover"],
    ["mix-blend-mode", "blend_mode", ":hover"],

    "}",

    "altrp-gallery-overlay",

    ["align-items", "overlay_content_alignment"],
    ["justify-content", "overlay_content_vertical"],
    ["padding", "overlay_content_padding", "dimensions"],

    "}",

    //state disabled
    ".state-disabled .altrp-gallery-overlay",

    ["align-items", "overlay_content_alignment", "", ".state-disabled"],
    ["justify-content", "overlay_content_vertical", "", ".state-disabled"],
    ["padding", "overlay_content_padding", "dimensions", ".state-disabled"],

    "}",

    //state active
    ".active .altrp-gallery-overlay",

    ["align-items", "overlay_content_alignment", "", ".active"],
    ["justify-content", "overlay_content_vertical", "", ".active"],
    ["padding", "overlay_content_padding", "dimensions", ".active"],

    "}",

    ".altrp-gallery-img-container:hover .altrp-gallery-overlay",

    ["align-items", "overlay_content_alignment", ":hover"],
    ["justify-content", "overlay_content_vertical", ":hover"],

    "}",

    "altrp-gallery-overlay-title",

    ["color", "overlay_title_color", "color"],
    ["", "overlay_title_typographic", "typographic"],
    ["margin-bottom", "overlay_title_spacing", "slider"],

    "}",

    //state disabled
    ".state-disabled .altrp-gallery-overlay-title",

    ["color", "overlay_title_color", "color", ".state-disabled"],
    ["", "overlay_title_typographic", "typographic", ".state-disabled"],
    ["margin-bottom", "overlay_title_spacing", "slider", ".state-disabled"],

    "}",

    //state active
    ".active .altrp-gallery-overlay-title",

    ["color", "overlay_title_color", "color", ".active"],
    ["", "overlay_title_typographic", "typographic", ".active"],
    ["margin-bottom", "overlay_title_spacing", "slider", ".active"],

    "}",

    ".altrp-gallery-img-container:hover .altrp-gallery-overlay-title",

    ["color", "overlay_title_color", "color", ":hover"],
    ["", "overlay_title_typographic", "typographic", ":hover"],
    ["margin-bottom", "overlay_title_spacing", "slider", ":hover"],

    "}",

    "altrp-gallery-overlay-description",

    ["color", "overlay_description_color", "color"],
    ["", "overlay_description_typographic", "typographic"],

    "}",

    //state disabled
    ".state-disabled .altrp-gallery-overlay-description",

    ["color", "overlay_description_color", "color", ".state-disabled"],
    ["", "overlay_description_typographic", "typographic", ".state-disabled"],

    "}",

    //state active
    ".active .altrp-gallery-overlay-description",

    ["color", "overlay_description_color", "color", ".active"],
    ["", "overlay_description_typographic", "typographic", ".active"],

    "}",

    ".altrp-gallery-img-container:hover .altrp-gallery-overlay-description",

    ["color", "overlay_description_color", "color", ":hover"],
    ["", "overlay_description_typographic", "typographic", ":hover"],

    "}",

    "altrp-gallery-grid",

    ["grid-gap", "spacing_grid_settings", "slider"],
    () => {
      const value = getResponsiveSetting(settings, "columns_grid_settings");
      const def = defaultStyled(value);

      if(def) {
        return `grid-template-columns: repeat(${def}, 1fr);`
      }
    },

    "}",

    //state disabled
    ".state-disabled .altrp-gallery-grid",

    ["grid-gap", "spacing_grid_settings", "slider", ".state-disabled"],
    () => {
      const value = getResponsiveSetting(settings, "columns_grid_settings", '.state-disabled');
      const def = defaultStyled(value);

      if(def) {
        return `grid-template-columns: repeat(${def}, 1fr);`
      }
    },

    "}",
    //state active
    ".active .altrp-gallery-grid",

    ["grid-gap", "spacing_grid_settings", "slider", ".active"],
    () => {
      const value = getResponsiveSetting(settings, "columns_grid_settings", '.active');
      const def = defaultStyled(value);

      if(def) {
        return `grid-template-columns: repeat(${def}, 1fr);`
      }
    },

    "}",
  ];

  return styledString(styles, settings)
}
