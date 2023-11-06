import * as _ from "lodash";

export default async function translateContent(content: string,  { lang }): Promise<{content: string, dictionary: {  }}> {

  if(! lang){
    return {content, dictionary: {}}

  }
  const dictionary = {

  }
  const match =   /{{{{([\s\S]+?)(?=}}}})/g
  const replace =  '{{{{'

  let paths = _.isString(content) ? content.match(match) : null;
  if (_.isArray(paths)) {
    await  Promise.all(paths.map(async path => {
      let _path = path.replace(replace, "");

      const [
        text,
        domain
      ] = _path.split('::')

      let value =await __(text, {
        domain,
        lang,
      })
      dictionary[_path] = value
      let pattern = `${path}}}}}`
      pattern = escapeRegExp(pattern);

      content = content.replace(new RegExp(pattern, "g"), value || "");

    }))
  }

  return {
    content,
    dictionary
  }
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
