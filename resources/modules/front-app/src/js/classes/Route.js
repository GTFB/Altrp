/**
 * @property {Area[]} areas
 * */
import Area from "./Area";

class Route {
  constructor(data){
    this.id = data.id ;
    this.path = data.path;
    this.model = data.model;
    this.models = data.models;
    if(! this.models){
      this.models = data.model ? [data.model] : [];
    }
    this.model = data.model;
    this.title = data.title || '';
    this.allowed = data.allowed;
    this.redirect = data.redirect;
    this.lazy = data.lazy;
  }
  static routeFabric(data){
    let route = new Route(data);
    route.areas = [];
    data.areas = data.areas || [];
    for (let _area of data.areas){
      route.areas.push(Area.areaFabric(_area))
    }
    return route;
  }
}

export default Route