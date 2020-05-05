export const START_DRAG = 'START_DRAG';
export const STOP_DRAG = 'STOP_DRAG';
export const CHANGE_DRAG_STATE = 'CHANGE_DRAG_STATE';

export function startDrag(element) {
  return {
    type: START_DRAG,
    element
  };
}
export function stopDrag() {
  return {
    type: STOP_DRAG,
  };
}


