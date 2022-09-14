import {getResponsiveSetting} from"../../../../../../front-app/src/js/helpers";
import {defaultStyled, sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";

/**
 * @return {string}
 */

export default function DividerComponent(settings) {
  const styles = [
    "altrp-divider-separator",
      ["width", "divider_width", "slider"],
      ['border-style', 'divider_style_type'],
      () => {
        const borderWidthValue = getResponsiveSetting(settings, "divider_style_weight", null)?.size;
        const borderWidth = borderWidthValue ? borderWidthValue + "px" : "";
        return `
          border-top-width: ${borderWidth};
        `
      },
    "}",

    'altrp-divider',
      ['justify-content', 'divider_alignment'],
    '}',

    "&",
      ["align-items", "divider_alignment"],
    "}",

    "altrp-divider",
      ["margin", "position_margin", "dimensions"],
      ["z-index", "position_z_index"],
      () => {
        const value = getResponsiveSetting(settings, "divider_style_gap");
        const slider = sliderStyled(value);

        if(slider) {
          return ` padding-top: ${slider}; padding-bottom: ${slider}; `
        }
      },
    () => {
      const value = getResponsiveSetting(settings, "position_opacity");

      if (value && value?.size) {
        return `opacity: ${value.size};`
      } else {
        return ''
      }
    },
    "}",

    "altrp-divider-label",
      ["color", "text_style_color", "color"],
      ["", "text_style_typographic", "typographic"],
    "}",

    "altrp-divider:hover",
      "altrp-divider-label",
        ["color", "text_style_color", "color", ':hover'],
        ["", "text_style_typographic", "typographic", ':hover'],
      "}",
    "}",

    "altrp-divider .altrp-divider-separator",
      ["border-color", "divider_style_color", "color"],
    "}",

    "altrp-divider:hover",
      'altrp-divider-separator',
        ["border-color", "divider_style_color", "color", ':hover'],
      '}',
    "}",

    "altrp-divider.active",
      ["margin", "position_margin", "dimensions", ".active"],
      () => {
        const value = getResponsiveSetting(settings, "divider_style_gap", ".active");
        const slider = sliderStyled(value);

        if(slider) {
          return ` padding-top: ${slider}; padding-bottom: ${slider}; `
        }
      },

      "& .altrp-divider-label",
        ["color", "text_style_color", "color", ".active"],
      "}",
    "}",

    "altrp-divider.active .altrp-divider-separator",
      ["border-color", "divider_style_color", "color", ".active"],
    "}",

    'altrp-divider-image',
      () => {
        const imageSize = getResponsiveSetting(settings, 'image_size')

        if (imageSize?.size) {
          return `height: ${imageSize?.size}${imageSize?.unit || 'px'}`
        }
      },
    '}',

    'altrp-divider-container-label',
      () => {
        const textStylePosition = getResponsiveSetting(settings, 'label_position')
        const textStyleSpacing = getResponsiveSetting(settings, 'label_spacing')

        const spacing = (textStyleSpacing?.size ? textStyleSpacing?.size : 0) + (textStyleSpacing?.unit || 'px')

        switch (textStylePosition) {
          case "left":
            return `margin-right: ${spacing};`
          case "center":
            return `margin-right: ${spacing}; margin-left: ${spacing};`
          case "right":
            return `margin-left: ${spacing};`
        }
      },
    '}',

    "altrp-divider:hover",
      'altrp-divider-container-label',
        () => {
          const textStylePosition = getResponsiveSetting(settings, 'label_position') || 'center'
          const textStyleSpacing = getResponsiveSetting(settings, 'label_spacing', ':hover')

          if (!textStyleSpacing?.size) {
            return
          }

          const spacing = (textStyleSpacing?.size ? textStyleSpacing?.size : 0) + (textStyleSpacing?.unit || 'px')

          switch (textStylePosition) {
            case "left":
              return `margin-right: ${spacing};`
            case "center":
              return `margin-right: ${spacing}; margin-left: ${spacing};`
            case "right":
              return `margin-left: ${spacing};`
          }
        },
      '}',
    '}',

    'altrp-divider-image *',
      ['fill', 'image_fill', 'color'],
    '}',

    "altrp-divider:hover",
      'altrp-divider-image *',
        ['fill', 'image_fill', 'color', ':hover'],
      '}',

      'altrp-divider-separator',
        ['border-style', 'divider_style_type', ':hover'],
        () => {
          const borderWidth = getResponsiveSetting(settings, "divider_style_weight", ':hover')

          if (!borderWidth?.size) {
            return ''
          }

          return `border-top-width: ${borderWidth?.size}px;`
        },
      '}',
    '}',
  ];

  return styledString(styles, settings)
}
