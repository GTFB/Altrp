export const CHANGE_CURRENT_MODEL = 'CHANGE_CURRENT_MODEL';

export function changeCurrentModel(model) {
  return {
    type: CHANGE_CURRENT_MODEL,
    model
  };
}

