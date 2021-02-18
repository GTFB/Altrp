import {changeCurrentEmailTemplate} from "../store/current-email-template/actions";
/**
 * Отправляет шаблон письма на бэкенд
 * @param {string | null}emailTemplateGUID
 * @param {string} subject
 * @param {string} from
 * @param {string} to
 * @return {Promise<void>}
 */
export async function sendEmail(emailTemplateGUID = null, subject = 'Message', from = '', to = ''){
  if(! emailTemplateGUID){
    return {success: true};
  }
  let templateLoader = (await import('../../../../editor/src/js/classes/modules/TemplateLoader')).default;
  console.log(templateLoader);
  let template = await templateLoader.loadTemplate(emailTemplateGUID);
  console.log(template);
  appStore.dispatch(changeCurrentEmailTemplate(template));
  return {success: true}
}