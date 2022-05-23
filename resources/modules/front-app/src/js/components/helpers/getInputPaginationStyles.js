import {styledString} from "../../helpers/styles";

const getInputPaginationStyles = (settings) => {
  let styles = [
    'altrp-input-pagination__item',
    ['margin-right', 'gap', 'slider'],
    ['padding', 'padding', 'dimensions'],
    ['color', 'color', 'color'],
    ['', 'typographic', 'typographic'],
    ['border-style', 'border_type'],
    ['border-width', 'border_width', 'dimensions'],
    ['border-color', 'border_color', 'color'],
    ['', 'box_shadow', 'shadow'],
    ['border-radius', 'border_radius', 'dimensions'],
    ['background-color', "background_color", "color"],
    "}",
    //state disabled
    '.state-disabled.altrp-input-pagination__item',
    ['margin-right', 'gap', 'slider', '.state-disabled'],
    ['padding', 'padding', 'dimensions', '.state-disabled'],
    ['color', 'color', 'color', '.state-disabled'],
    ['', 'typographic', 'typographic', '.state-disabled'],
    ['border-style', 'border_type', '', '.state-disabled'],
    ['border-width', 'border_width', 'dimensions', '.state-disabled'],
    ['border-color', 'border_color', 'color', '.state-disabled'],
    ['', 'box_shadow', 'shadow', '.state-disabled'],
    ['border-radius', 'border_radius', 'dimensions', '.state-disabled'],
    ['background-color', "background_color", "color", '.state-disabled'],
    "}",
    //state active
    '.active.altrp-input-pagination__item',
    ['margin-right', 'gap', 'slider', '.active'],
    ['padding', 'padding', 'dimensions', '.active'],
    ['color', 'color', 'color', '.active'],
    ['', 'typographic', 'typographic', '.active'],
    ['border-style', 'border_type', '', '.active'],
    ['border-width', 'border_width', 'dimensions', '.active'],
    ['border-color', 'border_color', 'color', '.active'],
    ['', 'box_shadow', 'shadow', '.active'],
    ['border-radius', 'border_radius', 'dimensions', '.active'],
    ['background-color', "background_color", "color", '.active'],
    "}"
  ]

  return styledString(styles, settings)
}

export default getInputPaginationStyles
