import {defaultStyled, sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";



export default styled.div`
  ${({settings}) => {
  const styles = [
    "&.altrp-dropbar-btn-containter",
      ["width", "width_dropbar_options", "slider"],

      ["padding", "padding_dropbar_content_style", "dimensions"],
      ["background-color", "background_dropbar_content_style", "color"],
      ["border-style", "border_style_dropbar_content_style"],
      ["border-width", "border_width_dropbar_content_style", "dimensions"],
      ["border-color", "border_color_dropbar_content_style", "color"],
      ["border-radius", "border_radius_dropbar_content_style", "dimensions"],
      ["box-shadow", "box_shadow_dropbar_content_style", "shadow"],
    "}",

    "altrp-dropbar-btn-content",
      ["color", "text_color_dropbar_content_style", "color"],
      ["", "typographic_text_dropbar_content_style", "typographic"],
    "}",

    "&:hover.altrp-dropbar-btn-containter",
      ["background-color", "background_dropbar_content_style", "color", ":hover"],
      ["border-style", "border_style_dropbar_content_style", "", ":hover"],
      ["border-width", "border_width_dropbar_content_style", "dimensions", ":hover"],
      ["border-color", "border_color_dropbar_content_style", "color", ":hover"],
      ["border-radius", "border_radius_dropbar_content_style", "dimensions", ":hover"],
      ["box-shadow", "box_shadow_dropbar_content_style", "shadow", ":hover"],
    "}",

    "&:hover .altrp-dropbar-btn-content",
      ["color", "text_color_dropbar_content_style", "color", ":hover"],
      ["", "typographic_text_dropbar_content_style", "typographic", ":hover"],
    "}"
  ];
  return styledString(styles, settings)
}}
`
