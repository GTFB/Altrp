import Resource from "../../../../editor/src/js/classes/Resource";
import {addResponseData} from "../store/responses-storage/actions";
import {changeCurrentUser} from "../store/current-user/actions";
import mbParseJSON from "./mb-parse-JSON";

/**
 * Логиним пользователя
 * @param {{}} data
 * @param {string} formId
 * @return {Promise<{}>}
 */
export default async function altrpLogin(data = {}, formId = "login") {
  data.altrpLogin = true;
  let res;
  try {
    res = await new Resource({ route: "/login" }).post(data);
  } catch (error) {
    let status = error.status;
    if (error.res instanceof Promise) {
      res = await error.res;
    }
    if (error instanceof Promise) {
      res = await error;
    }
    res = mbParseJSON(res, {});
    status && (res.__status = status);
  }
  appStore.dispatch(addResponseData(formId, res));
  if (!(res.success || res._token)) {
    return {
      success: false
    };
  }
  //_token = res._token;

  let currentUser = await new Resource({
    route: "/ajax/current-user"
  }).getAll();
  currentUser = currentUser.data;
  appStore.dispatch(changeCurrentUser(currentUser));
  /*let routes = [];
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
  }*/
  return { success: true };
}
