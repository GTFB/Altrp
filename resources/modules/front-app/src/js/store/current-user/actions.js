export const CHANGE_CURRENT_USER = 'CHANGE_CURRENT_USER';

export function changeCurrentUser(user) {
  return {
    type: CHANGE_CURRENT_USER,
    user: user || {},
  };
}

