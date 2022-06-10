import User from "App/Models/User";
import * as _ from "lodash";

export default async function filterAllowedForUser(htmlContent: string, user: User | undefined) {
  let paths = _.isString(htmlContent)
    ? htmlContent.match(/<allowedforuser.*?<\/allowedforuser>/g)
    : null;
  if (!paths) {
    return htmlContent
  }
  for (let path of paths) {
    const regex = new RegExp(path)
    let content:any = path.match(/>(.*)</)
    if (content && content[1]) {
      content = content[1]
    } else {
      content = ''
    }
    const forGuest = path.indexOf("type=\"guest\"") > -1
    const forAuth = path.indexOf("type=\"auth\"") > -1
    if (forGuest) {
      htmlContent = user ?
        htmlContent.replace(regex, '')
        : htmlContent.replace(regex, content)
      continue
    }
    if(forAuth){
      if(! user){
        htmlContent = htmlContent.replace(regex, '')
        continue
      }
      let roles =  path.match(/roles="(.*?)"/)
      if(roles && roles[1]){
        roles = roles[1].split(',')
      } else {
        let permissions:any = path.match(/permissions="(.*?)"/)
        if(permissions && permissions[1]){
          permissions = permissions[1].split(',')
          htmlContent = await user.hasPermission(permissions) ?
            htmlContent.replace(regex, content) :
            htmlContent.replace(regex, '')
          continue
        }
        htmlContent = htmlContent.replace(regex, content)
        continue
      }
      htmlContent = await user.hasRole(roles) ?
        htmlContent.replace(regex, content) :
        htmlContent.replace(regex, '')
    }
  }
  return htmlContent
}
