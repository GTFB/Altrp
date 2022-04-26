import getDataByPath from "./getDataByPath";

/**
 * Заменяет в тексте конструкции типа {{altrpdata...}} на данные
 * @param content
 * @param {{} | null} modelContext
 */

export default function replaceContentWithData(content = "", modelContext = null) {
  if(window.SSR){
    return  content;
  }
  let paths = _.isString(content) ? content.match(/{{([\s\S]+?)(?=}})/g) : null;
  if (_.isArray(paths)) {
    paths.forEach(path => {
      path = path.replace("{{", "");
      let value = getDataByPath(path, "", modelContext);

      if (value === 0) {
        value = "0";
      }
      path = escapeRegExp(path);
      content = content.replace(new RegExp(`{{${path}}}`, "g"), value || "");
    });
  }
  return content;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
