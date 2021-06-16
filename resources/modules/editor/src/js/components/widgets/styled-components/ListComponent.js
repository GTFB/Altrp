import styled from "styled-components";
import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";
import {defaultStyled, sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";

export default function ListComponent(settings) {
  const styles = [
    "altrp-list",
    ["margin", "position_margin", "dimensions"],
    ["padding", "position_padding", "dimensions"],

    ["z-index", "position_z_index"],
    "}",

    "altrp-list-ul-inline, & .altrp-list-ul-default .altrp-list-li",
    ["justify-content", "alignment_list_style"],
    "}",

    "altrp-list-li-divider-default",
    ["border-top-style", "divider_style_list_style"],
    ["border-top-width", "divider_weight_list_style", "slider"],
    "}",

    "altrp-list-li-divider-inline",
    ["border-right-style", "divider_style_list_style"],
    ["border-right-width", "divider_weight_list_style", "slider"],
    "}",

    "altrp-list-li-divider",
    ["border-color", "divider_color_list_style", "color"],
    ["width", "divider_width_list_style", "slider"],
    "}",

    "altrp-list-icon, & .altrp-list-icon svg",
    ["width", "size_icon_style", "slider"],
    ["height", "size_icon_style", "slider"],
    "}",

    "altrp-list-icon path",
    ["fill", "fill_icon_style", "color"],
    "}",

    "altrp-list-icon",
    ["background-color", "background_icon_style", "color"],
    ["padding", "padding_icon_style", "dimensions"],
    ["border-radius", "border-radius_icon_style", "dimensions"],
    ["border-style", "border-type_icon_style"],
    ["border-width", "border-width_icon_style", "dimensions"],
    ["border-color", "border_color_icon_style", "color"],
    "}",

    "altrp-list-label",
    ["margin-left", "indent_text_style", "slider"],
    ["color", "color_text_style", "color"],
    ["background-color", "background_color_text_style", "color"],
    ["padding", "padding_text_style", "dimensions"],
    ["border-radius", "border-radius_text_style", "dimensions"],
    ["border-style", "border-type_text_style"],
    ["border-width", "border-width_text_style", "dimensions"],
    ["border-color", "border_color_text_style", "color"],
    ["", "typographic_text_style", "typographic"],
    "}",

    "altrp-list-li:hover",
    "altrp-list-icon, & .altrp-list-icon svg",
    ["width", "size_icon_style", "slider", ":hover"],
    ["height", "size_icon_style", "slider", ":hover"],
    "}",

    "altrp-list-icon path",
    ["fill", "fill_icon_style", "color", ":hover"],
    "}",

    "altrp-list-icon",
    ["background-color", "background_icon_style", "color", ":hover"],
    ["padding", "padding_icon_style", "dimensions", ":hover"],
    ["border-radius", "border-radius_icon_style", "dimensions", ":hover"],
    ["border-style", "border-type_icon_style", "", ":hover"],
    ["border-width", "border-width_icon_style", "dimensions", ":hover"],
    ["border-color", "border_color_icon_style", "color", ":hover"],
    "}",

    "altrp-list-label",
    ["margin-left", "indent_text_style", "slider", ":hover"],
    ["color", "color_text_style", "color", ":hover"],
    ["background-color", "background_color_text_style", "color", ":hover"],
    ["padding", "padding_text_style", "dimensions", ":hover"],
    ["border-radius", "border-radius_text_style", "dimensions", ":hover"],
    ["border-style", "border-type_text_style", "", ":hover"],
    ["border-width", "border-width_text_style", "dimensions", ":hover"],
    ["border-color", "border_color_text_style", "color", ":hover"],
    "}",

    "altrp-list-li-link",
    ["text-decoration", "link_decoration_text_style", "", ":hover"],
    "}",
    "}",

    "altrp-list-li-link",
    ["text-decoration", "link_decoration_text_style"],
    "}"
  ];

  return styledString(styles, settings)
}
