import Resource from "../../../../editor/src/js/classes/Resource";
import Route from "./Route";
import appStore from "../store/store";
import { changeAppRoutes } from "../store/routes/actions";

class Routes {
  constructor() {
    this.resource = new Resource({
      route: "/ajax/routes"
    });
    this.loadRoutes();
  }
  loadRoutes() {
    if(window.altrpPages){
      console.log(altrpPages);
      let routes = [];
      for (let _data of window.altrpPages) {
        routes.push(Route.routeFabric(_data));
      }
      appStore.dispatch(changeAppRoutes(routes));
      return
    }
    this.resource
      .getAll()
      .then(routesData => {
        let routes = [];
        for (let _data of routesData.pages) {
          routes.push(Route.routeFabric(_data));
        }
        appStore.dispatch(changeAppRoutes(routes));
      })
      .catch(err => {
        console.error(err);
      });
  }
}

export default new Routes();
