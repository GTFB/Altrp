export const CHANGE_STATE_BY_NAME = 'CHANGE_STATE_BY_NAME';

export function changeStateByName(stateName, value) {
  return {
    type: CHANGE_STATE_BY_NAME,
    data: {
      [stateName]: value,
    }
  };
}
