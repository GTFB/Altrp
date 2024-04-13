import * as _ from "lodash";
import Menu from "App/Models/Menu";
import getValue from "../cache/getValue";
import setValue from "../cache/setValue";




export default async function translateContent(content: string,  { lang }): Promise<{content: string, dictionary: {  }}> {

  if(! lang){
    return {content, dictionary: {}}

  }

  let allMenus = await getValue(Menu.ALL_MENU_CACHE_KEY)

  if(! allMenus){
    allMenus = await Menu.all()
    await setValue(Menu.ALL_MENU_CACHE_KEY, allMenus.map(m=>m.toJSON()))
  }

  const menus = allMenus.filter(m=>{
    return content.includes(m.guid)
  })
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
      console.log(text)
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

  for (const m of menus){
    let paths = _.isString(m.children) ? content.match(match) : null;
    if (_.isArray(paths)) {
      for(const path of paths){
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

      }
    }
  }

  return {
    content,
    dictionary
  }
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
