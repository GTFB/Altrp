import I18n from "App/Models/I18n";
import mustache from "mustache";
import set from "lodash/set";
import get from "lodash/get";

const __cache: any = {}

export default async function __(text: string, options: OptionsType | null):Promise<string>{
  const query = I18n.query().where({
    text
  })
  options = options || {}
  const {
    domain = '',
    data,
    lang = '',
    force =false,
  } = options
  let translatedText = get(__cache, `${domain}.${text}.${lang}`)
  if( ! translatedText || ! force){
    if(domain){
      query.where('domain', domain)
    }
    if(lang){
      query.where('iso_lang', lang)
    }
    const i18 = await query.first()
    translatedText = i18 ? i18.translated_text: text
    i18 && (set(__cache, `${domain}.${text}.${lang}`, translatedText))
  }
  if(data){
    translatedText = mustache.render(translatedText, data)
  }

  return translatedText
}


interface OptionsType{
  data?: object,
  domain?: string,
  force?: boolean,
  lang?: string,
}
