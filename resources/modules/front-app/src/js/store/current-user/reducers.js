import {CHANGE_CURRENT_USER} from './actions'
import AltrpUser from "../../../../../editor/src/js/classes/AltrpUser";

const defaultModel = {
  
};

export function currentUserReducer(user, action) {
  user = user || defaultModel;
  switch (action.type) {
    case CHANGE_CURRENT_USER:{
      user = action.user;
    }break;
  }
  if(user instanceof AltrpUser){
    return user;
  }
  return new AltrpUser(user);
}