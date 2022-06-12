import _ from "lodash";

export default class PagesCache {

  private static instance: PagesCache;

  private cache = {}

  static getInstance(): PagesCache{
    if(!PagesCache.instance){
      PagesCache.instance = new PagesCache()
    }
    return PagesCache.instance
  }

  static getCache(pageGuid:string, device:string):string|null{
    if(!pageGuid){
      console.error('Empty Page Guid');
      return null
    }
    return PagesCache.getInstance().getCache(pageGuid, device)
  }


  static clearAllCache(){

    PagesCache.getInstance().clearAllCache()
  }


  static setCache(pageGuid:string, device:string, htmlContent:string){
    if(!pageGuid){
      console.error('Empty Page Guid');
      return
    }
    if(!htmlContent){
      console.error('Empty Page HTML Content');
      return
    }

    PagesCache.getInstance().setCache(pageGuid, device, htmlContent)
  }

  private static getCacheName(pageGuid:string, device:string){
    return `${pageGuid}${device}`
  }

  private getCache(pageGuid:string, device:string):string|null {
    return _.isString(this.cache[PagesCache.getCacheName(pageGuid, device)])
      ? this.cache[PagesCache.getCacheName(pageGuid, device)]
      : null
  }

  private setCache(pageGuid:string, device:string, htmlContent:string) {
   this.cache[PagesCache.getCacheName(pageGuid, device)] = htmlContent
  }

  private clearAllCache() {
    this.cache = {};
  }
}
