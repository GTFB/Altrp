import Resource from "../../../../editor/src/js/classes/Resource";
import {changeCurrentUser} from "../store/current-user/actions";
import Route from "../classes/Route";
import {changeAppRoutes} from "../store/routes/actions";

/**
 * Выход
 * @return {Promise<{}>}
 */
export default async function altrpLogout() {
  let res = await new Resource({ route: "/logout" }).post();
  if (!(res.success || res._token)) {
    return {
      success: false
    };
  }
  _token = res._token;

  let currentUser = await new Resource({
    route: "/ajax/current-user"
  }).getAll();
  currentUser = currentUser.data;
  appStore.dispatch(changeCurrentUser(currentUser));
  let routes = [];
  try {
    let routesData = await new Resource({
      route: "/ajax/routes"
    }).getAll();

    for (let _data of routesData.pages) {
      routes.push(Route.routeFabric(_data));
    }
    appStore.dispatch(changeAppRoutes(routes));
  } catch (err) {
    console.error(err);
    return { success: false };
  }
  return { success: true };
}
