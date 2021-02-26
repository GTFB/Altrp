import {changeCurrentEmailTemplate} from "../store/current-email-template/actions";
import {delay} from '../helpers';
import Resource from "../../../../editor/src/js/classes/Resource";
/**
 * Отправляет шаблон письма на бэкенд
 * @param {string | null}emailTemplateGUID
 * @param {string} subject
 * @param {string} from
 * @param {string} to
 * @param {string} attachments
 * @return {Promise<void>}
 */
export async function sendEmail(emailTemplateGUID = null, subject = 'Message', from = '', to = '', attachments = ''){
  if(! emailTemplateGUID){
    return {success: true};
  }
  let templateLoader = (await import('../../../../editor/src/js/classes/modules/TemplateLoader')).default;
  let template = await templateLoader.loadTemplate(emailTemplateGUID);
  appStore.dispatch(changeCurrentEmailTemplate(template));
  let html = '';
  do{
    await delay(1500);
    if(_.get(window, 'emailTemplatesRenderer.emailTemplate.current')){
      html = window.emailTemplatesRenderer.emailTemplate.current.outerHTML;
    }
  }while(! html);
  // appStore.dispatch(changeCurrentEmailTemplate(null));
  const resource = new Resource({route: '/ajax/feedback-html'});
  let res = await resource.post(
    {
      subject,
      to,
      from,
      html,
      attachments,
    }
  );
  return {success: true}
}