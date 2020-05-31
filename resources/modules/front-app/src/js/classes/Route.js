/**
 * @property {Area[]} areas
 * */
import Area from "./Area";

class Route {
  constructor(id, path){
    this.id = id;
    this.path = path;
  }
  static routeFabric(data){
    let route = new Route(data.id, data.path);
    route.areas = [];
    for (let _area of data.areas){
      route.areas.push(Area.areaFabric(_area))
    }
    return route;
  }
}

export default Route