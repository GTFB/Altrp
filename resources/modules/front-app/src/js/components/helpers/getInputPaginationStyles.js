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
    "}"
  ]

  return styledString(styles, settings)
}

export default getInputPaginationStyles
