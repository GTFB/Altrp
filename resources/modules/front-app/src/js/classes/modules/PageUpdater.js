/**
 * @class PageUpdater
 */
class PagesUpdater {
  /**
   * Получить все внутренние ссылки на странице
   * @return {Array}
   */
  getLinks(){
    let links = document.querySelectorAll('a');
    links = _.map(links, link => link.href);
    console.log(links);

    return links;
  }

  _startUpdating(){
    const links = this.getLinks();
    if(_.empty(links)){
      this.updating = false;
      return
    }
  }
  startUpdating(){
    if(! this.updating){
      this.updating = true;
      this._startUpdating();
    }

  }
}

window.pageUpdater =  new PagesUpdater;

export default window.pageUpdater;