import styled from "styled-components";
import { getResponsiveSetting } from "../../../../../front-app/src/js/helpers";
import { styledString } from "../../../../../front-app/src/js/helpers/styles";

export default styled.div`

  ${({settings}) => {
    
  const styles = [
    "altrp-dashboard__drawer--font",
      ["", "style_font_drawer_typographic", "typographic"],
      ["color", "style_font_color_typographic", "color"],
      ["background-color", "style_background_color_typographic", "color", "", true],
    "}",
    
    "altrp-dashboard__drawer--label-font-size",
      ["color", "style_font_color_typographic", "color"],
    "}",
    
    "altrp-dashboard__drawer--select",
      ["color", "style_font_color_typographic", "color"],
    "}",
    
    "altrp-dashboard__drawer--font-input",
      ["", "style_font_drawer_typographic_input", "typographic"],
    "}",
    
    "altrp-dashboard__drawer--section-font-size",
      ["font-size", "style_font_size_drawer_section", "slider"],
    "}",
    
    "altrp-dashboard__drawer--label-font-size",
      ["font-size", "style_font_size_drawer_label", "slider"],
    "}",
    
    "altrp-dashboard__drawer--font-margin",
      ["margin", "style_margin_subheading", "dimensions"],
    "}",

    "altrp-dashboard__checkboxcolor.MuiCheckbox-colorSecondary.Mui-checked",
      ["color", "checkbox_color", "color"],
    "}",

    "altrp-dashboard__checkboxcolor.MuiCheckbox-colorSecondary.Mui-checked:hover",
      ["color", "checkbox_color", "color", ":hover"],
    "}",
    
    "altrp-dashboard__drawer--range-drawer-color.MuiSlider-root",
      ["color", "slider_range_color", "color"],
    "}",

    "altrp-dashboard__drawer--range-drawer-color.MuiSlider-root:hover",
      ["color", "slider_range_color", "color", ":hover"],
    "}",
    
    "altrp-btn-draw",
      ["background-color", "background_color_btn", "color"],
    "}",

    "altrp-btn-draw:hover",
      ["background-color", "background_color_btn", "color", ":hover"],
    "}",
    
    "altrp-btn-draw",
      ["", "font_typographic_btn", "typographic"],
      ["color", "font_color_btn", "color"],
    "}",

    "altrp-btn-draw:hover",
      ["color", "font_color_btn", "color", ":hover"],
    "}",
    
    "altrp-dashboard__drawer--select",
      ["border-style", "border_type_select"],
      ["border-width", "border_width_select", "dimensions"],
      ["border-color", "border_color_select", "color"],
    "}",

    "altrp-dashboard__drawer--select:hover",
      ["border-style", "border_type_select", "", ":hover"],
      ["border-width", "border_width_select", "dimensions", ":hover"],
      ["border-color", "border_color_select", "color", ":hover"],
    "}",
  ];
  return styledString(styles, settings)
}}
  
  & .altrp-dashboard__checkboxcolor.MuiCheckbox-colorSecondary.Mui-checked {
    background-color: transparent !important;
  } 
`;
