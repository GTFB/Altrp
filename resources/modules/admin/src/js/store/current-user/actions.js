export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_USERS_ONLINE = 'SET_USERS_ONLINE';

export function setUserData(userData) {
  return {
    userData,
    type: SET_USER_DATA,
  }
}
export function setUsersOnline(members){
  return { type: SET_USERS_ONLINE, members }
}
