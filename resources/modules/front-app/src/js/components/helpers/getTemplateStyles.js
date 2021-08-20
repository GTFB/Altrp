import {styledString} from "../../helpers/styles";

/**
 *
 * @param {{}} settings
 * @param {string} elementId
 */
export default function getTemplateStyles(settings, elementId) {
  let styles =[
    '& > .altrp-posts > .altrp-post > .sections-wrapper{',
    ['width', 'width'],
    '}'
  ];

  return styledString(styles, settings)
}

