import {
  colorPropertyStyled,
  gradientStyled,
  styledString,
} from "../../helpers/styles";
import getResponsiveSetting from "../../functions/getResponsiveSetting";

/**
 *
 * @param {{}} settings
 */
export default function getInputSelectStyles(settings) {
  let styles = [
    //<editor-fold description="стили лэйбла">
    ".altrp-field-label-container",
    ["background-color", "label_background_color", "color"],
    ["padding", "label_padding", "dimensions"],
    ["color", "label_style_font_color", "color"],
    ["top", "label_position_top", "slider"],
    ["left", "label_position_left", "slider"],
    ["width", "label_width", "slider"],
    "}",
    ".altrp-field-label",
    ["", "label_style_font_typographic", "typographic"],
    "}",
    ".altrp-label-icon",
    ["padding", "icon_padding", "dimensions"],
    // ['width', 'icon_size', 'slider'],
    // ['height', 'icon_size', 'slider'],
    "}",

    ".altrp-label-icon svg",
    ["width", "icon_size", "slider"],
    ["height", "icon_size", "slider"],
    ["background-color", "icon_color_background", "color"],
    ["fill", "icon_color", "color"],
    ["stroke", "icon_color", "color"],
    "}",
    ".altrp-label-icon svg path",
    ["fill", "icon_color", "color"],
    ["stroke", "icon_color", "color"],
    "}",
    ".altrp-label-icon img",
    ["width", "icon_size", "slider"],
    ["height", "icon_size", "slider"],
    ["background-color", "icon_color_background", "color"],
    "}",
    //</editor-fold>
    ".altrp-field-label--required::after",
    ["", "required_style_font_typographic", "typographic"],
    ["color", "required_style_font_color", "color"],
    "}",
    ".mask-mismatch-message",
    ["margin", "mismatch_message_margin", "dimensions"],
    ["padding", "mismatch_message_padding", "dimensions"],
    ["color", "mismatch_message_font_color", "color"],
    ["", "mismatch_message_typographic", "typographic"],
    "}",
    //<editor-fold description="стили иконок">
    ".bp3-icon_text-widget.bp3-icon_text-widget.bp3-icon_text-widget",
    ["margin", "input_icons_margin", "dimensions"],
    ["padding", "input_icons_padding", "dimensions"],
    ["border-radius", "input_icons_radius", "dimensions"],
    "}",
    ".bp3-icon_text-widget",
    ["background-color", "input_icons_background", "color"],
    "}",
    ".bp3-icon_text-widget:hover",
    ["background-color", "input_icons_background", "color", ":hover"],
    "}",
    ".bp3-icon_text-widget:active",
    ["background-color", "input_icons_background", "color", ".active"],
    "}",
    ".bp3-icon_text-widget svg",
    ["width", "input_icons_size", "slider"],
    ["height", "input_icons_size", "slider"],
    "}",
    ".bp3-icon_text-widget svg,& .bp3-icon_text-widget path",
    ["fill", "input_icons_fill", "color"],
    ["stroke", "input_icons_stroke", "color"],
    "}",
    ".bp3-icon_text-widget:hover svg,& .bp3-icon_text-widget:hover path",
    ["fill", "input_icons_fill", "color", ":hover"],
    ["stroke", "input_icons_stroke", "color", ":hover"],
    "}",
    ".bp3-icon_text-widget:active svg,& .bp3-icon_text-widget:active path",
    ["fill", "input_icons_fill", "color", ".active"],
    ["stroke", "input_icons_stroke", "color", ".active"],
    "}",
    ".bp3-icon_text-widget img",
    ["width", "input_icons_size", "slider"],
    ["height", "input_icons_size", "slider"],
    "}",
    //</editor-fold>
    //<editor-fold description="стили кнопки">
    () => {
      const alignment = getResponsiveSetting(settings, "alignment");
      switch (alignment) {
        case "flex-start": {
          return "& .bp3-popover-target.bp3-popover-target{flex-grow:0}";
        }
        case "flex-end": {
          return "& .bp3-popover-target.bp3-popover-target{flex-grow:0}& .bp3-popover-wrapper{justify-content:flex-end;}";
        }
        case "center": {
          return "& .bp3-popover-target.bp3-popover-target{flex-grow:0}& .bp3-popover-wrapper{justify-content:center;}";
        }
      }
    },

    ".bp3-popover-target",
    ["width", "field_width", "slider"],
    ["margin", "position_margin", "dimensions"],
    "}",
    ".bp3-button.bp3-button",
    ["width", "field_width", "slider"],
    ["height", "field_height", "slider"],
    ["text-align", "placeholder_and_value_alignment_position_section"],
    ["padding", "position_padding", "dimensions"],
    ["", "field_font_typographic", "typographic"],
    ["color", "field_font_color", "color"],
    ["opacity", "background_section_opacity", "slider"],
    ["border-style", "border_type"],
    ["border-width", "border_width", "dimensions"],
    ["border-color", "border_color", "color"],
    ["border-radius", "border_radius", "dimensions"],
    ["", "box_shadow", "shadow"],
    "}",
    () => {
      let styles = ".bp3-button.bp3-button{";
      let button_gradient = getResponsiveSetting(settings, "button_gradient");

      if (button_gradient?.isWithGradient) {
        styles += gradientStyled(button_gradient);
      } else {
        styles += colorPropertyStyled(
          getResponsiveSetting(settings, "button_background_color"),
          "background-color"
        );
        styles += "background-blend-mode: color-burn;";
      }

      styles += "}";
      styles += ".bp3-button:hover{";
      button_gradient = getResponsiveSetting(
        settings,
        "button_gradient",
        ":hover"
      );

      if (button_gradient?.isWithGradient) {
        styles += gradientStyled(button_gradient);
      } else {
        styles += colorPropertyStyled(
          getResponsiveSetting(settings, "button_background_color", ":hover"),
          "background-color"
        );
        styles += "background-blend-mode: color-burn;";
      }

      styles += "}";
      styles += ".bp3-button.bp3-button:active{";
      button_gradient = getResponsiveSetting(
        settings,
        "button_gradient",
        ".active"
      );

      if (button_gradient?.isWithGradient) {
        styles += gradientStyled(button_gradient);
      } else {
        styles += colorPropertyStyled(
          getResponsiveSetting(settings, "button_background_color", ".active"),
          "background-color",
          "!important"
        );
        styles += "background-blend-mode: color-burn;";
      }
      styles += "}";
      return styles;
    },
    ".bp3-button.bp3-button:hover",
    ["", "field_font_typographic", "typographic", ":hover"],
    ["color", "field_font_color", "color", ":hover"],
    ["border-color", "border_color", "color", ":hover"],
    ["border-radius", "border_radius", "dimensions", ":hover"],
    ".bp3-icon svg",
    ["height", "i_size", "slider", ":hover"],
    ["width", "i_size", "slider", ":hover"],
    ["margin", "i_margin", "dimensions", ":hover"],
    "}",
    ".bp3-icon path",
    ["fill", "i_color", "color", ":hover"],
    "}",
    ".bp3-icon img",
    ["height", "i_size", "slider", ":hover"],
    ["width", "i_size", "slider", ":hover"],
    ["margin", "i_margin", "dimensions", ":hover"],
    "}",
    ["", "box_shadow", "shadow", ":hover"],
    "}",
    ".bp3-button.bp3-button:active",
    ["", "field_font_typographic", "typographic", ".active"],
    ["color", "field_font_color", "color", ".active"],
    ["border-color", "border_color", "color", ".active"],
    ["border-radius", "border_radius", "dimensions", ".active"],
    ["", "box_shadow", "shadow", ".active"],

    ".bp3-icon svg",
    ["height", "i_size", "slider", ".active"],
    ["width", "i_size", "slider", ".active"],
    ["margin", "i_margin", "dimensions", ".active"],
    "}",
    ".bp3-icon path",
    ["fill", "i_color", "color", ".active"],
    "}",
    ".bp3-icon img",
    ["height", "i_size", "slider", ".active"],
    ["width", "i_size", "slider", ".active"],
    ["margin", "i_margin", "dimensions", ".active"],
    "}",
    "}",
    //</editor-fold>
    //<editor-fold description="стили иконок">
    ".bp3-icon svg",
    ["height", "i_size", "slider"],
    ["width", "i_size", "slider"],
    ["margin", "i_margin", "dimensions"],
    "}",
    ".bp3-icon path",
    ["fill", "i_color", "color"],
    "}",
    ".bp3-icon img",
    ["height", "i_size", "slider"],
    ["width", "i_size", "slider"],
    ["margin", "i_margin", "dimensions"],
    "}",
    //</editor-fold>
    //inputSelect .state-disabled
    ".state-disabled .altrp-field-label-container",
    ["background-color", "label_background_color", "color", ".state-disabled"],
    ["padding", "label_padding", "dimensions", ".state-disabled"],
    ["color", "label_style_font_color", "color", ".state-disabled"],
    ["top", "label_position_top", "slider", ".state-disabled"],
    ["left", "label_position_left", "slider", ".state-disabled"],
    ["width", "label_width", "slider", ".state-disabled"],
    "}",
    ".state-disabled .altrp-field-label",
    ["", "label_style_font_typographic", "typographic", ".state-disabled"],
    "}",
    ".state-disabled .altrp-label-icon.altrp-label-icon",
    ["padding", "icon_padding", "dimensions", ".state-disabled"],
    "}",

    ".state-disabled .altrp-label-icon.altrp-label-icon svg",
    ["width", "icon_size", "slider", ".state-disabled"],
    ["height", "icon_size", "slider", ".state-disabled"],
    ["background-color", "icon_color_background", "color", ".state-disabled"],
    ["fill", "icon_color", "color", ".state-disabled"],
    ["stroke", "icon_color", "color", ".state-disabled"],
    "}",
    ".state-disabled .altrp-label-icon.altrp-label-icon svg path",
    ["fill", "icon_color", "color", ".state-disabled"],
    ["stroke", "icon_color", "color", ".state-disabled"],
    "}",
    ".state-disabled .altrp-label-icon.altrp-label-icon img",
    ["width", "icon_size", "slider", ".state-disabled"],
    ["height", "icon_size", "slider", ".state-disabled"],
    ["background-color", "icon_color_background", "color", ".state-disabled"],
    "}",
    //</editor-fold>
    ".state-disabled .mask-mismatch-message.mask-mismatch-message",
    ["margin", "mismatch_message_margin", "dimensions", ".state-disabled"],
    ["padding", "mismatch_message_padding", "dimensions", ".state-disabled"],
    ["color", "mismatch_message_font_color", "color", ".state-disabled"],
    ["", "mismatch_message_typographic", "typographic", ".state-disabled"],
    "}",
    //<editor-fold description="стили иконок">
    ".state-disabled .bp3-icon_text-widget.bp3-icon_text-widget",
    ["margin", "input_icons_margin", "dimensions", ".state-disabled"],
    ["padding", "input_icons_padding", "dimensions", ".state-disabled"],
    ["border-radius", "input_icons_radius", "dimensions", ".state-disabled"],
    "}",
    ".state-disabled .bp3-icon_text-widget.bp3-icon_text-widget",
    ["background-color", "input_icons_background", "color", ".state-disabled"],
    "}",
    ".state-disabled .bp3-icon_text-widget.bp3-icon_text-widget svg",
    ["width", "input_icons_size", "slider", ".state-disabled"],
    ["height", "input_icons_size", "slider", ".state-disabled"],
    "}",
    ".state-disabled .bp3-icon_text-widget.bp3-icon_text-widget svg,& .bp3-icon_text-widget.bp3-icon_text-widget path",
    ["fill", "input_icons_fill", "color", ".state-disabled"],
    ["stroke", "input_icons_stroke", "color", ".state-disabled"],
    "}",
    ".state-disabled .bp3-icon_text-widget.bp3-icon_text-widget img",
    ["width", "input_icons_size", "slider", ".state-disabled"],
    ["height", "input_icons_size", "slider", ".state-disabled"],
    "}",
    //</editor-fold>
    //<editor-fold description="стили кнопки">
    () => {
      const alignment = getResponsiveSetting(
        settings,
        "alignment",
        ".state-disabled"
      );
      switch (alignment) {
        case "flex-start": {
          return "& .state-disabled .bp3-popover-target.bp3-popover-target{flex-grow:0}";
        }
        case "flex-end": {
          return "& .state-disabled .bp3-popover-target.bp3-popover-target{flex-grow:0}& .bp3-popover-wrapper{justify-content:flex-end;}";
        }
        case "center": {
          return "& .state-disabled .bp3-popover-target.bp3-popover-target{flex-grow:0}& .bp3-popover-wrapper{justify-content:center;}";
        }
      }
    },
    ".state-disabled .bp3-popover-target.bp3-popover-target.bp3-popover-target",
    ["width", "field_width", "slider", ".state-disabled"],
    ["margin", "position_margin", "dimensions", ".state-disabled"],
    "}",
    ".state-disabled .bp3-button.bp3-button.bp3-button",
    ["height", "field_height", "slider", ".state-disabled"],
    [
      "text-align",
      "placeholder_and_value_alignment_position_section",
      "",
      ".state-disabled",
    ],
    ["padding", "position_padding", "dimensions", ".state-disabled"],
    ["", "field_font_typographic", "typographic", ".state-disabled"],
    ["color", "field_font_color", "color", ".state-disabled"],
    ["opacity", "background_section_opacity", "slider", ".state-disabled"],
    ["border-style", "border_type", "", ".state-disabled"],
    ["border-width", "border_width", "dimensions", ".state-disabled"],
    ["border-color", "border_color", "color", ".state-disabled"],
    ["border-radius", "border_radius", "dimensions", ".state-disabled"],
    ["", "box_shadow", "shadow", ".state-disabled"],
    "}",
    () => {
      let styles = ".state-disabled .bp3-button.bp3-button.bp3-button{";
      let button_gradient = getResponsiveSetting(
        settings,
        "button_gradient",
        ".state-disabled"
      );

      if (button_gradient?.isWithGradient) {
        styles += gradientStyled(button_gradient);
      } else {
        styles += colorPropertyStyled(
          getResponsiveSetting(
            settings,
            "button_background_color",
            ".state-disabled"
          ),
          "background-color"
        );
        styles += "background-blend-mode: color-burn;";
      }

      styles += "}";
      return styles;
    },

    "}",

    //</editor-fold>
    //<editor-fold description="стили иконок">
    ".state-disabled .bp3-icon.bp3-icon svg",
    ["height", "i_size", "slider", ".state-disabled"],
    ["width", "i_size", "slider", ".state-disabled"],
    ["margin", "i_margin", "dimensions", ".state-disabled"],
    "}",
    ".state-disabled .bp3-icon.bp3-icon path",
    ["fill", "i_color", "color", ".state-disabled"],
    "}",
    ".state-disabled .bp3-icon.bp3-icon img",
    ["height", "i_size", "slider", ".state-disabled"],
    ["width", "i_size", "slider", ".state-disabled"],
    ["margin", "i_margin", "dimensions", ".state-disabled"],
    "}",

    //.active
    //</editor-fold>
    //inputSelect .state active
    ".active .altrp-field-label-container",
    ["background-color", "label_background_color", "color", ".active"],
    ["padding", "label_padding", "dimensions", ".active"],
    ["color", "label_style_font_color", "color", ".active"],
    ["top", "label_position_top", "slider", ".active"],
    ["left", "label_position_left", "slider", ".active"],
    ["width", "label_width", "slider", ".active"],
    "}",
    ".active .altrp-field-label",
    ["", "label_style_font_typographic", "typographic", ".active"],
    "}",
    ".active .altrp-label-icon.altrp-label-icon",
    ["padding", "icon_padding", "dimensions", ".active"],
    "}",

    ".active .altrp-label-icon.altrp-label-icon svg",
    ["width", "icon_size", "slider", ".active"],
    ["height", "icon_size", "slider", ".active"],
    ["background-color", "icon_color_background", "color", ".active"],
    ["fill", "icon_color", "color", ".active"],
    ["stroke", "icon_color", "color", ".active"],
    "}",
    ".active .altrp-label-icon.altrp-label-icon svg path",
    ["fill", "icon_color", "color", ".active"],
    ["stroke", "icon_color", "color", ".active"],
    "}",
    ".active .altrp-label-icon.altrp-label-icon img",
    ["width", "icon_size", "slider", ".active"],
    ["height", "icon_size", "slider", ".active"],
    ["background-color", "icon_color_background", "color", ".active"],
    "}",
    //</editor-fold>
    ".active .mask-mismatch-message.mask-mismatch-message",
    ["margin", "mismatch_message_margin", "dimensions", ".active"],
    ["padding", "mismatch_message_padding", "dimensions", ".active"],
    ["color", "mismatch_message_font_color", "color", ".active"],
    ["", "mismatch_message_typographic", "typographic", ".active"],
    "}",
    //<editor-fold description="стили иконок">
    ".active .bp3-icon_text-widget.bp3-icon_text-widget",
    ["margin", "input_icons_margin", "dimensions", ".active"],
    ["padding", "input_icons_padding", "dimensions", ".active"],
    ["border-radius", "input_icons_radius", "dimensions", ".active"],
    "}",
    ".active .bp3-icon_text-widget.bp3-icon_text-widget",
    ["background-color", "input_icons_background", "color", ".active"],
    "}",
    ".active .bp3-icon_text-widget.bp3-icon_text-widget svg",
    ["width", "input_icons_size", "slider", ".active"],
    ["height", "input_icons_size", "slider", ".active"],
    "}",
    ".active .bp3-icon_text-widget.bp3-icon_text-widget svg,& .bp3-icon_text-widget.bp3-icon_text-widget path",
    ["fill", "input_icons_fill", "color", ".active"],
    ["stroke", "input_icons_stroke", "color", ".active"],
    "}",
    ".active .bp3-icon_text-widget.bp3-icon_text-widget img",
    ["width", "input_icons_size", "slider", ".active"],
    ["height", "input_icons_size", "slider", ".active"],
    "}",
    //</editor-fold>
    //<editor-fold description="стили кнопки">
    () => {
      const alignment = getResponsiveSetting(settings, "alignment", ".active");
      switch (alignment) {
        case "flex-start": {
          return "& .active .bp3-popover-target.bp3-popover-target{flex-grow:0}";
        }
        case "flex-end": {
          return "& .active .bp3-popover-target.bp3-popover-target{flex-grow:0}& .bp3-popover-wrapper{justify-content:flex-end;}";
        }
        case "center": {
          return "& .active .bp3-popover-target.bp3-popover-target{flex-grow:0}& .bp3-popover-wrapper{justify-content:center;}";
        }
      }
    },
    ".active .bp3-popover-target.bp3-popover-target.bp3-popover-target",
    ["width", "field_width", "slider", ".active"],
    ["margin", "position_margin", "dimensions", ".active"],
    "}",
    ".active .bp3-button.bp3-button.bp3-button",
    ["height", "field_height", "slider", ".active"],
    [
      "text-align",
      "placeholder_and_value_alignment_position_section",
      "",
      ".active",
    ],
    ["padding", "position_padding", "dimensions", ".active"],
    ["", "field_font_typographic", "typographic", ".active"],
    ["color", "field_font_color", "color", ".active"],
    ["opacity", "background_section_opacity", "slider", ".active"],
    ["border-style", "border_type", "", ".active"],
    ["border-width", "border_width", "dimensions", ".active"],
    ["border-color", "border_color", "color", ".active"],
    ["border-radius", "border_radius", "dimensions", ".active"],
    ["", "box_shadow", "shadow", ".active"],
    "}",
    () => {
      let styles = ".active .bp3-button.bp3-button.bp3-button{";
      let button_gradient = getResponsiveSetting(
        settings,
        "button_gradient",
        ".active"
      );

      if (button_gradient?.isWithGradient) {
        styles += gradientStyled(button_gradient);
      } else {
        styles += colorPropertyStyled(
          getResponsiveSetting(settings, "button_background_color", ".active"),
          "background-color"
        );
        styles += "background-blend-mode: color-burn;";
      }

      styles += "}";
      return styles;
    },

    "}",

    //</editor-fold>
    //<editor-fold description="стили иконок">
    ".active .bp3-icon.bp3-icon svg",
    ["height", "i_size", "slider", ".active"],
    ["width", "i_size", "slider", ".active"],
    ["margin", "i_margin", "dimensions", ".active"],
    "}",
    ".active .bp3-icon.bp3-icon path",
    ["fill", "i_color", "color", ".active"],
    "}",
    ".active .bp3-icon.bp3-icon img",
    ["height", "i_size", "slider", ".active"],
    ["width", "i_size", "slider", ".active"],
    ["margin", "i_margin", "dimensions", ".active"],
    "}",
    //</editor-fold>
  ];
  return styledString(styles, settings);
}

export function getInputSelectPopoverStyles(settings, elementId) {
  let styles = [
    //<editor-fold description="стили поповера">
    `.altrp-portal${elementId}`,
    ".bp3-menu-item",
    ["background-color", "background_style_background_color", "color"],
    ["color", "items_font_color", "color"],
    ["", "field_font_typographic", "typographic"],
    ["padding", "item_padding", "dimensions"],
    "}",
    ".bp3-popover-content",
    () =>
      `background-color: ${
        getResponsiveSetting(settings, "drop_menu_background_color")?.color
      } !important;`,
    "}",
    ".bp3-menu",
    ["padding", "menu_padding", "dimensions"],
    ["background-color", "drop_menu_background_color", "color"],
    "}",
    ".bp3-menu-item:hover",
    ["color", "items_font_color", "color", ":hover"],
    [
      "background-color",
      "background_style_background_color",
      "color",
      ":hover",
    ],
    ["", "field_font_typographic", "typographic", ":hover"],
    "}",
    ".bp3-menu-item.bp3-active.bp3-active",
    ["color", "items_font_color", "color", ".active"],
    [
      "background-color",
      "background_style_background_color",
      "color",
      ".active",
    ],
    ["", "field_font_typographic", "typographic", ".active"],
    "}",
    ".bp3-input",
    ["", "field_font_typographic", "typographic"],
    ["height", "si_size", "slider"],
    ["padding", "si_padding", "dimensions"],
    ["color", "si_color", "color"],
    ["background-color", "si_bg_color", "color"],
    "}",
    ".bp3-input:hover",
    ["color", "si_color", "color", ":hover"],
    ["background-color", "si_bg_color", "color", ":hover"],
    "}",
    ".bp3-input:focus",
    ["color", "si_color", "color", ":focus"],
    ["background-color", "si_bg_color", "color", ":focus"],
    "}",
    ".bp3-input-group .bp3-icon svg",
    ["height", "sii_size", "slider"],
    ["width", "sii_size", "slider"],
    ["margin", "sii_margin", "dimensions"],
    "}",
    ".bp3-input-group .bp3-icon path",
    ["fill", "sii_color", "color"],
    "}",
    ".bp3-icon-add svg",

    ["height", "a_size", "slider"],
    ["width", "a_size", "slider"],
    ["margin", "a_margin", "dimensions"],
    "}",
    ".bp3-icon-add path",
    ["fill", "a_color", "color"],
    "}",

    ".bp3-menu-item:hover .bp3-icon-add path",
    ["fill", "a_color", "color", ":hover"],
    "}",
    "altrp-select-delete-icon",
    ["height", "remove_size", "slider"],
    ["width", "remove_size", "slider"],
    ["margin", "remove_margin", "dimensions"],
    "}",
    "altrp-select-delete-icon svg",
    ["height", "remove_size", "slider"],
    ["width", "remove_size", "slider"],
    "}",
    "altrp-select-delete-icon path",
    ["fill", "remove_color", "color"],
    "}",
    "bp3-menu-item:hover .altrp-select-delete-icon path",
    ["fill", "remove_color", "color", ":hover"],
    "}",
    "}",
    //</editor-fold>
    //.active
    ".active .bp3-menu-item",
    [
      "background-color",
      "background_style_background_color",
      "color",
      ".active",
    ],
    ["color", "items_font_color", "color", ".active"],
    ["", "field_font_typographic", "typographic", ".active"],
    ["padding", "item_padding", "dimensions", ".active"],
    "}",
    ".active .bp3-popover-content",
    () =>
      `background-color: ${
        getResponsiveSetting(settings, "drop_menu_background_color", ".active")
          ?.color
      } !important;`,
    "}",
    ".active .bp3-menu",
    ["padding", "menu_padding", "dimensions", ".active"],
    ["background-color", "drop_menu_background_color", "color", ".active"],
    "}",
    ".active .bp3-input",
    ["", "field_font_typographic", "typographic", ".active"],
    ["height", "si_size", "slider", ".active"],
    ["padding", "si_padding", "dimensions", ".active"],
    ["color", "si_color", "color", ".active"],
    ["background-color", "si_bg_color", "color", ".active"],
    "}",
    ".active .bp3-input-group .bp3-icon svg",
    ["height", "sii_size", "slider", ".active"],
    ["width", "sii_size", "slider", ".active"],
    ["margin", "sii_margin", "dimensions", ".active"],
    "}",
    ".active .bp3-input-group .bp3-icon path",
    ["fill", "sii_color", "color", ".active"],
    "}",
    ".active .bp3-icon-add svg",
    ["height", "a_size", "slider", ".active"],
    ["width", "a_size", "slider", ".active"],
    ["margin", "a_margin", "dimensions", ".active"],
    "}",
    ".active .bp3-icon-add path",
    ["fill", "a_color", "color", ".active"],
    "}",
    "}",
  ];
  return styledString(styles, settings);
}
