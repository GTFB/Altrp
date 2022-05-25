import {getResponsiveSetting} from "../../functions/getResponsiveSetting";
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
      styles += `svg, path{fill:${buttonColor.color};}`;
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

    styles += `${parentClass} .altrp-menu-toggle:hover{`;
    buttonBg = getResponsiveSetting(settings, 'button_bg', ':hover')
    if (buttonBg && buttonBg.color) {
      styles += `background-color:${buttonBg.color};background-image:none;`;
    }
    buttonColor = getResponsiveSetting(settings, 'button_color', ':hover')
    if (buttonColor && buttonColor.color) {
      styles += `svg, path{fill:${buttonColor.color};}`;
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
  }

  styles += `.bp3-menu-item.altrp-menu-item${id}{align-items:center;border-radius:0;`;

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

  styles += `.bp3-portal .altrp-portal.altrp-portal${id} .bp3-popover-content{`

  let sub_menu_shadow = getResponsiveSetting(settings, 'sub_menu_shadow');
  if (sub_menu_shadow) {
    styles += shadowControllerToStyles(sub_menu_shadow);
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
          styles += 'flex-direction: row;'
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

  return styles;
}

export default getMenuStyles;
