import styled from "styled-components";
import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";
import {defaultStyled, sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";

export default styled.div`
  ${({settings}) => {
  const styles = [
    
    "&",
      ["", "creative_link_controller", "creative-link"],
    "}",
    
    "altrp-heading-wrapper-sub-bottom .altrp-heading-sub",
      ["margin-top", "spacing_sub_heading", "slider"],
    "}",
    
    "altrp-heading-wrapper-sub-top .altrp-heading-sub",
      ["margin-bottom", "spacing_sub_heading", "slider"],
    "}",

    "altrp-heading-wrapper-sub-left .altrp-heading-sub",
    ["margin-right", "spacing_sub_heading", "slider"],
    "}",

    "altrp-heading-wrapper-sub-right .altrp-heading-sub",
    ["margin-left", "spacing_sub_heading", "slider"],
    "}",
    
    "altrp-heading.altrp-background-image",
      ["background-position", "background_position"],
      ["background-attachment", "background_attachment"],
      ["background-repeat", "background_repeat"],
      ["background-size", "background_image_width", "slider"],
    "}",
    
    "altrp-heading",
      ["justify-content", "heading_settings_alignment"],
      ["", "heading_style_typographic", "typographic"],
      ["z-index", "position_z_index"],

      () => {
        const value = getResponsiveSetting(settings, "style_background_opacity");
  
        if(value && value.size) {
          return `opacity: ${value.size};`
        } else {
          return ''
        }
      },

    () => {
      const value = getResponsiveSetting(settings, "transform_style");

      if(value && value.function && value.size) {
        return `transform: ${value.function}(${value.size}${value.unit});`
      } else {
        return ''
      }
    },
    
      ["color", "heading_style_color", "color"],
      ["", "heading_style_text_shadow", "text-shadow"],
      ["margin", "style_position_margin", "dimensions"],
      ["padding", "style_position_padding", "dimensions"],
      ["background-color", "style_background_color", "color"],
      ["", "gradient", "gradient"],
      ["", "background_image", "media"],
      ["border-style", "style_border_type"],
      ["border-width", "style_border_width", "dimensions"],
      ["border-color", "style_border_color", "color"],
      ["border-radius", "style_border_radius", "slider"],
    "}",
    
    "altrp-heading-wrapper",
      ["justify-content", "heading_settings_alignment"],
    "}",
    
    "altrp-heading-sub",
      ["width", "width_sub_heading", "slider"],
      ["justify-content", "sub_heading_settings_alignment"],
      ["", "typographic_sub_heading", "typographic"],
    
      ["background-color", "bg_sub_heading", "color"],
      ["color", "color_sub_heading", "color"],
      ["padding", "padding_sub_heading", "dimensions"],
      ["", "text_shadow_sub_heading", "text-shadow"],
    "}",
    
    "altrp-heading-advanced-wrapper",
      ["text-align", "alignment_advanced_heading_content"],
    "}",
    
    "altrp-animating-highlighted-svg svg path",
      ["stroke", "color_shape_animating", "color"],
      ["stroke-width", "width_shape_animating", "slider"],
    "}",
    
    "altrp-heading-no-animating-text",
      ["color", "text_color_headline_animating_style", "color"],
      ["", "text_headline_animating_style", "typographic"],
    "}",
    
    "altrp-animating-text",
      ["color", "animated_text_color_headline_animating_style", "color"],
      ["", "animated_text_headline_animating_style", "typographic"],
    "}",
    
    "altrp-heading-advanced",
      () => {
        const horizontalValue = getResponsiveSetting(settings, "horizontal_offset_advanced_heading_content");
        const horizontalSlider = sliderStyled(horizontalValue) || "0px";
        const verticalValue = getResponsiveSetting(settings, "vertical_offset_advanced_heading_content");
        const verticalSlider = sliderStyled(verticalValue) || "0px";
        const rotateValue = getResponsiveSetting(settings, "rotate_offset_advanced_heading_content");
        const rotateSlider = sliderStyled(rotateValue) || "0deg";
        return `transform: transform(${horizontalSlider}, ${verticalSlider}) rotate(${rotateSlider});`
      },

      () => {
        const value = getResponsiveSetting(settings, "opacity_advanced_heading_style");
  
        if(value && value.size) {
          return `opacity: ${value.size};`
        } else {
          return ''
        }
      },

      ["", "typography_advanced_heading_style", "typographic"],
      
      ["background-color", "background_color_advanced_heading_style", "color"],
      ["color", "color_advanced_heading_style", "color"],
      ["padding", "padding_advanced_heading_style", "dimensions"],
      ["", "text_shadow_advanced_heading_style", "text-shadow"],
      ["border-style", "border_type_advanced_heading_style"],
      ["border-width", "border_width_advanced_heading_style", "dimensions"],
      ["border-color", "border_color_advanced_heading_style", "color"],
      ["border-radius", "border_radius_advanced_heading_style", "dimensions"],
    "}",
    
    "altrp-heading-animating-tag",
      ["justify-content", "alignment_animating"],
    "}"
  ];
  return styledString(styles, settings)
}}
`;
