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
  ]


  return styledString(styles, settings)
}
