/**
 * @property {Area[]} areas
 * */
import Area from "./Area";

class Route {
  static routeFabric(data){
    let route = new Route();
    route.areas = [];
    for (let _area of data.areas){
      route.areas.push(Area.areaFabric(_area))
    }
    return route;
  }
}

export default Route