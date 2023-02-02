import * as _ from 'lodash'
import Template from "App/Models/Template";
//@ts-ignore
export default async function renderTournament(settings, device, elementId, randomString) {
  let template = settings.template
  template = await Template.query().where('guid', template).first()
  if(! template){
    return ''
  }

  let content = await template.getChildrenContent()

  content += `
  ${content}
  <link rel="stylesheet" href="/altrp/css/DEFAULT_BREAKPOINT/${settings.template}.css?${randomString}"/>
  `
  return content
}
