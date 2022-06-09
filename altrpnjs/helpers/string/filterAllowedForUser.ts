import User from "App/Models/User";
import * as _ from "lodash";

export default function filterAllowedForUser(htmlContent: string, user: User|undefined) {
  console.log(user);
  let paths = _.isString(htmlContent)
    ? htmlContent.match(/<allowedforuser.*?<\/allowedforuser>/g)
    : null;
  if(! paths){
    return htmlContent
  }
  for (let path of paths) {
    const regex = new RegExp(path)
    const content = path.match(/>*.*</)
    console.log(regex);
    const forGuest = path.indexOf("type=\"guest\"") > -1
    if(! user && forGuest){

    }
  }
  return htmlContent
}
