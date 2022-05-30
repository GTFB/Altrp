import replaceContentWithData from "./replaceContentWithData";

/**
 * Перенаправление на другую страницу по настройкам LinkController
 * @param {{}} linkSettings
 * @param {{}} e
 * @param {{}} context
 */
export default function redirect(linkSettings, e, context = {}) {
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
    window.location.assign(url);
  } else {
    frontAppRouter.history.push(url);
  }

}
