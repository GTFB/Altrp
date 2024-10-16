import I18n from "App/Models/I18n";
import mustache from "mustache";
import set from "lodash/set";
import get from "lodash/get";
import get_altrp_setting from "../get_altrp_setting";

const __cache: any = {}
const defaultLang =  get_altrp_setting('site_language', 'en')
export default async function __(text: string, options: OptionsType | null):Promise<string>{
  if(! text){
    return text
  }
  const query = I18n.query().where({
    text
  })
  options = options || {}
  const {
    domain = '',
    data,
    lang = defaultLang,
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
    if(!i18){
      const newI18n = await I18n.create({text, translated_text:text})

      if(domain){
        newI18n.domain=domain
      }
      if(lang){
        newI18n.iso_lang=lang
      }
      await newI18n.save()
    }
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
