import {CHANGE_CURRENT_USER, SET_NOTICE_FOR_USER} from './actions'
import AltrpUser from "../../../../../editor/src/js/classes/AltrpUser";

const defaultModel = {};

export function currentUserReducer(user, action) {
  user = user || defaultModel;
  switch (action.type) {
    case CHANGE_CURRENT_USER:{
      user = action.user;
    }break;
    case SET_NOTICE_FOR_USER:{
      console.log(user);
      user = { ...user, noticeData: [...user.data?.noticeData || [], action.notice] };
    }
    break;
  }
  
  if(user instanceof AltrpUser){
    return user;
  }
  return new AltrpUser(user);
}