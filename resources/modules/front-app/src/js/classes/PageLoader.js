/**
 * Загружает и хранит страницы с шаблонами
 * @class PageLoader
 */
import Resource from "../../../../editor/src/js/classes/Resource";

class PageLoader {
  constructor() {
    this.resource = new Resource({
      route: "/ajax/pages"
    });
  }

  /**
   * @param {int} pageId
   * @return {Promise}
   */
  async loadPage(pageId) {
    if (_.isObject(window.pageStorage[pageId])) {
      // return new Promise((resolve, reject)=>{
      //   resolve(this.pagesStorage[pageId]);
      // });
      return window.pageStorage[pageId];
    }
    let page = await this.resource.get(pageId);
    window.pageStorage[pageId] = page;
    return page;
  }
}

window.pageLoader = new PageLoader();
export default window.pageLoader;
