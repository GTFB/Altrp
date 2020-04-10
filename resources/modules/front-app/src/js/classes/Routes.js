import Resource from "../../../../editor/src/js/classes/Resource";
import Route from "./Route";

class Routes {

  constructor(){
    this.resource = new Resource({
      route: '/ajax/routes'
    });
    this.loadRoutes();
  }
  loadRoutes(){
    this.resource.getAll().then(res => res.json()).then(routesData=>{
      let routes = [];
      for(let _data of routesData){
        routes.push(Route.routeFabric(_data));
      }
      console.log(routes);
    }).catch(err=>{
      console.error(err);
    });
  }
}

export default new Routes();