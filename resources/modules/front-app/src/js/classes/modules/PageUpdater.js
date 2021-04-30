/**
 * @class PageUpdater
 */
import {loadLazySections} from "../../helpers/optimization";

class PagesUpdater {
  /**
   * Получить все внутренние ссылки на странице
   * todo: можно усовершенствовать: загружать в первую очередь те страницы, на которые на текущей странице ведут ссылки
   * @return {Array}
   */
  getLinks(){
    let links = document.querySelectorAll('a');
    links = _.map(links, link => link.href);

    return links;
  }

  async _startUpdating(){
    // const links = this.getLinks();
    // if(_.isEmpty(links)){
    //   this.updating = false;
    //   return
    // }

    let pages = window.altrpPages.map(page => page.id);
    pages = pages.filter((id, idx) => ! window.pageStorage[id] && pages.indexOf(id) === idx);
    pages = pages.map(id => async ()=>{return window.pageLoader.loadPage(id)});
    for (const page of pages) {
      let res = await page();
    }
  }
  async startUpdating(){
    if(! this.updated){
      loadLazySections();
      this.updated = true;
      await this._startUpdating();
    }

  }
}

window.pageUpdater =  new PagesUpdater;

export default window.pageUpdater;
