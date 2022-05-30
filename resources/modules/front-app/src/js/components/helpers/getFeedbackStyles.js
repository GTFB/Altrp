import {sliderStyled, styledString} from "../../helpers/styles";
import getResponsiveSetting from "../../helpers/get-responsive-setting";


export default function getFeedbackStyles(settings) {
  const styles = [
    "feedback__container",
    ["background-color", "background_color", "color"],
    ["padding", "padding__frame", "dimensions"],
    ["border-radius", "border_radius-frame", "dimensions"],
    "}",

    "feedback__container-сustom",
    ["position", "custom_position_settings", "dimensions"],
    ["background-color", "background_color", "color"],
    ["padding", "padding__frame", "dimensions"],
    ["border-radius", "border_radius-frame", "dimensions"],
    "}",

    "feedback__button",
    ["padding", "padding__btn-frame", "dimensions"],
    ["border-radius", "border_radius-btn-frame", "dimensions"],
    ["", "font_typographic-btn", "typographic"],
    ["color", "font_color-btn", "color"],
    ["background-color", "background_color-notPressed", "color"],
    "}",

    "feedback__button:hover",
    ["background-color", "background_color-notPressed", "color", ":hover"],
    "}",

    "feedback__button-active",
    ["padding", "padding__btn-frame", "dimensions"],
    ["border-radius", "border_radius-btn-frame", "dimensions"],
    ["", "font_typographic-btn", "typographic"],
    ["color", "font_color-btn", "color"],
    ["background-color", "background_color-pressed", "color"],
    "}",

    "feedback__button-active:hover",
    ["background-color", "background_color-pressed", "color", ":hover"],
    "}",

    "circle-fb",
    ["background-color", "background_color-circle", "color"],
    "}",

    "block__comment-bottom button",
    ["padding", "padding__messenger-btn", "dimensions"],
    ["border-radius", "border_radius-messenger-btn", "dimensions"],
    ["", "font_typographic-messenger-btn", "typographic"],
    ["color", "font_color-messenger-btn", "color"],
    ["background-color", "background_color-btn-messenger", "color"],
    "}",

    "block__comment-bottom button:hover",
    ["background-color", "background_color-btn-messenger", "color", ":hover"],
    "}",

    "block__comment",
    () => {
      const value = getResponsiveSetting(settings, "messenger__width");
      const slider = sliderStyled(value);

      if(slider) {
        return `width: ${slider};`
      }
    },
    ["padding", "padding__messenger", "dimensions"],
    ["border-radius", "border_radius-messenger", "dimensions"],
    ["background-color", "background_color-messenger", "color"],
    "}",

    //state disabled
    ".state-disabled",
    ["background-color", "background_color", "color", ".state-disabled"],
    ["padding", "padding__frame", "dimensions", ".state-disabled"],
    ["border-radius", "border_radius-frame", "dimensions", ".state-disabled"],
    "}",

    ".state-disabled",
    ["position", "custom_position_settings", "dimensions", ".state-disabled"],
    ["background-color", "background_color", "color", ".state-disabled"],
    ["padding", "padding__frame", "dimensions", ".state-disabled"],
    ["border-radius", "border_radius-frame", "dimensions", ".state-disabled"],
    "}",

    ".state-disabled",
    ["padding", "padding__btn-frame", "dimensions", ".state-disabled"],
    ["border-radius", "border_radius-btn-frame", "dimensions", ".state-disabled"],
    ["", "font_typographic-btn", "typographic", ".state-disabled"],
    ["color", "font_color-btn", "color", ".state-disabled"],
    ["background-color", "background_color-notPressed", "color", ".state-disabled"],
    "}",

    ".state-disabled .feedback__button-active",
    ["padding", "padding__btn-frame", "dimensions", ".state-disabled"],
    ["border-radius", "border_radius-btn-frame", "dimensions", ".state-disabled"],
    ["", "font_typographic-btn", "typographic", ".state-disabled"],
    ["color", "font_color-btn", "color", ".state-disabled"],
    ["background-color", "background_color-pressed", "color", ".state-disabled"],
    "}",

    ".state-disabled .circle-fb",
    ["background-color", "background_color-circle", "color", ".state-disabled"],
    "}",

    ".state-disabled .block__comment-bottom button",
    ["padding", "padding__messenger-btn", "dimensions", ".state-disabled"],
    ["border-radius", "border_radius-messenger-btn", "dimensions", ".state-disabled"],
    ["", "font_typographic-messenger-btn", "typographic", ".state-disabled"],
    ["color", "font_color-messenger-btn", "color", ".state-disabled"],
    ["background-color", "background_color-btn-messenger", "color", ".state-disabled"],
    "}",
    ".state-disabled .block__comment",
    () => {
      const value = getResponsiveSetting(settings, "messenger__width", ".state-disabled");
      const slider = sliderStyled(value);

      if(slider) {
        return `width: ${slider};`
      }
    },
    ["padding", "padding__messenger", "dimensions", ".state-disabled"],
    ["border-radius", "border_radius-messenger", "dimensions", ".state-disabled"],
    ["background-color", "background_color-messenger", "color", ".state-disabled"],
    "}",

    //state active
    ".active",
    ["background-color", "background_color", "color", ".active"],
    ["padding", "padding__frame", "dimensions", ".active"],
    ["border-radius", "border_radius-frame", "dimensions", ".active"],
    "}",

    ".active .feedback__container-сustom",
    ["position", "custom_position_settings", "dimensions", ".active"],
    ["background-color", "background_color", "color", ".active"],
    ["padding", "padding__frame", "dimensions", ".active"],
    ["border-radius", "border_radius-frame", "dimensions", ".active"],
    "}",

    ".active .feedback__button",
    ["padding", "padding__btn-frame", "dimensions", ".active"],
    ["border-radius", "border_radius-btn-frame", "dimensions", ".active"],
    ["", "font_typographic-btn", "typographic", ".active"],
    ["color", "font_color-btn", "color", ".active"],
    ["background-color", "background_color-notPressed", "color", ".active"],
    "}",

    ".active .feedback__button-active",
    ["padding", "padding__btn-frame", "dimensions", ".active"],
    ["border-radius", "border_radius-btn-frame", "dimensions", ".active"],
    ["", "font_typographic-btn", "typographic", ".active"],
    ["color", "font_color-btn", "color", ".active"],
    ["background-color", "background_color-pressed", "color", ".active"],
    "}",

    ".active .circle-fb",
    ["background-color", "background_color-circle", "color", ".active"],
    "}",

    ".active .block__comment-bottom button",
    ["padding", "padding__messenger-btn", "dimensions", ".active"],
    ["border-radius", "border_radius-messenger-btn", "dimensions", ".active"],
    ["", "font_typographic-messenger-btn", "typographic", ".active"],
    ["color", "font_color-messenger-btn", "color", ".active"],
    ["background-color", "background_color-btn-messenger", "color", ".active"],
    "}",

    ".active .block__comment",
    () => {
      const value = getResponsiveSetting(settings, "messenger__width", ".state-disabled");
      const slider = sliderStyled(value);

      if(slider) {
        return `width: ${slider};`
      }
    },
    ["padding", "padding__messenger", "dimensions", ".active"],
    ["border-radius", "border_radius-messenger", "dimensions", ".active"],
    ["background-color", "background_color-messenger", "color", ".active"],
    "}",
  ]


  return styledString(styles, settings)
}
