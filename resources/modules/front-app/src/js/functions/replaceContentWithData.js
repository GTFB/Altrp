import getDataByPath from "./getDataByPath";
import isEditor from "./isEditor";

/**
 * Заменяет в тексте конструкции типа {{altrpdata...}} на данные
 * @param content
 * @param {{} | null} modelContext
 * @param squareBrackets
 */

export default function replaceContentWithData(content = "",
                                               modelContext = null,
                                               squareBrackets = false) {
  if (window.SSR || isEditor()) {
    return content;
  }

  if (_.isString(content) && content?.includes('{{{{')) {

    const match = /{{{{([\s\S]+?)(?=}}}})/g
    const replace = '{{{{'

    let paths = _.isString(content) ? content.match(match) : null;
    if (_.isArray(paths)) {
      const altrp_dictionary = window.altrp_dictionary || {}
      paths.forEach(path => {
        let _path = path.replace(replace, "");


        let value = altrp_dictionary[_path] || _path.split('::')[0]

        let pattern = `${path}}}}}`
        pattern = escapeRegExp(pattern);

        content = content.replace(new RegExp(pattern, "g"), value || "");

      })
    }
  }

  const match = squareBrackets ? /\[\[([\s\S]+?)(?=]])/g : /{{([\s\S]+?)(?=}})/g
  const replace = squareBrackets ? '[[' : '{{'
  let paths = _.isString(content) ? content.match(match) : null;
  if (_.isArray(paths)) {
    paths.forEach(path => {
      path = path.replace(replace, "");
      let _path = path
      if (_path.indexOf('[[') > -1) {
        _path = replaceContentWithData(_path, modelContext, true)
      }
      let value = getDataByPath(_path, "", modelContext);

      if (value === 0) {
        value = "0";
      }
      let pattern = squareBrackets ? `[[${path}]]` : `{{${path}}}`
      pattern = escapeRegExp(pattern);

      content = content.replace(new RegExp(pattern, "g"), value || "");

    });
  }

  if(_.isString(content) && content.includes('{{{{')){
    return replaceContentWithData(content)
  }

  return content;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
