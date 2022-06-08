import * as _ from "lodash";
import escapeRegExp from "./escapeRegExp";

export default async function prepareContent(content:string):Promise<string>{

  let paths = _.isString(content) ? content.match(/{{([\s\S]+?)(?=}})/g) : null;
  if (_.isArray(paths)) {
    // @ts-ignore
    paths.forEach(path => {
      path = path.replace("{{", "");
      if(path.indexOf('(') !== -1){
        return
      }
      let replace = path + "|| ''";
      replace = replace.replace(/\./g, '?.')
      replace = `{{{${replace}}}}`
      path = escapeRegExp(path);
      content = content.replace(new RegExp(`{{${path}}}`, "g"), replace);
    });
  }

  return content
}
