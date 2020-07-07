/**
 * @property {Area[]} areas
 * */
import Area from "./Area";

class Route {
  constructor(data){
    this.id = data.id ;
    this.path = data.path;
    this.model = data.model;
    this.title = data.title || '';
  }
  static routeFabric(data){
    let route = new Route(data);
    route.areas = [];
    for (let _area of data.areas){
      route.areas.push(Area.areaFabric(_area))
    }
    return route;
  }
}

export default Route