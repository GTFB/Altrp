/**
 * Загружает и хранит страницы с шаблонами
 * @class PageLoader
 */
import Resource from "../../../../editor/src/js/classes/Resource";

class PageLoader {
  constructor(){
    this.resource = new Resource({
      route: '/ajax/pages'
    });
    this.pagesStorage = {};
  }

  /**
   * @param {int} pageId
   * @return {Promise}
   */
  async loadPage(pageId){
    if(_.isObject(this.pagesStorage[pageId])){
      // return new Promise((resolve, reject)=>{
      //   resolve(this.pagesStorage[pageId]);
      // });
      return this.pagesStorage[pageId];
    }
    let page = await this.resource.get(pageId);
    this.pagesStorage[pageId] = page;
    return page;
  }
}

const pageLoader = new PageLoader;
export default pageLoader;