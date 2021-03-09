export const CHANGE_CURRENT_EMAIL_TEMPLATE = "CHANGE_CURRENT_EMAIL_TEMPLATE";


export function changeCurrentEmailTemplate(template) {
  return {
    type: CHANGE_CURRENT_EMAIL_TEMPLATE,
    template
  };
}
