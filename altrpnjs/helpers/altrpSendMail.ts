import Mail from '@ioc:Adonis/Addons/Mail'
import {SmtpDriver} from "@adonisjs/mail/build/src/Drivers/Smtp";
import Env from "@ioc:Adonis/Core/Env";
import Logger from "@ioc:Adonis/Core/Logger";
import replaceContentWithData from "./string/replaceContentWithData";

export default async function altrpSendMail(
  {
    from = '',
    to = '',
    subject = '',
    html = '',
  } = {},
  context:any
) {

  Mail.extend('smtp', function (){
    return new SmtpDriver({
      driver: "smtp",
      host: Env.get('MAIL_HOST'),
      port: Env.get('MAIL_PORT'),
      auth: {
        user: Env.get('MAIL_USERNAME'),
        pass: Env.get('MAIL_PASSWORD'),
        type: 'login',
      }})

  })
  from = from || Env.get('MAIL_FROM_ADDRESS')
  to = replaceContentWithData(to, context)
  subject = replaceContentWithData(subject, context)
  html = replaceContentWithData(html, context)
  try {

    await Mail.use('smtp').send((message) => {
      message
        .from(from || Env.get('MAIL_FROM_ADDRESS'))
        .to(to)
        .subject(subject)
        .html(html)
    })
    return {
      success:true
    }
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: e.message,
      trace:e?.stack.split('\n')
    }
  }
}

