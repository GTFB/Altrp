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

    "altrp-gallery-img-container",

    ["border-style", "border_type"],
    ["border-width", "border_width", "dimensions"],
    ["border-color", "border_color", "color"],
    ["border-radius", "border_radius", "dimensions"],

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

    ".altrp-gallery-img-container:hover .altrp-gallery-overlay",

    ["align-items", "overlay_content_alignment", ":hover"],
    ["justify-content", "overlay_content_vertical", ":hover"],
    ["padding", "overlay_content_padding", "dimensions", ":hover"],

    "}",

    "altrp-gallery-overlay-title",

    ["color", "overlay_title_color", "color"],
    ["", "overlay_title_typographic", "typographic"],
    ["margin-bottom", "overlay_title_spacing", "slider"],

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

    ".altrp-gallery-img-container:hover .altrp-gallery-overlay-description",

    ["color", "overlay_description_color", "color", ":hover"],
    ["", "overlay_description_typographic", "typographic", ":hover"],

    "}",

    "altrp-gallery-grid",

    ["grid-gap", "spacing_grid_settings", "slider"],
    () => {
      const value = getResponsiveSetting(settings, "columns_grid_settings");
      return `grid-template-columns: repeat(${defaultStyled(value)}, 1fr);`
    },

    "}"
  ];

  return styledString(styles, settings)
}
