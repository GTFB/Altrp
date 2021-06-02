import styled from "styled-components";
import {styledString} from "../../../../../front-app/src/js/helpers/styles";

export default styled.div`

  & .modal__body-save {
    cursor: pointer;
    display: block;
    border: 0;
    padding: 10px 15px;
    background-color: #6c757d;
    color: #fff;
  }
  
  & .modal__body-text label {
     color: #919191;
     display: flex;
     flex-direction: column;
     font-size: 0.9rem;
  }
  
  & .modal__body-color label {
     color: #919191;
     display: flex;
     flex-direction: column;
     font-size: 0.9rem;
  }
  
  ${({settings}) => {
  const styles = [
    "altrp-custom--typographic",
      ["", "styles_font_drawer", "typographic"],
      ["color", "styles_font_color_drawer", "color"],
    "}",
    
    `modal__body-save`,
      ["background-color", "background_color_btn", "color"],
      ["", "font_typographic_btn", "typographic"],
      ["color", "font_color_btn", "color"],
    "}",
    
    ".MuiSlider-root",
      ["color", "slider_range_color", "color"],
    "}",
    
    "modal__body-text label, .modal__body-color label",
      ["", "styles_font_drawer_label", "typographic"],
      ["color", "styles_font_color_drawer_label", "color"],
    "}",

    "altrp-custom--typographic:hover",
      ["", "styles_font_drawer", "typographic", ":hover"],
      ["color", "styles_font_color_drawer", "color", ":hover"],
    "}",

    `modal__body-save:hover`,
      ["background-color", "background_color_btn", "color", ":hover"],
      ["", "font_typographic_btn", "typographic", ":hover"],
      ["color", "font_color_btn", "color", ":hover"],
    "}",

    "modal__body-text label:hover, .modal__body-color:hover label",
      ["", "styles_font_drawer_label", "typographic", ":hover"],
      ["color", "styles_font_color_drawer_label", "color", ":hover"],
    "}",

    ".MuiSlider-root:hover",
      ["color", "slider_range_color", "color", ":hover"],
    "}",
  ];
  
  console.log(styledString(styles, settings))
  return styledString(styles, settings)
}}
`;
