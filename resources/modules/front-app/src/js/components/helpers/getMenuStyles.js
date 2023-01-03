import getResponsiveSetting from "../../functions/getResponsiveSetting";
import {
  dimensionsControllerToStyles,
  shadowControllerToStyles, styledString,
  typographicControllerToStyles
} from "../../helpers/styles";

const getMenuStyles = (settings, id) => {

  const parentClass = `.altrp-element${id}`;

  let styles = `${parentClass} .altrp-menu{`;

  const menuAlignment = getResponsiveSetting(settings, "menu_alignment");

  if (getResponsiveSetting(settings, 'type') === 'horizontal') {
    styles += 'display: flex;';
    styles += 'flex-direction: row;'
    // styles += '.bp3-submenu{flex-grow:1}';
    styles += '.bp3-icon-caret-right{transform: rotate(90deg);}';
    if(menuAlignment) {
      styles += `justify-content: ${menuAlignment}`
    }
  } else {
    styles += 'flex-direction: column;'
    if(menuAlignment) {
      styles += `align-items: ${menuAlignment}`
    }
  }

  styles += '} ';

  //state disabled
  styles += `.state-disabled ${parentClass} .altrp-menu{`;

  const menuAlignmentDisabled = getResponsiveSetting(settings, "menu_alignment", ".state-disabled");

  if (getResponsiveSetting(settings, 'type') === 'horizontal') {
    styles += 'display: flex;';
    styles += 'flex-direction: row;'
    // styles += '.bp3-submenu{flex-grow:1}';
    styles += '.bp3-icon-caret-right{transform: rotate(90deg);}';
    if(menuAlignmentDisabled) {
      styles += `justify-content: ${menuAlignmentDisabled}`
    }
  } else {
    styles += 'flex-direction: column;'
    if(menuAlignmentDisabled) {
      styles += `align-items: ${menuAlignmentDisabled}`
    }
  }

  styles += '} ';

  //state active
  styles += `.active ${parentClass} .altrp-menu{`;

  const menuAlignmentActive = getResponsiveSetting(settings, "menu_alignment", ".active");

  if (getResponsiveSetting(settings, 'type') === 'horizontal') {
    styles += 'display: flex;';
    styles += 'flex-direction: row;'
    // styles += '.bp3-submenu{flex-grow:1}';
    styles += '.bp3-icon-caret-right{transform: rotate(90deg);}';
    if(menuAlignmentActive) {
      styles += `justify-content: ${menuAlignmentActive}`
    }
  } else {
    styles += 'flex-direction: column;'
    if(menuAlignmentActive) {
      styles += `align-items: ${menuAlignmentActive}`
    }
  }

  styles += '} ';


  /**
   * Стили поповера
   * @type {string}
   */
  let renderButton = getResponsiveSetting(settings, 'button');
  if (renderButton) {
    styles += `${parentClass}${parentClass} {`;
    let alignment = getResponsiveSetting(settings, 'alignment')
    styles += `justify-content:${alignment};flex-direction: row;`;
    if (alignment !== 'stretch') {
      styles += `& .altrp-popover{flex-grow:0; width: auto;}`;
    } else {
      styles += `& .bp3-button {width: 100%;}`;
    }
    styles += '} ';
  }

  /**
   * Стили поповера disabled
   * @type {string}
   */
  let renderButtonDisabled = getResponsiveSetting(settings, 'button', '.state-disabled');
  if (renderButtonDisabled) {
    styles += `.state-disabled ${parentClass}${parentClass} {`;
    let alignmentDisabled = getResponsiveSetting(settings, 'alignment', '.state-disabled')
    styles += `justify-content:${alignmentDisabled};flex-direction: row;`;
    if (alignmentDisabled !== 'stretch') {
      styles += `.state-disabled & .altrp-popover{flex-grow:0; width: auto;}`;
    } else {
      styles += `.state-disabled & .bp3-button {width: 100%;}`;
    }
    styles += '} ';
  }

  /**
   * Стили поповера active
   * @type {string}
   */
  let renderButtonActive = getResponsiveSetting(settings, 'button', '.active');
  if (renderButtonActive) {
    styles += `.active ${parentClass}${parentClass} {`;
    let alignmentActive = getResponsiveSetting(settings, 'alignment', '.active')
    styles += `justify-content:${alignmentActive};flex-direction: row;`;
    if (alignmentActive !== 'stretch') {
      styles += `.active &  .altrp-popover{flex-grow:0; width: auto;}`;
    } else {
      styles += `.active & .bp3-button {width: 100%;}`;
    }
    styles += '} ';
  }

  /**
   * Стили кнопки
   * @type {string}
   */
  if (renderButton) {
    styles += `${parentClass}${parentClass} .altrp-menu-toggle{`;
    let buttonBg = getResponsiveSetting(settings, 'button_bg')
    if (buttonBg && buttonBg.color) {
      styles += `background-color:${buttonBg.color};background-image:none;`;
    }
    let buttonColor = getResponsiveSetting(settings, 'button_color')
    if (buttonColor && buttonColor.color) {
      styles += `svg, path, rect{fill:${buttonColor.color};}`;
    }

    let buttonPadding = getResponsiveSetting(settings, 'button_padding')
    if (buttonPadding) {
      styles += dimensionsControllerToStyles(buttonPadding);
    }
    let border = getResponsiveSetting(settings, 'border');
    if (border) {
      styles += `border-style:${border};`;
      styles += dimensionsControllerToStyles(getResponsiveSetting(settings, 'border_width'), 'border-width');
      let borderColor = getResponsiveSetting(settings, 'border_color')
      if (borderColor && borderColor.color) {
        styles += `border-color:${borderColor.color};`;
      }
    }
    let borderRadius = getResponsiveSetting(settings, 'button_radius');
    if (borderRadius) {
      styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
    }
    styles += '} ';

//state disabled
    styles += `.state-disabled ${parentClass}${parentClass} .altrp-menu-toggle{`;
    let buttonBgDisabled = getResponsiveSetting(settings, 'button_bg', '.state-disabled')
    if (buttonBgDisabled && buttonBgDisabled.color) {
      styles += `background-color:${buttonBgDisabled.color};background-image:none;`;
    }
    let buttonColorDisabled = getResponsiveSetting(settings, 'button_color', '.state-disabled')
    if (buttonColorDisabled && buttonColorDisabled.color) {
      styles += `svg, path, rect{fill:${buttonColorDisabled.color};}`;
    }
    let buttonPaddingDisabled = getResponsiveSetting(settings, 'button_padding', '.state-disabled')
    if (buttonPaddingDisabled) {
      styles += dimensionsControllerToStyles(buttonPaddingDisabled);
    }
    let borderDisabled = getResponsiveSetting(settings, 'border', '.state-disabled');
    if (borderDisabled) {
      styles += `border-style:${borderDisabled};`;
      styles += dimensionsControllerToStyles(getResponsiveSetting(settings, 'border_width', '.state-disabled'), 'border-width');
      let borderColorDisabled = getResponsiveSetting(settings, 'border_color', '.state-disabled')
      if (borderColorDisabled && borderColorDisabled.color) {
        styles += `border-color:${borderColorDisabled.color};`;
      }
    }
    let borderRadiusDisabled = getResponsiveSetting(settings, 'button_radius', '.state-disabled');
    if (borderRadiusDisabled) {
      styles += dimensionsControllerToStyles(borderRadiusDisabled, 'border-radius');
    }
    styles += '} ';
    //state active
    styles += `.active ${parentClass}${parentClass} .altrp-menu-toggle{`;
    let buttonBgActive = getResponsiveSetting(settings, 'button_bg', '.active')
    if (buttonBgActive && buttonBgActive.color) {
      styles += `background-color:${buttonBgActive.color};background-image:none;`;
    }
    let buttonColorActive = getResponsiveSetting(settings, 'button_color', '.active')
    if (buttonColorActive && buttonColorActive.color) {
      styles += `svg, path, rect{fill:${buttonColorActive.color};}`;
    }
    let buttonPaddingActive = getResponsiveSetting(settings, 'button_padding', '.active')
    if (buttonPaddingActive) {
      styles += dimensionsControllerToStyles(buttonPaddingActive);
    }
    let borderActive = getResponsiveSetting(settings, 'border', '.active');
    if (borderActive) {
      styles += `border-style:${borderActive};`;
      styles += dimensionsControllerToStyles(getResponsiveSetting(settings, 'border_width', '.active'), 'border-width');
      let borderColorActive = getResponsiveSetting(settings, 'border_color', '.active')
      if (borderColorActive && borderColorActive.color) {
        styles += `border-color:${borderColorActive.color};`;
      }
    }
    let borderRadiusActive = getResponsiveSetting(settings, 'button_radius', '.active');
    if (borderRadiusActive) {
      styles += dimensionsControllerToStyles(borderRadiusActive, 'border-radius');
    }
    styles += '} ';


    styles += `${parentClass} .altrp-menu-toggle:hover{`;
    buttonBg = getResponsiveSetting(settings, 'button_bg', ':hover')
    if (buttonBg && buttonBg.color) {
      styles += `background-color:${buttonBg.color};background-image:none;`;
    }
    buttonColor = getResponsiveSetting(settings, 'button_color', ':hover')
    if (buttonColor && buttonColor.color) {
      styles += `svg, path, rect{fill:${buttonColor.color};}`;
    }
    border = getResponsiveSetting(settings, 'border', ':hover');
    if (border) {
      styles += `border-style:${border};`;
      styles += dimensionsControllerToStyles(getResponsiveSetting(settings, 'border_width', ':hover'), 'border-width');
      let borderColor = getResponsiveSetting(settings, 'border_color', ':hover')
      if (borderColor && borderColor.color) {
        styles += `border-color:${borderColor.color};`;
      }
    }
    borderRadius = getResponsiveSetting(settings, 'button_radius', ':hover');
    if (borderRadius) {
      styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
    }
    styles += '}';



  }

  styles += `.altrp-element${id}.altrp-widget_menu {`; // было .altrp-portal${id} .altrp-menu

  // const menuPadding = getResponsiveSetting(settings, 'menu_padding');
  // if (menuPadding) {
  //   styles += dimensionsControllerToStyles(menuPadding);
  // }
  // let menu_radius = getResponsiveSetting(settings, 'menu_radius');
  // if (menu_radius) {
  //   styles += dimensionsControllerToStyles(menu_radius, 'border-radius');
  // }
  // let gap = getResponsiveSetting(settings, 'gap');
  // if (gap) {
  //   gap = gap.replace(',', '.')
  //   styles += `& .altrp-menu > li:not(:last-child) { margin-${
  //     getResponsiveSetting(settings, 'type') === 'horizontal' ? 'right' : 'bottom'
  //   }: ${gap}}`;
  //
  // }
  styles += '}';
  // styles += `.altrp-element${id} .altrp-menu{`;
  // let menuBg = getResponsiveSetting(settings, 'menu_bg');
  // if (menuBg && menuBg.color) {
  //   styles += `background-color: ${menuBg.color};`;
  // }
  // styles += '}';
  /**
   * стили для ховера
   * @type {string}
   */
  styles += `.altrp-element${id}.altrp-widget_menu:hover {`; // было .altrp-portal${id} .altrp-menu:hover

  // menu_radius = getResponsiveSetting(settings, 'menu_radius', ':hover');
  // if (menu_radius) {
  //   styles += dimensionsControllerToStyles(menu_radius, 'border-radius');
  // }

  styles += '}';
  if (renderButton) {
    styles += `.altrp-portal_main.altrp-portal${id} .altrp-menu{`;
    let mainPortalWidth = getResponsiveSetting(settings, 'width');
    if (mainPortalWidth) {
      styles += `max-width:${mainPortalWidth};width:${mainPortalWidth};`;
    }
    styles += '}';

    //state disabled
    styles += `.state-disabled .altrp-portal_main.altrp-portal${id} .altrp-menu{`;
    let mainPortalWidthDisabled = getResponsiveSetting(settings, 'width', '.state-disabled');
    if (mainPortalWidthDisabled) {
      styles += `max-width:${mainPortalWidthDisabled};width:${mainPortalWidthDisabled};`;
    }
    styles += '}';
    //state active
    styles += `.active .altrp-portal_main.altrp-portal${id} .altrp-menu{`;
    let mainPortalWidthActive = getResponsiveSetting(settings, 'width', '.active');
    if (mainPortalWidthActive) {
      styles += `max-width:${mainPortalWidthActive};width:${mainPortalWidthActive};`;
    }
    styles += '}';
  }

  styles += `.bp3-menu-item.altrp-menu-item${id}{`;

  let padding = getResponsiveSetting(settings, 'padding');
  if (padding) {
    styles += dimensionsControllerToStyles(padding);
  }

  let typographic = getResponsiveSetting(settings, 'typographic');

  if (typographic) {
    styles += typographicControllerToStyles(typographic);
  }

  let bg = getResponsiveSetting(settings, 'bg');


  if (bg && bg.color) {
    styles += `background-color: ${bg.color};`;
  }
  let color = getResponsiveSetting(settings, 'color');

  if (color && color.color) {
    styles += `color: ${color.color};`;
    styles += `.bp3-icon svg, .bp3-icon path{fill: ${color.color};}`;
  }


  styles += '}';

  //state disabled
  styles += `.state-disabled .bp3-menu-item.altrp-menu-item${id}{`;

  let paddingDisabled = getResponsiveSetting(settings, 'padding', '.state-disabled');
  if (paddingDisabled) {
    styles += dimensionsControllerToStyles(paddingDisabled);
  }
  let typographicDisabled = getResponsiveSetting(settings, 'typographic', '.state-disabled');
  if (typographicDisabled) {
    styles += typographicControllerToStyles(typographicDisabled);
  }
  let bgDisabled = getResponsiveSetting(settings, 'bg', '.state-disabled');
  if (bgDisabled && bgDisabled.color) {
    styles += `background-color: ${bgDisabled.color};`;
  }
  let colorDisabled = getResponsiveSetting(settings, 'color', '.state-disabled');

  if (colorDisabled && colorDisabled.color) {
    styles += `color: ${colorDisabled.color};`;
    styles += `.bp3-icon svg, .bp3-icon path{fill: ${colorDisabled.color};}`;
  }

  styles += '}';
  /**
   * Hover Styles
   */
  styles += `.bp3-popover-open.bp3-popover-target .bp3-menu-item.altrp-menu-item.altrp-menu-item${id},
    .bp3-menu-item.altrp-menu-item.altrp-menu-item${id}:hover{`;
  bg = getResponsiveSetting(settings, 'bg', ':hover');
  if (bg && bg.color) {
    styles += `background-color: ${bg.color};`;
  }

  typographic = getResponsiveSetting(settings, 'typographic', ':hover');

  if (typographic) {
    styles += typographicControllerToStyles(typographic);
  }

  color = getResponsiveSetting(settings, 'color', ':hover');
  if (color && color.color) {
    styles += `color: ${color.color};`;
    styles += `.bp3-icon svg, .bp3-icon path{fill: ${color.color};}`;
  }
  styles += '}';

  /**
   * Active Styles
   */
  styles += `.bp3-popover-open.bp3-popover-target .bp3-menu-item.altrp-menu-item.altrp-menu-item${id},
    .bp3-menu-item.altrp-menu-item.altrp-menu-item${id}.active{`;
  bg = getResponsiveSetting(settings, 'bg', '.active');
  if (bg && bg.color) {
    styles += `background-color: ${bg.color};`;
  }

  typographic = getResponsiveSetting(settings, 'typographic', '.active');

  if (typographic) {
    styles += typographicControllerToStyles(typographic);
  }

  color = getResponsiveSetting(settings, 'color', '.active');
  if (color && color.color) {
    styles += `color: ${color.color};`;
    styles += `.bp3-icon svg, .bp3-icon path{fill: ${color.color};}`;
  }
  styles += '}';

  // if (gap) {
  //   styles += `.altrp-portal${id} .bp3-menu > li:not(:last-child) { margin-bottom: ${gap}}`;
  // }

  /**
   * Submenu styles
   */
  styles += `.altrp-portal${id} .bp3-menu{`;

  // let sub_menu_padding = getResponsiveSetting(settings, 'sub_menu_padding');
  // if (sub_menu_padding) {
  //   styles += dimensionsControllerToStyles(sub_menu_padding);
  // }

  let sub_menu_bg = getResponsiveSetting(settings, 'sub_menu_bg');
  if (sub_menu_bg && sub_menu_bg.color) {
    styles += `background-color: ${sub_menu_bg.color};`;
  }


  styles += '}';

  //state disabled
  /**
   * Submenu styles
   */
  styles += `.state-disabled .altrp-portal${id} .bp3-menu{`;

  let sub_menu_bgDisabled = getResponsiveSetting(settings, 'sub_menu_bg', '.state-disabled');
  if (sub_menu_bgDisabled && sub_menu_bgDisabled.color) {
    styles += `background-color: ${sub_menu_bgDisabled.color};`;
  }

  styles += '}';

  //state active
  /**
   * Submenu styles
   */
  styles += `.active .altrp-portal${id} .bp3-menu{`;

  let sub_menu_bgActive = getResponsiveSetting(settings, 'sub_menu_bg', '.active');
  if (sub_menu_bgActive && sub_menu_bgActive.color) {
    styles += `background-color: ${sub_menu_bgActive.color};`;
  }

  styles += '}';

  styles += `.bp3-portal .altrp-portal.altrp-portal${id} .bp3-popover-content{`

  let sub_menu_shadow = getResponsiveSetting(settings, 'sub_menu_shadow');
  if (sub_menu_shadow) {
    styles += shadowControllerToStyles(sub_menu_shadow);
  }
  styles += '}';

  //state disabled
  styles += `.state-disabled .bp3-portal .altrp-portal.altrp-portal${id} .bp3-popover-content{`

  let sub_menu_shadow_disabled = getResponsiveSetting(settings, 'sub_menu_shadow', '.state-disabled');
  if (sub_menu_shadow_disabled) {
    styles += shadowControllerToStyles(sub_menu_shadow_disabled);
  }
  styles += '}';

  //state active
  styles += `.active .bp3-portal .altrp-portal.altrp-portal${id} .bp3-popover-content{`

  let sub_menu_shadow_active = getResponsiveSetting(settings, 'sub_menu_shadow', '.active');
  if (sub_menu_shadow_active) {
    styles += shadowControllerToStyles(sub_menu_shadow_active);
  }
  styles += '}';

  styles += `.altrp-portal.altrp-portal${id} .bp3-popover-content,
    .altrp-portal.altrp-portal${id} .bp3-menu{`;
  // let sub_menu_radius = getResponsiveSetting(settings, 'sub_menu_radius');
  // if (sub_menu_radius) {
  //   styles += dimensionsControllerToStyles(sub_menu_radius, 'border-radius');
  // }
  styles += '}';
  styles += `.altrp-portal${id} .bp3-menu:hover{`;

  sub_menu_bg = getResponsiveSetting(settings, 'sub_menu_bg', ':hover');
  if (sub_menu_bg && sub_menu_bg.color) {
    styles += `background-color: ${sub_menu_bg.color};`;
  }


  styles += `.bp3-portal .altrp-portal.altrp-portal${id} .bp3-popover-content:hover{`

  sub_menu_shadow = getResponsiveSetting(settings, 'sub_menu_shadow', ':hover');
  if (sub_menu_shadow) {
    styles += shadowControllerToStyles(sub_menu_shadow);
  }
  styles += '}';
  styles += '}';

  styles += `.altrp-portal.altrp-portal${id} .bp3-popover-content:hover,
    .altrp-portal.altrp-portal${id} .bp3-menu:hover{`;

  // sub_menu_radius = getResponsiveSetting(settings, 'sub_menu_radius', ':hover');
  // if (sub_menu_radius) {
  //   styles += dimensionsControllerToStyles(sub_menu_radius, 'border-radius');
  // }
  styles += '}';


  const menuStyles = [
    "altrp-menu",
      ["padding", "menu_padding", "dimensions"],
      () => {
        const value = getResponsiveSetting(settings, 'gap');

        if(value) {
          return `grid-gap: ${value};`
        } else {
          return ""
        }
      },
      ["background-color", "menu_bg", "color"],
    "}",

    "altrp-menu li .bp3-menu-item",
      ["border-radius", "item_radius", "dimensions"],
    "}",

    "altrp-menu-toggle .altrp-menu-item__icon svg",
      () => {
        const value = getResponsiveSetting(settings, "icon_size");

        if(value) {
          return `height:${value};width: ${value};`;
        }
      },
    "}",
  ]

  const styledArray = [
    ...menuStyles
  ]

  styles += `.altrp-element${id} {${styledString(styledArray, settings)}}`

  //state disabled
  const menuStylesDisabled = [
    "state-disabled",
    ["padding", "menu_padding", "dimensions", ".state-disabled"],
    () => {
      const valueDisabled = getResponsiveSetting(settings, 'gap', '.state-disabled');

      if(valueDisabled) {
        return `grid-gap: ${valueDisabled};`
      } else {
        return ""
      }
    },
    ["background-color", "menu_bg", "color", ".state-disabled"],
    "}",

    "altrp-menu li .bp3-menu-item",
    ["border-radius", "item_radius", "dimensions", ".state-disabled"],
    "}",

    "altrp-menu-toggle .altrp-menu-item__icon svg",
    () => {
      const valueDisabled = getResponsiveSetting(settings, "icon_size", ".state-disabled");

      if(valueDisabled) {
        return `height:${valueDisabled};width: ${valueDisabled};`;
      }
    },
    "}",
  ]

  const styledArrayDisabled = [
    ...menuStylesDisabled
  ]
  styles += `.altrp-element${id} {${styledString(styledArrayDisabled, settings)}}`
  //state active
  const menuStylesActive = [
    "active",
    ["padding", "menu_padding", "dimensions", ".active"],
    () => {
      const valueActive = getResponsiveSetting(settings, 'gap', '.active');

      if(valueActive) {
        return `grid-gap: ${valueActive};`
      } else {
        return ""
      }
    },
    ["background-color", "menu_bg", "color", ".active"],
    "}",

    "altrp-menu li .bp3-menu-item",
    ["border-radius", "item_radius", "dimensions", ".active"],
    "}",

    "altrp-menu-toggle .altrp-menu-item__icon svg",
    () => {
      const valueActive = getResponsiveSetting(settings, "icon_size", ".active");

      if(valueActive) {
        return `height:${valueActive};width: ${valueActive};`;
      }
    },
    "}",
  ]

  const styledArrayActive = [
    ...menuStylesActive
  ]

  styles += `.altrp-element${id} {${styledString(styledArrayActive, settings)}}`

  const styledPortalArray = [
    "bp3-popover-content.bp3-popover-content",
      ["border-radius", "popover_radius", "dimensions"],
    "}",

    "& li .bp3-menu-item",
      ["border-radius", "sub_menu_radius", "dimensions"],
    "}",

    "bp3-popover-content .bp3-menu",
      ["border-radius", "popover_radius", "dimensions"],
    "}",


    "bp3-menu",

      () => {
        let styles = "";
        if (getResponsiveSetting(settings, 'type') === 'horizontal') {
          styles += 'display: flex;';
          //styles += 'flex-direction: row;'
          // styles += '.bp3-submenu{flex-grow:1}';
          styles += '.bp3-icon-caret-right{transform: rotate(90deg);}';
          if(menuAlignment) {
            styles += `justify-content: ${menuAlignment}`
          }
        } else {
          styles += 'flex-direction: column;'
          if(menuAlignment) {
            styles += `align-items: ${menuAlignment};`
          }
        }

        return styles
      },
    "}",

    "&.altrp-menu-first-portal .bp3-menu",
      () => {
        const value = getResponsiveSetting(settings, "popover_width");

        if(value) {
          return `max-width:${value};width: ${value};`;
        }
      },
    "}",

    "&.altrp-sub-portal .bp3-menu",
    () => {
      const value = getResponsiveSetting(settings, "sub_width");

      if(value) {
        return `max-width:${value};width: ${value};`;
      }
    },
    "}",

    ...menuStyles,
  ]
  styles += `.altrp-portal${id} {${styledString(styledPortalArray, settings)}}`

  //state disabled

  const styledPortalArrayDisabled = [
    ".state-disabled .bp3-popover-content.bp3-popover-content",
    ["border-radius", "popover_radius", "dimensions", ".state-disabled"],
    "}",

    "& .state-disabled li .bp3-menu-item",
    ["border-radius", "sub_menu_radius", "dimensions", ".state-disabled"],
    "}",

    ".state-disabled .bp3-popover-content .bp3-menu",
    ["border-radius", "popover_radius", "dimensions", ".state-disabled"],
    "}",


    ".state-disabled .bp3-menu",

    () => {
      let styles = "";
      if (getResponsiveSetting(settings, 'type', '.state-disabled') === 'horizontal') {
        styles += 'display: flex;';
        styles += 'flex-direction: row;'
        // styles += '.bp3-submenu{flex-grow:1}';
        styles += '.state-disabled .bp3-icon-caret-right{transform: rotate(90deg);}';
        if(menuAlignment) {
          styles += `justify-content: ${menuAlignment}`
        }
      } else {
        styles += 'flex-direction: column;'
        if(menuAlignment) {
          styles += `align-items: ${menuAlignment};`
        }
      }

      return styles
    },
    "}",

    ".state-disabled &.altrp-menu-first-portal .bp3-menu",
    () => {
      const value = getResponsiveSetting(settings, "popover_width", ".state-disabled");
      if(value) {
        return `max-width:${value};width: ${value};`;
      }
    },
    "}",

    ".state-disabled &.altrp-sub-portal .bp3-menu",
    () => {
      const value = getResponsiveSetting(settings, "sub_width", ".state-disabled");
      if(value) {
        return `max-width:${value};width: ${value};`;
      }
    },
    "}",

    ...menuStylesDisabled,
  ]
  styles += `.state-disabled .altrp-portal${id} {${styledString(styledPortalArrayDisabled, settings)}}`

  //state active

  const styledPortalArrayActive = [
    ".active .bp3-popover-content.bp3-popover-content",
    ["border-radius", "popover_radius", "dimensions", ".active"],
    "}",

    "& .active li .bp3-menu-item",
    ["border-radius", "sub_menu_radius", "dimensions", ".active"],
    "}",

    ".active .bp3-popover-content .bp3-menu",
    ["border-radius", "popover_radius", "dimensions", ".active"],
    "}",


    ".active .bp3-menu",

    () => {
      let styles = "";
      if (getResponsiveSetting(settings, 'type', '.active') === 'horizontal') {
        styles += 'display: flex;';
        styles += 'flex-direction: row;'
        // styles += '.bp3-submenu{flex-grow:1}';
        styles += '.active .bp3-icon-caret-right{transform: rotate(90deg);}';
        if(menuAlignment) {
          styles += `justify-content: ${menuAlignment}`
        }
      } else {
        styles += 'flex-direction: column;'
        if(menuAlignment) {
          styles += `align-items: ${menuAlignment};`
        }
      }

      return styles
    },
    "}",

    ".active &.altrp-menu-first-portal .bp3-menu",
    () => {
      const value = getResponsiveSetting(settings, "popover_width", ".active");
      if(value) {
        return `max-width:${value};width: ${value};`;
      }
    },
    "}",

    ".active &.altrp-sub-portal .bp3-menu",
    () => {
      const value = getResponsiveSetting(settings, "sub_width", ".active");
      if(value) {
        return `max-width:${value};width: ${value};`;
      }
    },
    "}",

    ...menuStylesActive,
  ]
  styles += `.active .altrp-portal${id} {${styledString(styledPortalArrayActive, settings)}}`

  return styles;
}

export default getMenuStyles;
