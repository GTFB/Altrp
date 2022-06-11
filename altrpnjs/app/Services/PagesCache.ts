export default class PagesCache {

  private static instance: PagesCache;

  private cache = {}

  static getInstance(): PagesCache{
    if(!PagesCache.instance){
      PagesCache.instance = new PagesCache()
    }
    return PagesCache.instance
  }

  static getCache(pageGuid:string):string|null{
    if(!pageGuid){
      console.error('Empty Page Guid');
      return null
    }
    return PagesCache.getInstance().getCache(pageGuid)
  }


  static setCache(pageGuid:string, htmlContent:string){
    if(!pageGuid){
      console.error('Empty Page Guid');
      return
    }
    if(!htmlContent){
      console.error('Empty Page HTML Content');
      return
    }

    PagesCache.getInstance().setCache(pageGuid, htmlContent)

  }

  private getCache(pageGuid:string):string|null {
    return _.isString(this.cache[pageGuid]) ? this.cache[pageGuid] : null
  }

  private setCache(pageGuid:string, htmlContent:string) {

   this.cache[pageGuid] = htmlContent
  }
}
