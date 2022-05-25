import isEditor from "./isEditor";
import replaceContentWithData from "./replaceContentWithData";

/**
 *@param {string} URLTemplate
 *@param {{} | null} object
 */
export default function parseURLTemplate(URLTemplate = "", object = null) {
  let url = URLTemplate;
  let protocol = "";
  if (!isEditor()) {
    object = _.assign(
      _.cloneDeep(currentRouterMatch.getProperty("params")),
      object
    );
  }
  url = url.trim();
  if (url.indexOf("{{") !== -1) {
    url = replaceContentWithData(url, object);
  }
  if (url.indexOf("https://") === 0) {
    protocol = "https://";
    url = url.replace("https://", "");
  }
  if (url.indexOf("http://") === 0) {
    protocol = "http://";
    url = url.replace("http://", "");
  }
  if (url.indexOf("mailto:") === 0) {
    protocol = "mailto:";
    url = url.replace("mailto:", "");
  }
  if (url.indexOf("tel:") === 0) {
    protocol = "tel:";
    url = url.replace("tel:", "");
  }
  // columnEditUrl = columnEditUrl.replace(':id', row.original.id);
  let idTemplates = url.match(/:([\s\S]+?)(\/|$)/g);
  if (!idTemplates) {
    return protocol + url;
  }
  idTemplates.forEach(idTemplate => {
    let replace = object[idTemplate.replace(/:|\//g, "")] || "";
    idTemplate = idTemplate.replace("/", "");
    url = url.replace(new RegExp(idTemplate, "g"), replace);
  });
  return protocol + url;
}
