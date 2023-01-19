import replaceContentWithData from "./replaceContentWithData";
import {_checkUrl} from "./events-handlers/document-click";

/**
 * Перенаправление на другую страницу по настройкам LinkController
 * @param {{}} linkSettings
 * @param {{}} e
 * @param {{}} context
 */
export default async function redirect(linkSettings, e, context = {}) {
  if (_.get(linkSettings, "toPrevPage")) {
    if(window.frontAppRouter){
      frontAppRouter.history.goBack();
    } else {
      history.back();
    }
    return;
  }
  if (!_.get(linkSettings, "url")) {
    return;
  }
  e.preventDefault();
  e.stopPropagation();
  let { url } = linkSettings;
  url = replaceContentWithData(url, context);
  if (linkSettings.openInNew) {
    window.open(url, "_blank");
    return;
  }
  if (linkSettings.tag === "a" || ! window.frontAppRouter) {
    url = url.replace(location.origin, '')
    url = location.origin + url
    url = new URL(url)

    if(! _checkUrl(url)){
      return
    }
    e.preventDefault();

    if(location.pathname + location.search !== url.pathname + url.search){

      try{
        const replacePageContent = (await import("../helpers/replace-page-content")).default

        replacePageContent(url.pathname + url.search + url.hash)
      }catch (e) {
        console.error(e);
        location.href = url
      }
    }
  } else {
    frontAppRouter.history.push(url);
  }

}
