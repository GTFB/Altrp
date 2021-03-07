import {
  CHANGE_CURRENT_EMAIL_TEMPLATE
} from "./actions";


const defaultTemplate = null;

export function currentEmailTemplateReducer(template, action) {
  template = template || defaultTemplate;
  switch (action.type) {
    case CHANGE_CURRENT_EMAIL_TEMPLATE:
      {
        template = action.template;
      }
      break;
  }
  return template;
}
