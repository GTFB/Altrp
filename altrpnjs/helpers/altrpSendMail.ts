import {SmtpDriver} from "@adonisjs/mail/build/src/Drivers/Smtp";
import Env from "@ioc:Adonis/Core/Env";
import replaceContentWithData from "./string/replaceContentWithData";

import {Message} from "@adonisjs/mail/build/src/Message";

export default async function altrpSendMail(
  {
    from = '',
    to = '',
    subject = '',
    html = '',
    host = '',
    fromName = '',
    port = '',
    user = '',
    pass = '',
  } = {},
  context :any = {}
) {
  host = host ? host : Env.get('MAIL_HOST');
  port = port ? port : Env.get('MAIL_PORT');
  user = user ? user : Env.get('MAIL_USERNAME');
  pass = pass ? pass : Env.get('MAIL_PASSWORD');
  from = from ? from : Env.get('MAIL_USERNAME');


  to = replaceContentWithData(to, context)
  subject = replaceContentWithData(subject, context)
  html = replaceContentWithData(html, context)
  fromName = replaceContentWithData(fromName, context)
  fromName = fromName ? fromName : Env.get('MAIL_FROM_NAME')
  try {

    // @ts-ignore
    const message = new Message
    message
      .from(from || Env.get('MAIL_FROM_ADDRESS'), fromName)
      .to(to)
      .subject(subject)
      .html(html)
    await new SmtpDriver({
      driver: "smtp",
      host,
      port,
      auth: {
        user,
        pass,
        type: 'login',
      }}).send(message.toJSON().message)
    return {
      success:true
    }
  } catch (e) {
    console.error(e)
    return {
      success: false,
      message: e.message,
      trace:e?.stack.split('\n')
    }
  }
}

