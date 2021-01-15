import {
  changeCurrentUser,
  changeUpdateUserNotification,
  CHANGE_CURRENT_USER,
  CHANGE_CURRENT_USER_PROPERTY,
  SET_NOTICE_FOR_USER,
} from "./actions";
import AltrpUser from "../../../../../editor/src/js/classes/AltrpUser";
import Resource from "../../../../../editor/src/js/classes/Resource";
import appStore from "../store";

const defaultModel = {};

export function currentUserReducer(user, action) {
  user = user || defaultModel;
  let localStorage = action.user?.local_storage;
  switch (action.type) {
    case CHANGE_CURRENT_USER:
      {
        user = action.user;
        if (Array.isArray(user.local_storage)) {
          user.local_storage = {};
        }
      }
      break;
    case CHANGE_CURRENT_USER_PROPERTY:
      {
        let path = action.path;
        let value = action.value;
        user.setProperty(path, value);
        const data = _.cloneDeep(user.getProperty("local_storage"));
        const form = {
          local_storage: data
        };
        new Resource({ route: `/ajax/current-user` })
          .put("", form)
          .then(res => {
            appStore.dispatch(changeCurrentUser(res.data));
          })
          .catch(error => console.log(error));
      }
      break;
    case SET_NOTICE_FOR_USER:
      {
        let newNotice = action.notice;
        user = { ...user, notice: [...user.data?.notice || [], newNotice] };
      }
      break;
  }
  if (user instanceof AltrpUser) {
    return user;
  }
  return new AltrpUser(user);
}
